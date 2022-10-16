import {Link} from "react-router-dom";
import {useAuth} from "../hooks/AuthProvider";
import routes from "../routes";
// import logo from "../assets/logo.svg";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useContext} from "react";
import {_, LanguageContext} from "../App";

const LanguageSelector = () => {

    const languages = ["RU", "KZ", "EN"];

    const {language, setLanguage} = useContext(LanguageContext);
    delete languages[language];

    const switchLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    }

    return (
        <div className="d-flex">
            {languages.filter(l => l.toLowerCase() != language).map((lang =>
                    <span key={lang} className="me-3" role="button" onClick={() => switchLanguage(lang.toLowerCase())}>
                        {lang}
                    </span>
            ))}
        </div>
    );
}

const Header = () => {
    const auth = useAuth();

    const {language} = useContext(LanguageContext);
    const __ = _[language];

    return (
        <div className="d-flex justify-content-between align-items-center bg-light py-2 px-3 mb-3">
            <div className="d-flex gap-2 align-items-center">
                <Link
                    className="text-dark fs-3 text-decoration-none"
                    style={{fontWeight: 600}}
                    to={routes.home}
                >
                <img src="/img/logo.svg" alt="logo" height={32}/>
                </Link>
            </div>
            <div className="d-flex align-items-center">
                <div className="d-flex">
                    <LanguageSelector/>
                </div>
                {auth.user === null ? (
                    <div className="d-flex gap-2">
                        <Link className="btn btn-outline-primary" to={routes.login}>
                            {__["Login"]}
                        </Link>
                        <Link className="btn btn-primary" to={routes.register}>
                            {__["Register"]}
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div
                            className="profile d-flex align-items-center dropdown-toggle"
                            role="button"
                            data-bs-toggle="dropdown"
                        >
                            <div className="fs-5 fw-bolder me-3">{auth.user.username}</div>
                            <FontAwesomeIcon className="fs-4 me-2" icon={faUserCircle}/>
                        </div>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <h6 className="dropdown-header">{__["Account"]}</h6>
                            </li>
                            <li>
                                <Link className="dropdown-item" to={routes.profile}>
                                    {__["Profile"]}
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to={routes.adspaces}>
                                    {__["My AdSpaces"]}
                                </Link>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => {
                                        auth.logout();
                                        navigate(routes.login);
                                    }}
                                >
                                    {__["Logout"]}
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
