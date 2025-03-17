import { useSetAtom } from "jotai";
import { defaultQuestionAtom } from "@/common/store/store";

const propmts = [
  {
    id: 1,
    label: "🔍 Search for a column using a description",
    prompt: "I want to search for a column which is",
  },
  {
    id: 2,
    label: "📊 Generate a table schema to avoid duplication",
    prompt: " I need to generate a table schema to avoid duplication",
  },
  {
    id: 3,
    label: "🏛 Find existing tables before creating new ones",
    prompt:
      "I want to find if there are any existing tables before creating new ones with following ",
  },
];

const Intro: React.FC = () => {
  const setDefaultQuestion = useSetAtom(defaultQuestionAtom);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-2xl w-full px-12 py-9 bg-linear-to-b from-green-50/50 to-10% to-white rounded-md border border-neutral-300/50">
        <div>
          <img src="./logo.svg" className="size-16" />
        </div>
        <div className="font-semibold text-4xl text-brand">
          data<span className="font-normal">gpt</span>
        </div>
        <div>
          <div className="text-neutral-500">
            Smarter Database Conversations, Instantly.
          </div>
          <div className="text-neutral-900 text-sm pt-2">
            Managing database just got smarter.
            <span className="font-semibold"> DataGPT</span> empowers DBAs to
            prevent redundant data, validate column names, and search for
            existing tables—without making real-time changes. Ensure
            consistency, improve discoverability, and make data-driven decisions
            with AI-powered assistance.
          </div>
        </div>
        <div className="py-4">
          <div className="text-sm pb-2">Frequently asked questions:</div>
          <div className="w-full flex flex-wrap gap-2">
            {propmts.map(({ id, label, prompt }) => (
              <button
                key={id}
                onClick={() => setDefaultQuestion({ defaultQuestion: prompt })}
                className="px-4 text-sm py-2 border border-neutral-300/50 rounded-full hover:border-brand cursor-pointer transition-colors focus:outline-brand"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
