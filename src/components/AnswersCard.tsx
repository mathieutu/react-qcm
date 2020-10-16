import clsx from "clsx";
import React from "react";
import { Answer } from "../types/QuestionType";

type AnswerProps = {
  answer: Answer;
  active: boolean;
  onAnswerCheckedChange(key: string): void;
};

export default function AnswersCard({
  answer,
  active,
  onAnswerCheckedChange,
}: AnswerProps) {
  const handleClick = () => {
    onAnswerCheckedChange(answer.key);
  };

  return (
    <div className="w-1/2 px-5 py-5">
      <div
        role="button"
        className={clsx(
          [active ? "bg-green-300" : "bg-white"],
          "shadow-sm rounded-md"
        )}
        onClick={handleClick}
      >
        <div className="px-3 py-4">{answer.text}</div>
      </div>
    </div>
  );
}
