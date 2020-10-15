import clsx from "clsx";
import React from "react";
import { useToggle } from "../hooks/useToggle";
import { Answer } from "../types/QuestionType";

type AnswerProps = {
  answer: Answer;
  onAnswerCheckedChange(key: string): void;
};

export default function AnswersCard({
  answer,
  onAnswerCheckedChange,
}: AnswerProps) {
  const { value, toggle } = useToggle(false);

  const handleClick = () => {
    toggle();
    onAnswerCheckedChange(answer.key);
  };

  return (
    <div className="w-1/2 px-5 py-5">
      <div
        role="button"
        className={clsx(
          [!value ? "bg-green-300" : "bg-white"],
          "shadow-sm rounded-md"
        )}
        onClick={handleClick}
      >
        <div className="px-3 py-4">{answer.text}</div>
      </div>
    </div>
  );
}
