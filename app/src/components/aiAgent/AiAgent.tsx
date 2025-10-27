import { useChat } from "@ai-sdk/react";
import { type FormEvent, useEffect, useState } from "react";
import { useLocation } from "@/context/location/Location";
import styles from "./AiAgent.module.css";

export default function AiAgent() {
  const { messages, sendMessage } = useChat();
  const { data } = useLocation();
  const [input, setInput] = useState(`Compare ${data.place} and `);

  useEffect(() => {
    setInput(`Compare ${data.place} and `);
  }, [data.place]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  const getMessageClasses = (role: string) => {
    return role === "user" ? styles.userMessage : styles.assistantMessage;
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageWrapper} ${message.role === "user" ? styles.userWrapper : styles.assistantWrapper}`}
          >
            <div
              className={`${styles.messageBubble} ${getMessageClasses(message.role)}`}
            >
              {/* Message Header/Role Indicator */}
              <div
                className={
                  message.role === "user"
                    ? styles.userHeader
                    : styles.assistantHeader
                }
              >
                {message.role === "user" ? "You" : "Advisor"}
              </div>

              {/* Message Content */}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className={styles.messageText}
                      >
                        {part.text}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form at the bottom */}
      <div className={styles.inputArea}>
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            className={styles.inputField}
            autoFocus
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
