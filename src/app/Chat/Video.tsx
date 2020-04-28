import React from "react";
import classNames from "classnames";
// import { desktopCapturer } from "electron";
import { observer, useLocalStore } from "mobx-react";
import { getDisplayStream } from "./media-access";
import {
  ShareScreenIcon,
  MicOnIcon,
  MicOffIcon,
  CamOnIcon,
  CamOffIcon,
} from "./Icons";
import { ipc } from "~/shared/ipc";
import { JsonCompatible } from "~/shared/Json";
import hyperswarm from "hyperswarm-web";
import crypto from "crypto";
import { toJS } from "mobx";

const VideoStream: React.FC<{
  className?: string;
  stream: MediaStream;
  hide?: boolean;
}> = ({ className, stream, hide }) => {
  const element = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    if (element.current) {
      element.current.srcObject = stream;
    }
  }, [element, stream]);
  return (
    <video
      autoPlay
      className={classNames(className, { hide })}
      id="remoteVideo"
      ref={element}
    />
  );
};

const useUpdate = () => {
  const [number, setNumber] = React.useState<number>(0);
  return React.useCallback(() => {
    setNumber(number + 1);
  }, [setNumber, number]);
};

export const VideoChat = observer(() => {
  const update = useUpdate();
  const [store] = React.useState<{
    localStream: MediaStream;
    remoteStreams: MediaStream[];
    connections: any[];
  }>({
    localStream: null,
    remoteStreams: [],
    connections: [],
  });
  const state = useLocalStore<{
    loadingDevices: boolean;
    connecting: boolean;
    micState: boolean;
    camState: boolean;
    mics: any[];
    speakers: any[];
    cameras: any[];
  }>(() => ({
    loadingDevices: true,
    connecting: true,
    micState: true,
    camState: true,
    mics: [],
    speakers: [],
    cameras: [],
  }));

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
      for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind === "audioinput") {
          state.mics.push(deviceInfo);
        } else if (deviceInfo.kind === "audiooutput") {
          state.speakers.push(deviceInfo);
        } else if (deviceInfo.kind === "videoinput") {
          state.cameras.push(deviceInfo);
        }
      }
      state.loadingDevices = false;
    });
  }, [state]);

  const exit = React.useCallback((socket, details) => {
    console.log(socket, details, store.localStream);
  }, []);

  const enter = React.useCallback(
    (socket, details) => {
      state.connecting = true;
      console.log(socket, details, store.localStream);
      // const peer = state.videoCall.init(
      //   state.localStream,
      //   state.initiator
      // );
      // state.peer = peer;
      // setState({ peer });

      // peer.on("signal", (data) => {
      //   const signal = {
      //     room: roomId,
      //     desc: data,
      //   };
      //   state.socket.emit("signal", signal);
      // });
      // peer.on("stream", (stream) => {
      //   remoteVideo.srcObject = stream;
      //   setState({ connecting: false, waiting: false });
      // });
      // peer.on("error", function (err) {
      //   console.log(err);
      // });
      state.connecting = false;
    },
    [state]
  );

  const getUserMedia = React.useCallback(async () => {
    // const sources = await desktopCapturer.getSources({
    //   types: ["window", "screen"],
    // });
    // const source = sources[0];
    // if (source) {
    console.log(toJS(state));
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((e) => console.log(e));
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
      // audio: {
      //   deviceId: state.mics[0].deviceId,
      // },
      // video: {
      //   deviceId: state.cameras[0].deviceId,
      //   // mandatory: {
      //   // chromeMediaSource: "desktop",
      //   // chromeMediaSourceId: source.id,
      //   //   minWidth: 1280,
      //   //   maxWidth: 1920,
      //   //   minHeight: 720,
      //   //   maxHeight: 1080,
      //   // },
      // },
    });
    console.log(stream);
    store.localStream = stream;
    update();
    // }
  }, [store, update]);

  const setAudioLocal = React.useCallback(() => {
    if (store.localStream.getAudioTracks().length > 0) {
      store.localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    state.micState = !state.micState;
  }, [state, store]);

  const setVideoLocal = React.useCallback(() => {
    if (store.localStream.getVideoTracks().length > 0) {
      store.localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    state.camState = !state.camState;
  }, [state, store]);

  const getDisplay = React.useCallback(() => {
    getDisplayStream().then((stream) => {
      // stream.oninactive = () => {
      //   state.peer.removeStream(store.localStream);
      //   getUserMedia().then(() => {
      //     state.peer.addStream(store.localStream);
      //   });
      // };
      store.localStream = stream;
      update();
    });
  }, [state, store, getUserMedia, update]);

  const init = React.useCallback(
    async (swarm) => {
      console.log("here");
      await getUserMedia();
      console.log("sdfsdfsdf");

      const topic = crypto.createHash("sha256").update("makametest").digest();
      swarm.join(topic);
      swarm.on("connection", (socket, details) => {
        console.log("new connection!", socket, details);
        enter(socket, details);
        socket.once("close", () => {
          exit(socket, details);
        });
      });
    },
    [enter, exit, getUserMedia]
  );

  React.useEffect(() => {
    if (!state.loadingDevices) {
      const swarm = hyperswarm({
        wsProxy: "hyperswarm://127.0.0.1",
      });
      init(swarm);
      return () => {
        swarm.destroy();
      };
    }
  }, [init, state.loadingDevices]);

  React.useEffect(() => {
    return ipc.channels.ON_CHANNEL_VERIFYED_MESSAGE(
      (
        channelName: string,
        email: string,
        name: string,
        userKey: string,
        data: JsonCompatible,
        peer
      ) => {
        console.log(peer);
      }
    );
  });

  // React.useEffect(() => {
  //   const channelName = "test";

  //   getUserMedia().then(() => {
  //     socket.emit("join", { roomId: channelName });
  //   });

  //   socket.on("init", () => {
  //     setState({ initiator: true });
  //   });
  //   socket.on("ready", () => {
  //     enter(roomId);
  //   });
  //   socket.on("connection", (data) => {
  //     // if (data.type === "offer" && state.initiator) return;
  //     // if (data.type === "answer" && !state.initiator) return;
  //     call(data);
  //   });
  //   return () => {};
  // }, [state]);

  return (
    <>
      <div className="video-wrapper mb-3">
        <div className="local-video-wrapper">
          {!!store.localStream && (
            <VideoStream className="player-local" stream={store.localStream} />
          )}
        </div>
        {store.remoteStreams.map((stream) => (
          <VideoStream
            className="player-remote"
            stream={stream}
            hide={state.connecting}
          />
        ))}

        <div className="controls">
          <button
            className="control-btn"
            onClick={() => {
              getDisplay();
            }}
          >
            <ShareScreenIcon />
          </button>

          <button
            className="control-btn"
            onClick={() => {
              setAudioLocal();
            }}
          >
            {state.micState ? (
              <MicOnIcon></MicOnIcon>
            ) : (
              <MicOffIcon></MicOffIcon>
            )}
          </button>

          <button
            className="control-btn"
            onClick={() => {
              setVideoLocal();
            }}
          >
            {state.camState ? (
              <CamOnIcon></CamOnIcon>
            ) : (
              <CamOffIcon></CamOffIcon>
            )}
          </button>
        </div>

        {state.connecting && (
          <div className="status">
            <p>Establishing connection...</p>
          </div>
        )}
      </div>
    </>
  );
});
