import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useDelay, useOnLoad } from "~/hooks";
import { ipc, IpcHandler } from "~/shared/ipc";
import { ApplicationSettings } from "~/shared/Settings";
import { JsonCompatible } from "~/shared/Json";
import { UserConnection } from "~/shared/UserConnection";

export interface ChatState {
  settings: ApplicationSettings;
  onlineUsers: string[];
  allUsers: UserConnection[];
  users: (UserConnection & {
    online: boolean;
  })[];
  userMap: {
    [email: string]: UserConnection & {
      online: boolean;
    };
  };
  self: string;
  userMessages: {
    [email: string]: {
      email: string;
      name: string;
      userKey: string;
      timestamp: number;
      type: string;
      text: string;
    }[];
  };
  channelMessages: {
    [email: string]: {
      email: string;
      name: string;
      userKey: string;
      timestamp: number;
      type: string;
      text: string;
    }[];
  };
  channels: ReturnType<IpcHandler["GET_CHANNELS"]>;
  channelList: string[];
  isLoading: boolean;
  isLoadingDelay: boolean;
  isActive: boolean;
  load: () => Promise<void>;
  update: () => Promise<void>;
  sendChannel: (name: string, text: string) => void;
  sendUser: (name: string, text: string) => void;
  onMessage: (
    channelName: string,
    email: string,
    name: string,
    userKey: string,
    data: JsonCompatible
  ) => void;
}

export const ChatService = createService<ChatState>(
  () => {
    const state: ChatState = useLocalStore<ChatState>(() => ({
      settings: null,
      get self() {
        return state.settings?.email;
      },
      allUsers: [],
      onlineUsers: [],
      get users() {
        return state.allUsers
          .filter((user) => user.email !== state.self)
          .map((user) => ({
            ...user,
            online: state.onlineUsers.includes(user.email),
          }))
          .sort((a, b) => (!a.online && b.online ? 1 : -1));
      },
      get userMap() {
        const res = {};
        state.users.forEach((user) => {
          res[user.email] = user;
        });
        return res;
      },
      channels: {},
      get channelList() {
        return Object.keys(state.channels);
      },
      userMessages: {},
      channelMessages: {},
      isLoading: false,
      isLoadingDelay: false,
      get isActive() {
        return !!(
          state.settings &&
          state.settings.communicationKey &&
          state.settings.email &&
          state.settings.name &&
          state.settings.publicKey &&
          state.settings.secretKey
        );
      },
      load: async () => {
        state.isLoading = true;
        state.settings = await ipc.handlers.GET_SETTINGS();
        state.allUsers = await ipc.handlers.GET_USERS();
        state.onlineUsers = await ipc.handlers.GET_ONLINE_USERS();
        state.channels = await ipc.handlers.GET_CHANNELS();
        state.isLoading = false;
      },
      update: async () => {
        state.allUsers = await ipc.handlers.GET_USERS();
        state.onlineUsers = await ipc.handlers.GET_ONLINE_USERS();
        state.channels = await ipc.handlers.GET_CHANNELS();
      },
      sendChannel: async (name, text) => {
        const message = {
          type: "text",
          text,
          timestamp: +new Date(),
        };
        await ipc.handlers.SEND_CHANNEL_MESSAGE(name, message);
        if (!state.channelMessages[name]) {
          state.channelMessages[name] = [];
        }
        state.channelMessages[name].unshift({
          ...message,
          email: state.settings?.email,
          name: state.settings?.name,
          userKey: null,
        });
      },
      sendUser: async (email, text) => {
        const message = {
          type: "text",
          text,
          timestamp: +new Date(),
        };
        await ipc.handlers.SEND_USER_MESSAGE(email, message);
        if (!state.userMessages[email]) {
          state.userMessages[email] = [];
        }
        state.userMessages[email].unshift({
          ...message,
          email: state.settings?.email,
          name: state.settings?.name,
          userKey: null,
        });
      },
      onMessage: (
        channelName: string,
        email: string,
        name: string,
        userKey: string,
        data: JsonCompatible
      ) => {
        if (channelName) {
          if (!state.channelMessages[channelName]) {
            state.channelMessages[channelName] = [];
          }
          state.channelMessages[channelName].unshift({
            type: data.type,
            timestamp: data.timestamp,
            text: data.text,
            email,
            name,
            userKey,
          });
        } else {
          if (!state.userMessages[channelName]) {
            state.userMessages[channelName] = [];
          }
          state.userMessages[email].unshift({
            type: data.type,
            timestamp: data.timestamp,
            text: data.text,
            email,
            name,
            userKey,
          });
        }
      },
    }));
    return state;
  },
  (state) => {
    useOnLoad(state.load);
    useDelay(state, "isLoading", "isLoadingDelay");
    React.useEffect(() => ipc.channels.ON_DRIVE_UPDATE(state.load));
    React.useEffect(() => ipc.channels.ON_SETTINGS_UPDATE_FINISH(state.load));
    React.useEffect(() => ipc.channels.ON_CHANNEL_UPDATE(state.update));
    React.useEffect(() =>
      ipc.channels.ON_CHANNEL_VERIFYED_MESSAGE(state.onMessage)
    );
  }
);
