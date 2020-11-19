import React from "react";
import { useForm, ErrorMessage } from "react-hook-form";

function HookForm() {
  const {
    register,
    errors,
    handlesubmit,
    getValues,
    formState,
    reset,
  } = useForm({
    validateCriteriaMode: "All",
    mode: "onChange",
  });

  const onSubmit = (data, e) => {
    e.target.reset();
    console.log(data);
  };

  return (
    <div>
      <h5>React-Hook-Form</h5>
      <form onSubmit={handlesubmit(onSubmit)}>
        {/*UserName*/}
        <div className="form-group">
          <label htmlFor="username">UserName</label>
          <input
            className="form-control"
            name="username"
            ref={register({
              required: "UserName is required",
              maxLength: {
                value: 15,
                message: "UserName should be between 6 and 15 characters",
              },
              minLength: {
                value: 6,
                message: "UserName should be between 6 and 15 characters",
              },
            })}
          />
          <ErrorMessage errors={errors} name="username">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="help-block text-danger" key={type}>
                  {message}
                </p>
              ))
            }
          </ErrorMessage>
        </div>
        {/*Email*/}
        <div className="form-group">
          <label htmlFor="email">email</label>
          <input
            className="form-control"
            name="email"
            type="email"
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter Valid Email address",
              },
            })}
          />
          <ErrorMessage errors={errors} name="email">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="help-block text-danger" key={type}>
                  {message}
                </p>
              ))
            }
          </ErrorMessage>
        </div>
        {/*Password*/}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            name="password"
            type="password"
            ref={register({
              required: "Password is required",
              minLength: {
                values: 8,
                message: "Password should be at least 8 characters",
              },
            })}
          />
          <ErrorMessage errors={errors} name="password">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="help-block text-danger" key={type}>
                  {message}
                </p>
              ))
            }
          </ErrorMessage>
        </div>
        {/*ConfirmPassword*/}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="form-control"
            name="confirmPassword"
            type="password"
            ref={register({
              required: "Please confirm your Password",
              validate: (value) => {
                if (value === getValues()["password"]) {
                  return true;
                } else {
                  return "The Passwords do not match Try Again ";
                }
              },
            })}
          />
          <ErrorMessage errors={errors} name="confirmPassword">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p className="help-block text-danger" key={type}>
                  {message}
                </p>
              ))
            }
          </ErrorMessage>
        </div>
        <div className="btn-group">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!formState.isValid}
          >
            Submit
          </button>

          <button
            className="btn btn-danger"
            type="button"
            onClick={() => reset()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
export default HookForm;
