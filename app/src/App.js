import React, {useState} from "react";
import {Routes, Route, Navigate, HashRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import routes from "./routes";
import {AuthProvider, useAuth} from "./hooks/AuthProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import AppLoading from "./components/AppLoading";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AppError from "./pages/AppError";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdSpaces from "./pages/AdSpaces";
import AdSpaceCreate from "./pages/AdSpaceCreate";
import AdSpaceEdit from "./pages/AdSpaceEdit";
import AdSpace from "./pages/AdSpace";
import ru from "./languages/ru.json";
import en from "./languages/en.json";
import kz from "./languages/kz.json";

export const LanguageContext = React.createContext(null);

export const _ = {ru, kz, en};

const AuthenticatedRequired = ({children}) => {
    const auth = useAuth();

    if (auth.user === null) {
        return <Navigate to={routes.login} replace/>;
    }

    return children;
};

const NotAuthenticatedRequired = ({children}) => {
    const auth = useAuth();

    if (auth.user !== null) {
        return <Navigate to={routes.home} replace/>;
    }

    return children;
};

const App = () => {

    const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

    document.documentElement.lang = language;

    const LanguageContextValue = {
        "language": language,
        "setLanguage": setLanguage
    }

    return (
        <>
            <LanguageContext.Provider value={LanguageContextValue}>
                <ToastContainer
                    position="top-center"
                    autoClose={4000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <AuthProvider>
                    <HashRouter>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ErrorBoundary>
                                        <AppLoading>
                                            <Layout/>
                                        </AppLoading>
                                    </ErrorBoundary>
                                }
                            >
                                <Route index element={<Home/>}/>
                                <Route path="error" element={<AppError/>}/>
                                <Route path="404" element={<NotFound/>}/>
                                <Route
                                    path="login"
                                    element={
                                        <NotAuthenticatedRequired>
                                            <Login/>
                                        </NotAuthenticatedRequired>
                                    }
                                />
                                <Route
                                    path="register"
                                    element={
                                        <NotAuthenticatedRequired>
                                            <Register/>
                                        </NotAuthenticatedRequired>
                                    }
                                />
                                <Route
                                    path="profile"
                                    element={
                                        <AuthenticatedRequired>
                                            <Profile/>
                                        </AuthenticatedRequired>
                                    }
                                />
                                <Route path="adspaces">
                                    <Route index element={<AdSpaces />}/>
                                    <Route path="billboard" element={<AdSpaces tag="billboard" />}/>
                                    <Route path="digital" element={<AdSpaces tag="digital" />}/>
                                    <Route path="transport" element={<AdSpaces tag="transport" />}/>
                                    <Route
                                        path="create"
                                        element={
                                            <AuthenticatedRequired>
                                                <AdSpaceCreate/>
                                            </AuthenticatedRequired>
                                        }
                                    />
                                    <Route path=":id">
                                        <Route index element={<AdSpace/>}/>
                                        <Route
                                            path="edit"
                                            element={
                                                <AuthenticatedRequired>
                                                    <AdSpaceEdit/>
                                                </AuthenticatedRequired>
                                            }
                                        />
                                    </Route>
                                </Route>
                            </Route>
                        </Routes>
                    </HashRouter>
                </AuthProvider>
            </LanguageContext.Provider>
        </>
    );
};

export default App;
