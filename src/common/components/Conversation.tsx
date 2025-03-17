import { Fragment, useEffect, useRef } from "react";
import ScrollArea from "@/common/components/ScrollArea";
import ChatItem from "@/common/components/ChatItem";
import { Message } from "@/common/store/store";

interface ConversationProps {
  messages: Message[];
}

const Conversation: React.FC<ConversationProps> = ({ messages }) => {
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="relative w-full h-full">
      <div className="absolute w-full h-full">
        <ScrollArea className="w-full h-full px-2 py-4">
          {messages.map((message) => (
            <Fragment key={message.id}>
              <ChatItem {...message} />
            </Fragment>
          ))}
          <div ref={scrollAnchorRef} />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Conversation;
