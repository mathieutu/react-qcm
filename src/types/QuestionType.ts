import { ReactNode } from "react";

export type Answer = {
  key: string;
  text: string;
};

export type QuestionType = {
  id: string;
  content: ReactNode;
  answers: Answer[];
};

export type Questions = QuestionType[];
