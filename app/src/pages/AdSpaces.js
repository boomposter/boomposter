import {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import client from "../client";
import PageLoading from "../components/PageLoading";
import {useAuth} from "../hooks/AuthProvider";
import routes from "../routes";
import {_, LanguageContext} from "../App";

export default function AdSpaces(props) {
    const {language} = useContext(LanguageContext);
    const __ = _[language];

    const auth = useAuth();
    const [adspaces, setAdspaces] = useState(undefined);

    const fetchAdspaces = async () => {
        try {
            setAdspaces(await client.adspaces.list({user: auth.user?.id, tag: props.tag}));
        } catch (error) {
            console.error(error);
            toast.error("Error");
        }
    };

    useEffect(() => {
        fetchAdspaces();
    }, []);

    if (adspaces === undefined) {
        return <PageLoading/>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">{__["Posted Advertisement spaces"]}</h2>
            {auth.user &&
                <Link className="btn btn-primary mb-4" to={routes.adspaceCreate}>
                    {__["Post adspace"]}
                </Link>
            }
            <div>
                {adspaces.count === 0 ? (
                    <div>{__["No advertisement spaces created"]}.</div>
                ) : (
                    adspaces.results.map((adspace) => (
                        <AdSpace key={adspace.id} adspace={adspace}/>
                    ))
                )}
            </div>
        </div>
    );
}

function AdSpace({adspace}) {
    return (
        <div className="card mb-2 p-3 adspace-card">
            <div className="d-flex">
                {adspace.images.length > 0 && (
                    <img
                        className="img-fluid me-3 rounded-3"
                        src={adspace.images[0].image}
                        width={150}
                    />
                )}
                <div>
                    <Link
                        className="fs-3 text-dark text-decoration-none"
                        style={{fontWeight: 600}}
                        to={routes.adspace(adspace.id)}
                    >
                        {adspace.title}
                    </Link>
                    <p>{adspace.description}</p>
                </div>
            </div>
        </div>
    );
}
