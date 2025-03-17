import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export interface InputForm {
  question: string;
}

interface ChatInputProps {
  defaultQuestion?: string;
  sendMessage: (message: InputForm) => Promise<void>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  defaultQuestion,
  sendMessage,
}) => {
  console.log(defaultQuestion);
  const { register, handleSubmit, reset, setValue } = useForm<InputForm>();

  useEffect(() => {
    if (defaultQuestion) {
      setValue("question", defaultQuestion);
    }
  }, [defaultQuestion, setValue]);

  const onSubmit: SubmitHandler<InputForm> = async (data) => {
    reset();
    const response = await sendMessage(data);
    console.log(response, data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-32 relative border-t border-neutral-200"
    >
      <textarea
        autoFocus
        placeholder="Ask anything..."
        {...register("question")}
        className="w-full h-full bg-neutral-100/50 px-4 py-3 focus:outline-0 focus-within:outline-0 ring-0 focus:bg-white text-neutral-900 placeholder:text-neutral-500 border-0"
      />
      <div className="absolute bottom-0 right-0 px-3 py-2">
        <button
          type="submit"
          className="bg-neutral-800 text-neutral-50 text-sm px-3 py-2 rounded cursor-pointer"
        >
          Send ↵
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
