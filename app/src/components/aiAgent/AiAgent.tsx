import { useChat } from "@ai-sdk/react";
import { Activity, type FormEvent, useEffect, useState } from "react";
import IconAi from "@/assets/images/icon-ai.svg?react";
import IconBtnAi from "@/assets/images/icon-btn-ai.svg?react";
import IconSend from "@/assets/images/icon-send.svg?react";
import { useLocation } from "@/context/location/Location";
import { useDismissalOutside } from "@/hooks/useDismissalOutside/useDismissalOutside";
import { useToggle } from "@/hooks/useToggle/useToggle";
import cnr from "@/utils/class_resolver/cnr";
import styles from "./AiAgent.module.css";

export default function AiAgent() {
  const { toggle, setOpen, activityMode } = useToggle();
  const { nodeRef, userRef } = useDismissalOutside<
    HTMLDivElement,
    HTMLButtonElement
  >({
    onDismissalEvent: () => setOpen(false),
  });
  const { messages, sendMessage } = useChat();
  const { data } = useLocation();
  const [_compare, setCompare] = useState(`Compare ${data.place} and `);
  const [ask, setAsk] = useState("");

  useEffect(() => {
    setCompare(`Compare ${data.place} and `);
  }, [data.place]);

  const handleCompare = (e: FormEvent) => {
    e.preventDefault();
    setAsk(`Compare ${data.place} and `);
  };

  return (
    <>
      <button
        className={cnr("flex fillcenter", styles.BTN, styles.agentbtn)}
        ref={userRef}
        type="button"
        onClick={toggle}
      >
        <IconBtnAi />
      </button>
      <Activity mode={activityMode}>
        <div ref={nodeRef} className={styles.agent}>
          <div className={cnr("flex gap-1rem", styles.agenthead)}>
            <IconAi /> Assistant
          </div>
          <div className={cnr("flexcol", styles.chatContainer)}>
            <div className={styles.inputarea}>
              <form onSubmit={handleCompare}>
                <button type="submit">Compare {data.place}</button>
              </form>
            </div>

            <div className="flexcol scroll-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cnr(
                    "flex",
                    message.role === "user"
                      ? styles.userWrapper
                      : styles.assistantWrapper,
                  )}
                >
                  <div className={styles.messageBubble}>
                    <div
                      className={
                        message.role === "user"
                          ? styles.userHeader
                          : styles.assistantHeader
                      }
                    >
                      {message.role === "user" ? "You" : "Advisor"}
                    </div>
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

            <div className={cnr("flex flexcenter", styles.inputArea)}>
              <form
                onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                  if (ask) {
                    sendMessage({ text: ask });
                    setAsk("");
                  }
                }}
                className="flex flexcenter"
              >
                <input
                  type="text"
                  value={ask}
                  onChange={(e) => setAsk(e.currentTarget.value)}
                  className={styles.inputField}
                  placeholder="Ask related to current place"
                />
                <button
                  type="submit"
                  className={cnr(
                    "flex flexcenter",
                    styles.BTN,
                    styles.sendButton,
                  )}
                >
                  <IconSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </Activity>
    </>
  );
}
