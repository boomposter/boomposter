import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {_, LanguageContext} from "../App";

const AppError = () => {
    const {language} = useContext(LanguageContext);
    const __ = _[language];
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-3">{__["Application error"]}</h1>
            <p>
                {__["An error occur while rendering an application"]}. <br/>
                {__["Please contact customer support"]}
            </p>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
                {__["Go back"]}
            </button>
        </div>
    );
};

export default AppError;
