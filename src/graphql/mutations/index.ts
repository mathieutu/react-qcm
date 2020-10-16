import { gql } from "@apollo/client";

export const ADD_ANSWER = gql`
  mutation AddAnswer($answers: String!, $questionId: String!, $userId: uuid!) {
    addAnswer(
      object: { answer: $answers, question_id: $questionId, user_id: $userId },
      on_conflict: {constraint: answers_user_id_question_id_key, update_columns: answer}
    ) {
      id
      question_id
      answer
      user_id
    }
  }
`;

export const LOGIN_QUERY = gql`
  mutation AddUser($email: String!, $name: String!) {
    addUser(
      object: { email: $email, name: $name }
      on_conflict: { constraint: users_email_key, update_columns: name }
    ) {
      id
      email
      name
    }
  }
`;
