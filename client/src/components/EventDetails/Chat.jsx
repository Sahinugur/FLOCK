/* Make Socket */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import "./Chat.css";

import Input from "./Input";
import Messages from "./Messages";

let socket;

const Chat = ({ name }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);

  let { id } = useParams();
  console.log(id);
  const ENDPOINT = "http://localhost:5001";

  useEffect(() => {
    console.log(name);

    console.log("id", id);

    socket = io(ENDPOINT);
    console.log(socket);

    socket.emit("join", { name, id }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, id]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  //function for sending messages

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="chatContainer">
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
