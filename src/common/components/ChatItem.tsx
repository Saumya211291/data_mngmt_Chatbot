import { Message } from "@/common/store/store";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import remarkGfm from "remark-gfm";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface QuestionItemProps {
  question: string;
  isDraft?: boolean;
}
export const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  isDraft = false,
}) => (
  <div className="flex justify-end w-full">
    <div
      className={clsx("px-4 py-3.5 max-w-lg rounded-2xl rounded-br-sm", {
        "bg-brand text-white": !isDraft,
        "bg-neutral-300/50 text-neutral-900": isDraft,
      })}
    >
      {question}
    </div>
  </div>
);

const ChatItem: React.FC<Message> = ({ question, feedback, ts }) => (
  <div className="flex flex-col w-full space-y-8">
    <QuestionItem question={question} />
    <div className="flex flex-col w-fit max-w-2xl px-1 py-3 group">
      <div className="text-neutral-900 prose max-w-none bg-neutral-100 px-4 py-3.5 rounded-2xl rounded-bl-sm">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{feedback}</ReactMarkdown>
      </div>

      <div className="h-7">
        <div className="hidden space-x-1 group-hover:flex items-center">
          <button>
            <ThumbsUp className="gap-0 p-2 w-9 h-9" />
          </button>
          <button>
            <ThumbsDown className="gap-0 p-2 w-9 h-9" />
          </button>
          <div className="text-xs font-medium text-neutral-500">
            {dayjs(ts).fromNow()}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ChatItem;
