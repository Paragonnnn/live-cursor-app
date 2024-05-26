import React, { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { Cursor } from "./components/Cursor";

const Home = ({ username }) => {
  const renderCursors = (users) => {
    return Object.keys(users).map((uuid) => {
      const user = users[uuid];
      return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
    });
  };
  const renderUsersList = (users) => {
    return Object.keys(users).map((uuid) => {
      const user = users[uuid];
      return (
        <li key={uuid}>
          {JSON.stringify(users[uuid])}
        </li>
      );
    });
  };
  const ws_url = "ws://127.0.0.1:8000";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(ws_url, {
    queryParams: { username },
  });
  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));
  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });
    window.addEventListener("mousemove", (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    //   if (lastJsonMessage) {
    //     console.log(lastJsonMessage);
    //   }
    });
  }, []);
  if (lastJsonMessage) {
    return (
      <>
        {renderCursors(lastJsonMessage)} {renderUsersList(lastJsonMessage)}
      </>
    );
  } else {
    return <div>Hello, {username}</div>;
  }
};

export default Home;
