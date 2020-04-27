import React from "react";
import { useLocalStore } from "mobx-react";
import { createService } from "~/components/ServiceProvider/ServiceProvider";
import { useDelay, useOnLoad } from "~/hooks";
import { ipc, IpcHandler } from "~/shared/ipc";
import { ApplicationSettings } from "~/shared/Settings";
import { JsonCompatible } from "~/shared/Json";
import { UserConnection } from "~/shared/UserConnection";

const MEMORIZED_TYPES = ["text"];
const MAX_MESSAGES = 100;

export interface ChatState {
  settings: ApplicationSettings;
  onlineUsers: string[];
  allUsers: UserConnection[];
  selectedEmail: string;
  selectedChannel: string;
  userMapText: {
    [email: string]: string;
  };
  channelMapText: {
    [name: string]: string;
  };
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
  sendMessage: () => void;
  onMessage: (
    channelName: string,
    email: string,
    name: string,
    userKey: string,
    data: JsonCompatible
  ) => void;
  addMessade: (arr, name: string, m) => void;
}

export const ChatService = createService<ChatState>(
  () => {
    const state: ChatState = useLocalStore<ChatState>(() => ({
      settings: null,
      get self() {
        return state.settings?.email;
      },
      selectedEmail: null,
      selectedChannel: null,
      userMapText: {},
      channelMapText: {},
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
      addMessade: (arr, name, m) => {
        if (!arr[name]) {
          arr[name] = [];
        }
        arr[name].length = Math.min(arr[name].length, MAX_MESSAGES - 1);
        arr[name].unshift(m);
      },
      sendChannel: async (name, text) => {
        const message = {
          type: "text",
          text,
          timestamp: +new Date(),
        };
        await ipc.handlers.SEND_CHANNEL_MESSAGE(name, message);
        state.addMessade(state.channelMessages, name, {
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
        state.addMessade(state.userMessages, email, {
          ...message,
          email: state.settings?.email,
          name: state.settings?.name,
          userKey: null,
        });
      },
      sendMessage: () => {
        if (state.selectedEmail) {
          if (state.userMapText[state.selectedEmail]) {
            state.sendUser(
              state.selectedEmail,
              state.userMapText[state.selectedEmail]
            );
            state.userMapText[state.selectedEmail] = "";
          }
        } else if (state.selectedChannel) {
          if (state.userMapText[state.selectedChannel]) {
            state.sendChannel(
              state.selectedChannel,
              state.channelMapText[state.selectedChannel]
            );
            state.channelMapText[state.selectedChannel] = "";
          }
        }
      },
      onMessage: (
        channelName: string,
        email: string,
        name: string,
        userKey: string,
        data: JsonCompatible
      ) => {
        if (channelName) {
          if (MEMORIZED_TYPES.includes(data.type)) {
            state.addMessade(state.channelMessages, channelName, {
              type: data.type,
              timestamp: data.timestamp,
              text: data.text,
              email,
              name,
              userKey,
            });
          }
        } else {
          if (MEMORIZED_TYPES.includes(data.type)) {
            state.addMessade(state.userMessages, email, {
              type: data.type,
              timestamp: data.timestamp,
              text: data.text,
              email,
              name,
              userKey,
            });
          }
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
