import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import "../res/login.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({ mode: "all" });
  const [error, setError] = useState("");

  async function onSubmit(data) {
    const response = await axios.post("http://localhost:3000/login", data);

    setError(response.data?.error);
  }

  function handleUsernameErrorDisplay() {
    if (errors?.username)
      return <p className="formError inline">{errors.username.message}</p>;
  }

  function handlePasswordErrorDisplay() {
    if (errors?.password)
      return <p className="formError inline">{errors.password.message}</p>;
  }

  function handleServerErrorDisplay() {
    if (error) return <p className="formError">{error}</p>;
  }

  return (
    <section className="baseSection loginSection flexFill">
      <div className="borderWrapper">
        <form className="login" onSubmit={handleSubmit(onSubmit)}>
          <div className={`formEntry ${errors?.username ? "invalid" : ""}`}>
            <label htmlFor="username">Username</label>
            <input
              {...register("username", {
                pattern: {
                  value: /[a-zA-Z0-9_]$/,
                  message:
                    "A username can only contain letters, numbers and underscores",
                },
                minLength: {
                  value: 3,
                  message: "A username must be at least 3 characters long",
                },
                required: {
                  value: true,
                  message: "A username must be provided",
                },
              })}
            ></input>
            {handleUsernameErrorDisplay()}
          </div>
          <div className={`formEntry ${errors?.password ? "invalid" : ""}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                pattern: {
                  value: /^\S*$/,
                  message: "Passwords cannot contain whitespace",
                },
                required: {
                  value: true,
                  message: "A password must be provided",
                },
              })}
            ></input>
            {handlePasswordErrorDisplay()}
          </div>
          <div className="formFooter">
            {handleServerErrorDisplay()}
            <button
              type="submit"
              className="submit"
              disabled={!isDirty || !isValid}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
