import React from "react";
import { QuestionType } from "../types/QuestionType";

type QuestionProps = {
  question: QuestionType;
};

export default function QuestionCard({ question }: QuestionProps) {
  return (
    <div className="bg-white shadow-sm w-full rounded-md">
      <div className="p-3">{question.content}</div>
    </div>
  );
}
