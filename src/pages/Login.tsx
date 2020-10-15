import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { User, userContext } from "../contexts/UserContext";
import { gql, useMutation } from "@apollo/client";

type LoginInput = {
  email: string;
  name: string;
};

const schema = Joi.object<LoginInput>({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required(),
  name: Joi.string().required(),
});

const LOGIN_QUERY = gql`
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

export default function Login() {
  const { errors, handleSubmit, register } = useForm<LoginInput>({
    resolver: joiResolver(schema),
  });
  const { onUserChange } = useContext(userContext);

  const [addUser, { called, loading }] = useMutation(LOGIN_QUERY);

  const onSubmit = ({ email, name }: LoginInput) => {
    console.log(email);
    addUser({ variables: { email, name } }).then(({ data }) => {
      const user: User = data.addUser;
      onUserChange(user);
    });
  };

  return (
    <div className="h-screen flex">
      <div className="m-auto  w-1/4 rounded-md">
        <div className="pb-4  pt-1 px-3 space-y-2">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <input
                className="border border-gray-300 w-full rounded-md shadow-sm px-2 py-2"
                placeholder="Email Ynov"
                name="email"
                id="email"
                ref={register}
                type="email"
              />
              <input
                className="border border-gray-300 w-full rounded-md shadow-sm px-2 py-2"
                placeholder="NOM Prénom"
                name="name"
                id="name"
                ref={register}
                type="text"
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-600">{errors.email}</span>
            )}
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-full w-full text-white py-2 text-lg"
            >
              {called && loading ? <>Loading...</> : <>GO</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
