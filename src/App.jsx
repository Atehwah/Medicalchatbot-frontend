/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { v4 as uuidv4 } from "uuid";
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";
import axios from "axios";
Amplify.configure(config);

function App({ signOut, user }) {
  const [sessionId, setSessionId] = useState("");
  useEffect(() => {
    setSessionId(uuidv4());
    console.log(sessionId);
  }, []);

  const [lexRes, setLexRes] = useState([]);
  const [lexNewRes, setNewLexRes] = useState([]);
  let questions = [];
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [letsChat, setLetsChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    console.log(sessionId);
    if (event.key === "Enter") {
      setMessages([...messages, userInput]);
      questions = [...questions, userInput];
      sendReq(userInput);
      console.log(questions);
      setUserInput("");
    }
  };
  const sendReq = async (message, is_new=false) => {
    console.log(sessionId);
    setLoading(true);
    axios
      .post(
        "https://3m1qbfj1of.execute-api.us-east-1.amazonaws.com/lambdaapichatbot",
        {
          message: message,
          sessionId: sessionId,
        }
      )
      .then((res) => {
        if(is_new){
          setNewLexRes({res: res.data.message });
        }else{
          setLexRes({ prompt: message, res: res.data.message });
        }
        setLoading(false);
        setLetsChat(true);
      });
  };
  return (
    <>
      <div>
        <div className="user">
          <div>
            Hi!<h3 className="name">{user?.username}</h3>
          </div>
          <button onClick={signOut}>Sign out</button>
        </div>
        <div className="chat-container">
          <div className="chat-box">
            <h1 className="chat-title">Welcome To AnyCompany Health</h1>

            {/* <div>
              <div className="messages-container quest">
                <div className="quest-inner">{lexNewRes.prompt}</div>
              </div>
            </div> */}
            <div className="res">{lexNewRes.res}</div>
            <div>
              <div className="messages-container quest">
                <div className="quest-inner">{lexRes.prompt}</div>
              </div>
            </div>
            <div className="res">{lexRes.res}</div>
            {letsChat ? (
              <>
                {loading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    >
                      <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9-9a9 9 0 0 0-9-9" />
                      <path d="M17 12a5 5 0 1 0-5 5" />
                    </g>
                  </svg>
                ) : (
                  <div className="chat-input">
                    <input
                      type="text"
                      placeholder="AnyCompany Health Chatbot "
                      className="chat-textbox"
                      value={userInput}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                    />
                    <div className="chat-icons">
                      <button className="icon-button">📎</button>
                      <button className="icon-button">🎁</button>
                      <button className="icon-button">🎙️</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button onClick={() => sendReq("Hello", true)}>Start Chat</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthenticator(App);

	
