import {Link, useNavigate} from "react-router-dom";
import routes from "../routes";
import adIllustration from "../assets/illustration-ad.svg";
import {useContext} from "react";
import {LanguageContext, _} from "../App";

const Home = () => {

    const {language} = useContext(LanguageContext);
    const __ = _[language];

    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <div className="row">
                <div
                    className="col-lg-6 d-flex mt-lg-0 mt-5 text-lg-start text-center flex-column justify-content-center order-lg-1 order-2">
                    <div className="fw-bold mb-3" style={{fontSize: "2.8rem"}}>
                        {__["MultiVendor – the most trustful ad space posting website"]}
                    </div>
                    <div>
                        <Link className="btn btn-primary btn-lg" to={routes.register}>
                            {__["Register"]}
                        </Link>
                    </div>
                </div>
                <div className="col text-center order-lg-2 order-1">
                    <img
                        className="img-fluid"
                        src={adIllustration}
                        alt="ad illustration"
                        width={500}
                    />
                </div>
            </div>
            <div className="row mt-5 gy-4 filter-panel">
                <div className="col-12 col-md-4">
                    <div
                        className="py-4 filter-panel_fiter-block"
                        role="button"
                        onClick={() => navigate("/adspaces/billboard/")}
                    >
                        <img src="/img/billboard.svg" alt=""/>
                        <div className="filter-block__text">Billboard</div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div
                        className="py-4 filter-panel_fiter-block"
                        role="button"
                        onClick={() => navigate("/adspaces/digital/")}
                    >
                        <img src="/img/digital.svg" alt=""/>
                        <div className="filter-block__text">Digital</div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div
                        className="py-4 filter-panel_fiter-block"
                        role="button"
                        onClick={() => navigate("/adspaces/transport/")}
                    >
                        <img src="/img/transit.svg" alt="" width={"115"} height={"111"}/>
                        <div className="filter-block__text">Transport</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
