import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { UserContext } from "../contexts/UserContext";

type LoginInput = {
  email: string;
};

const schema = Joi.object<LoginInput>({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } }),
});

export default function Login() {
  const { errors, handleSubmit, register } = useForm<LoginInput>({
    resolver: joiResolver(schema),
  });
  const { onEmail } = useContext(UserContext);

  const onSubmit = ({ email }: LoginInput) => {
    console.log(email);

    onEmail(email);
  };

  return (
    <div className="h-screen flex">
      <div className="m-auto  w-1/3 rounded-md">
        <div className="pb-4  pt-1 px-3 space-y-2">
          <form
            noValidate
            className="space-x-6 flex"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="border border-gray-300 w-full rounded-md shadow-sm px-2 py-2"
              placeholder="Email Ynov"
              name="email"
              id="email"
              ref={register}
              type="email"
            />
            {errors.email && (
              <span className="text-xs text-red-600">{errors.email}</span>
            )}
            <button
              type="submit"
              className="bg-green-500 rounded-full w-1/4 text-white py-2 text-lg"
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
