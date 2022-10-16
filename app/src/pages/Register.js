import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RegisterError } from "../client/errors";
import { useAuth } from "../hooks/AuthProvider";
import routes from "../routes";
import {_, LanguageContext} from "../App";

const Register = () => {
  const {language} = useContext(LanguageContext);
  const __ = _[language];
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleFormSubmit = async () => {
    try {
      await auth.register({ email, username, password });
      navigate(routes.login);
      return;
    } catch (error) {
      if (error instanceof RegisterError) {
        console.error(error);
        throw error;
      }

      console.error(error);
      toast.error("Error");
      throw error;
    }
  };

  const checkPasswordsDontMatch = () => {
    return confirmPassword.length > 0 && password !== confirmPassword;
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-4 mt-5">{__["Register"]}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (checkPasswordsDontMatch()) {
            return;
          }
          toast.promise(handleFormSubmit(), {
            pending: __["Registering user"],
            success: __["User was successfully registered"],
            error: __["Error while registering new user"],
          });
        }}
        style={{ width: 400 }}
      >
        <div className="mb-2">
          <label className="form-label" htmlFor="registerEmailInput">
            {__["Email"]}
          </label>
          <input
            className="form-control"
            id="registerEmailInput"
            type="email"
            autoComplete="off"
            required
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="registerUsernameInput">
            {__["Username"]}
          </label>
          <input
            className="form-control"
            id="registerUsernameInput"
            type="text"
            pattern="[\w.@]+\Z"
            autoComplete="off"
            required
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="registerPasswordInput">
            {__["Password"]}
          </label>
          <input
            className="form-control"
            id="registerPasswordInput"
            type="password"
            minLength={8}
            required
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="registerConfirmPasswordInput">
            {__["Confirm Password"]}
          </label>
          <input
            className={[
              "form-control",
              ...[checkPasswordsDontMatch() ? ["is-invalid"] : []],
            ].join(" ")}
            id="registerConfirmPasswordInput"
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {checkPasswordsDontMatch() && (
            <div className="invalid-feedback">{__["Passwords don't match"]}</div>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          {__["Register"]}
        </button>
      </form>
    </div>
  );
};

export default Register;
