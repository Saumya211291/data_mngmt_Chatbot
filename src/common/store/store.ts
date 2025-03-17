import { atomWithReset } from "jotai/utils";

export interface Message {
  id: string;
  ts: string;
  feedback: string;
  question: string;
}

export interface DefaultQuestion {
  defaultQuestion?: string;
}

interface MessageAtom {
  messages: Message[];
  isLoading: boolean;
}

export const defaultQuestionAtom = atomWithReset<DefaultQuestion>({});
export const messagesAtom = atomWithReset<MessageAtom>({
  messages: [],
  isLoading: false,
});
