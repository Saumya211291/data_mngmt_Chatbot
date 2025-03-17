import { useEffect } from "react";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { messagesAtom, defaultQuestionAtom } from "@/common/store/store";

import ChatInput, { InputForm } from "@/common/components/ChatInput";
import Intro from "@/common/components/Intro";
import Conversation from "@/common/components/Conversation";
import Spinner from "@/common/components/Spinner";

const Chat: React.FC = () => {
  const [defaultQuestion] = useAtom(defaultQuestionAtom);
  const [{ messages, isLoading }, setMessages] = useAtom(messagesAtom);

  console.log(defaultQuestion);
  const resetDefaultQuestion = useResetAtom(defaultQuestionAtom);
  useEffect(() => {
    return () => {
      resetDefaultQuestion();
    };
  }, []);

  const sendMessage = async (data: InputForm) => {
    try {
      resetDefaultQuestion();
      setMessages((current) => ({ ...current, isLoading: true }));
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const messageResponse = await response.json();

      setMessages((current) => ({
        messages: [...current.messages, messageResponse],
        isLoading: false,
      }));
    } catch (error) {
      console.log(error);
      setMessages((current) => ({ ...current, isLoading: false }));
    }
  };

  return (
    <div className="w-full relative h-full overflow-hidden flex flex-col mx-auto max-w-screen-2xl bg-white border-x border-neutral-200">
      <div className="flex-1 h-full w-full relative">
        {messages.length === 0 ? (
          <Intro />
        ) : (
          <Conversation messages={messages} />
        )}
      </div>

      {isLoading && (
        <div className="flex space-x-2 p-2 text-sm items-center text-neutral-700">
          <Spinner />
          <div>datagpt is generating insights...</div>
        </div>
      )}
      <ChatInput
        defaultQuestion={defaultQuestion.defaultQuestion}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
