import React, { FormEvent, useContext, useEffect, useState } from "react";
import AnswersCard from "../components/AnswersCard";
import Header from "../components/Header";
import QuestionCard from "../components/QuestionCard";
import { questions } from "../config/questions";
import { gql, useMutation } from "@apollo/client";
import { UserContext } from "../contexts/UserContext";

const ADD_ANSWER = gql`
  mutation AddAnswer($answers: String!, $questionId: String!, $userId: uuid!) {
    addAnswer(
      object: { answer: $answers, question_id: $questionId, user_id: $userId }
    ) {
      id
      question_id
      answer
      user_id
    }
  }
`;

export default function Questions() {
  const [addAnswer, { loading, called }] = useMutation(ADD_ANSWER);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [answers, setAnswers] = useState<string[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const currentQuestion = localStorage.getItem("currentQuestion");
    if (!currentQuestion) {
      setCurrentQuestionIndex(0);
      localStorage.setItem("currentQuestion", "0");
    } else {
      setCurrentQuestionIndex(parseInt(currentQuestion));
    }
  }, []);

  const handleAnswerChange = (key: string) => {
    if (!answers.includes(key)) {
      setAnswers([...answers, key]);
    } else {
      setAnswers([...answers.filter((k) => k !== key)]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(user?.id);

    addAnswer({
      variables: {
        answers: JSON.stringify(answers),
        questionId: questions[currentQuestionIndex].id,
        userId: user?.id,
      },
    })
      .then((data) => {
        console.log(data);
        setAnswers([]);
        setCurrentQuestionIndex((currIndex) => currIndex + 1);
        localStorage.setItem("currentQuestion", `${currentQuestionIndex + 1}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <div className="mx-5 text-lg font-bold pt-3">
          Question {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div className="mt-5 mx-5 mb-10">
          <QuestionCard question={questions[currentQuestionIndex]} />
        </div>
        <div className="px-5">
          <div className="flex flex-wrap -mx-5">
            {questions[currentQuestionIndex].answers.map((answer) => (
              <AnswersCard
                key={questions[currentQuestionIndex].id.concat(answer.key)}
                answer={answer}
                onAnswerCheckedChange={handleAnswerChange}
              />
            ))}
          </div>
          <div className="flex justify-end mt-5">
            <form onSubmit={handleSubmit}>
              {currentQuestionIndex === questions.length - 1 ? (
                <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                  {loading && called ? <>Envoie ...</> : <>Terminer</>}
                </button>
              ) : (
                <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                  {loading && called ? <>Envoie ...</> : <>Envoyer</>}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
