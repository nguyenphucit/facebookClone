import React, { forwardRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import SimplePeer from "simple-peer";
import {
  Videocam,
  Mic,
  CallEnd,
  MicOff,
  VideocamOff,
  PhoneEnabled,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
export const VideoCallWindow = forwardRef(
  (
    { sender, receiver, socket, receivingCall, sendCall, caller, callerSignal },
    ref,
  ) => {
    const [Stream, setStream] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    // const [callEnded, setCallEnded] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isMicroOn, setIsMicroOn] = useState(true);
    useEffect(() => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(() => stream);
          ref.myVideoRef.current.srcObject = stream;
        })
        .catch((error) => alert(error));

      socket.on("callEnd", () => {
        ref.connectionRef.current.destroy();
        Stream.getTracks().forEach((track) => track.stop());
        window.location.reload();
      });
      // eslint-disable-next-line
    }, []);

    const toggleCamera = () => {
      if (Stream) {
        Stream.getVideoTracks().forEach((track) => {
          track.enabled = !track.enabled;
        });
        setIsCameraOn((prev) => !prev);
      }
    };

    const toggleMicro = () => {
      if (Stream) {
        Stream.getAudioTracks().forEach((track) => {
          track.enabled = !track.enabled;
        });
        setIsMicroOn((prev) => !prev);
      }
    };

    useEffect(() => {
      const sendCallRequest = () => {
        const peer = new SimplePeer({
          initiator: true,
          trickle: false,
          stream: Stream,
        });

        peer.on("signal", (data) => {
          socket.emit("sendCallRequest", {
            userToCall: receiver?.id,
            signalData: data,
            from: sender?.id,
            name: sender?.firstname + " " + sender?.surname,
          });
        });

        peer.on("stream", (stream) => {
          console.log("set user video ref when calling");
          ref.userVideoRef.current.srcObject = stream;
        });

        socket.on("callAccepted", (signal) => {
          setCallAccepted(true);
          peer.signal(signal.signal);
        });

        ref.connectionRef.current = peer;
      };

      if (sendCall && Stream) sendCallRequest();
      // eslint-disable-next-line
    }, [Stream]);

    const AsnswerCall = () => {
      setCallAccepted(() => true);
      const peer = new SimplePeer({
        initiator: false,
        trickle: false,
        stream: Stream,
      });
      peer.on("signal", (data) => {
        socket.emit("answerCall", { signal: data, to: caller });
      });
      peer.on("stream", (stream) => {
        console.log("set user video ref when accepting");
        ref.userVideoRef.current.srcObject = stream;
      });
      peer.signal(callerSignal);
      ref.connectionRef.current = peer;
    };

    const leaveCall = () => {
      // setCallEnded(true);
      if (ref.connectionRef.current) {
        ref.connectionRef.current.destroy();
      }
      Stream.getTracks().forEach((track) => track.stop());
      socket.emit("endCall", { to: caller });
      window.location.reload(); // Optionally, refresh the page to reset the state
    };
    return (
      <div className="fixed left-0 top-0 z-[1000] flex h-dvh w-dvw items-center justify-center bg-black bg-opacity-25">
        <Draggable>
          <div
            className={`z-[200] h-125 w-235 overflow-y-hidden rounded-md  bg-${callAccepted ? "transparent" : "black"}`}
          >
            <div
              className={`${callAccepted ? "" : "hidden"} relative h-full w-full`}
            >
              <video
                ref={ref.userVideoRef}
                className=" absolute bottom-0 right-0 z-[200]  min-h-full min-w-full"
                playsInline
                autoPlay
              />
              <video
                onClick={() => console.log("test")}
                ref={ref.myVideoRef}
                className=" absolute bottom-4 right-2 z-[300] w-1/5 rounded-md bg-contain "
                playsInline
                autoPlay
              />
            </div>
            (
            <div
              className={`${callAccepted ? "hidden" : ""} flex h-full  w-full flex-col items-center justify-center gap-2`}
            >
              <Avatar src={receiver.avatar} sx={{ width: 80, height: 80 }} />
              <div className="text-2xl text-white">
                {receiver.firstname + " " + receiver.surname}
              </div>
              <div className="text-center text-commentAuthor text-[#525252]">
                {!receivingCall
                  ? "đang gọi ..."
                  : receiver.firstname +
                    " " +
                    receiver.surname +
                    " đang gọi cho bạn"}
              </div>
            </div>
            )
            <div className="fixed bottom-0 left-0 z-[400] flex w-full items-center justify-center gap-4 p-4 ">
              <span
                className="h-10 w-10 cursor-pointer content-center rounded-full bg-[#333333] text-center"
                onClick={() => toggleCamera()}
              >
                {isCameraOn ? (
                  <Videocam sx={{ color: "#717171" }} />
                ) : (
                  <VideocamOff sx={{ color: "#717171" }} />
                )}
              </span>
              <span
                className="h-10 w-10 cursor-pointer content-center rounded-full bg-[#333333] text-center"
                onClick={() => toggleMicro()}
              >
                {isMicroOn ? (
                  <Mic sx={{ color: "#717171" }} />
                ) : (
                  <MicOff sx={{ color: "#717171" }} />
                )}
              </span>
              <span
                className="h-10 w-10 cursor-pointer content-center rounded-full bg-[#ff4942] text-center"
                onClick={() => leaveCall()}
              >
                <CallEnd sx={{ color: "white" }} />
              </span>
              {receivingCall && !callAccepted ? (
                <span
                  className="h-10 w-10 cursor-pointer content-center rounded-full bg-loginBtn text-center"
                  onClick={() => AsnswerCall()}
                >
                  <PhoneEnabled sx={{ color: "white" }} />
                </span>
              ) : null}
            </div>
          </div>
        </Draggable>
      </div>
    );
  },
);
