import {useContext} from "react";
import {_, LanguageContext} from "../App";


const NotFound = () => {
    const {language} = useContext(LanguageContext);
    const __ = _[language];

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-3">404: {__["Page not found"]}</h1>
            <p>{__["Sorry, this page was not found on the client-side"]}.</p>
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
                {__["Go back"]}
            </button>
        </div>
    );
};

export default NotFound;
