import {useState, useContext} from "react";
import {toast} from "react-toastify";
import {BadRequestError} from "../client/errors";
import {useAuth} from "../hooks/AuthProvider";
import {_, LanguageContext} from "../App";

const Login = () => {
    const {language} = useContext(LanguageContext);
    const __ = _[language];

    const auth = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await auth.login({email, password});
            return;
        } catch (error) {
            if (error instanceof BadRequestError) {
                throw error;
            }
            // Other errors
            console.error(error);
            toast.error("Error");
            throw error;
        }
    };

    return (
        <div className="d-flex flex-column align-items-center">
            <h2 className="mb-4 mt-5">{__["Login"]}</h2>
            <form
                onSubmit={(e) =>
                    toast.promise(handleFormSubmit(e), {
                        pending: __["Login with provided credentials"],
                        success: __["Successfully logged-in"],
                        error: __["Unable to login with provided credentials"],
                    })
                }
                style={{width: 400}}
            >
                <div className="mb-2">
                    <label className="form-label" htmlFor="loginEmailInput">
                        {__["Email"]}
                    </label>
                    <input
                        className="form-control"
                        id="loginEmailInput"
                        type="email"
                        maxLength={255}
                        required
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="loginPasswordInput">
                        {__["Password"]}
                    </label>
                    <input
                        className="form-control"
                        id="loginPasswordInput"
                        type="password"
                        required
                        onChange={handlePasswordChange}
                    />
                </div>
                <button className="btn btn-primary" type="submit">
                    {__["Login"]}
                </button>
            </form>
        </div>
    );
};

export default Login;
