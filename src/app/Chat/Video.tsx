import React from "react";
import { observer, useLocalStore } from "mobx-react";
import VideoCall from "./simple-peer";
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

export const VideoChat = observer(() => {
  const state = useLocalStore<{
    streamUrl: MediaStream;
    localStream: MediaStream;
    remoteVideo: any;
    localVideo: any;
    peer: any;
    waiting: boolean;
    connecting: boolean;
    micState: boolean;
    camState: boolean;
    videoCall: VideoCall;
  }>(() => ({
    streamUrl: null,
    localStream: null,
    remoteVideo: null,
    localVideo: null,
    peer: null,
    waiting: false,
    connecting: true,
    micState: true,
    camState: true,
    videoCall: new VideoCall(),
  }));

  const enter = React.useCallback((roomId: string) => {
    this.setState({ connecting: true });
    const peer = this.videoCall.init(
      this.state.localStream,
      this.state.initiator
    );
    this.setState({ peer });

    peer.on("signal", (data) => {
      const signal = {
        room: roomId,
        desc: data,
      };
      this.state.socket.emit("signal", signal);
    });
    peer.on("stream", (stream) => {
      this.remoteVideo.srcObject = stream;
      this.setState({ connecting: false, waiting: false });
    });
    peer.on("error", function (err) {
      console.log(err);
    });
  }, []);

  const call = React.useCallback((otherId) => {
    this.videoCall.connect(otherId);
  }, []);

  const getUserMedia = React.useCallback(() => {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia =
        navigator.getUserMedia ||
        (navigator as any).webkitGetUserMedia ||
        (navigator as any).mozGetUserMedia;
      const op = {
        video: {
          width: { min: 160, ideal: 640, max: 1280 },
          height: { min: 120, ideal: 360, max: 720 },
        },
        audio: true,
      };
      navigator.getUserMedia(
        op,
        (stream) => {
          state.streamUrl = stream;
          state.localStream = stream;
          state.localVideo.srcObject = stream;
          resolve();
        },
        () => {}
      );
    });
  }, [state]);

  const setAudioLocal = React.useCallback(() => {
    if (state.localStream.getAudioTracks().length > 0) {
      state.localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    state.micState = !state.micState;
  }, [state]);

  const setVideoLocal = React.useCallback(() => {
    if (state.localStream.getVideoTracks().length > 0) {
      state.localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    state.camState = !state.camState;
  }, [state]);

  const getDisplay = React.useCallback(() => {
    getDisplayStream().then((stream) => {
      stream.oninactive = () => {
        state.peer.removeStream(state.localStream);
        getUserMedia().then(() => {
          state.peer.addStream(state.localStream);
        });
      };
      state.streamUrl = stream;
      state.localStream = stream;
      state.localVideo.srcObject = stream;
      state.peer.addStream(stream);
    });
  }, [state, getUserMedia]);

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
      <div className="video-wrapper">
        <div className="local-video-wrapper">
          <video
            autoPlay
            id="localVideo"
            muted
            ref={(video) => (state.localVideo = video)}
          />
        </div>
        <video
          autoPlay
          className={`${state.connecting || state.waiting ? "hide" : ""}`}
          id="remoteVideo"
          ref={(video) => (state.remoteVideo = video)}
        />

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

        {state.waiting && (
          <div className="status">
            <p>Waiting for someone...</p>
          </div>
        )}
      </div>
    </>
  );
});
