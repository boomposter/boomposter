import {useState, useEffect, useContext} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {toast} from "react-toastify";
import {Modal} from "react-bootstrap";
import client from "../client";
import {NotFoundError} from "../client/errors";
import PageLoading from "../components/PageLoading";
import routes from "../routes";
import QRCode from "qrcode.react";
import {useAuth} from "../hooks/AuthProvider";
import MapPicker from "react-google-map-picker";
import {GOOGLE_MAPS_API_KEY} from "../utils";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import {_, LanguageContext} from "../App";

const AdSpace = () => {
    const {language} = useContext(LanguageContext);
    const __ = _[language];

    const {id} = useParams();
    const navigate = useNavigate();
    const auth = useAuth();
    // const qrCodeElement = useRef(undefined);

    const [adspace, setAdspace] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [zoom, setZoom] = useState(10);

    const fetchAdspace = async () => {
        try {
            setAdspace(await client.adspaces.retrieve(id));
        } catch (error) {
            if (error instanceof NotFoundError) {
                navigate(routes.notFound, {replace: true});
                return;
            }

            console.error(error);
            toast.error("Error");
        }
    };

    useEffect(() => {
        fetchAdspace();
    }, [id]);

    const handleQrCodeDownload = () => {

        const qrCodeSvg = document.getElementById("qrcode");
        const svgData = new XMLSerializer().serializeToString(qrCodeSvg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            // Making internal image
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");

            // Trigger download
            const downloadLink = document.createElement("a");
            downloadLink.download = `QRCode_adspace_${adspace.id}`;
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    const handleDelete = async () => {
        try {
            await client.adspaces.destroy(id);
            navigate(routes.adspaces, {replace: true});
            return;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    if (adspace === undefined) {
        return <PageLoading/>;
    }

    return (
        <>
            <div id="wrap" className="container d-flex flex-md-row flex-column">
                <div style={{width: 500}}>
                    <div>
                        <h1>{adspace.title}</h1>
                        {auth.user?.id === adspace.user?.id && (
                            <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <div
                                    className="profile d-flex align-items-center dropdown-toggle"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    {__["Show QR"]}
                                </div>
                                <ul className="dropdown-menu dropdown-menu-start p-3">
                                    <div className=" d-flex flex-column gap-3">
                                        <QRCode
                                            id="qrcode"
                                            value={window.location.href}
                                            size={240}
                                            bgColor={"#ffffff"}
                                            fgColor={"#40006c"}
                                            level={"L"}
                                            renderAs={"svg"}
                                            imageSettings={{
                                                src: "/img/logo.svg",
                                                x: null,
                                                y: null,
                                                height: 48,
                                                width: 48,
                                            }}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleQrCodeDownload}
                                        >
                                            {__["Download"]}
                                        </button>
                                    </div>
                                    {/* <li>
                                            <h6 className="dropdown-header">Account</h6>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to={routes.profile}>
                                            Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to={routes.adspaces}>
                                            My AdSpaces
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <button
                                            className="dropdown-item"
                                            onClick={() => auth.logout()}
                                            >
                                            Logout
                                            </button>
                                        </li> */}
                                </ul>
                            </div>

                            {auth.user?.id === adspace.user?.id && (
                                <div>
                                    <Link className="btn" to={routes.adspaceEdit(adspace.id)}>
                                        {__["Edit"]}
                                    </Link>
                                    <button
                                        className="btn"
                                        onClick={() => setShowDeleteModal(true)}
                                    >
                                        {__["Delete"]}
                                    </button>
                                </div>
                            )}
                        </div>    
                        )}
                        
                    </div>
                    {adspace.images.length > 0 && (
                        <ImageGallery
                            items={adspace.images.map((image) => {
                                let img_url = image.image;
                                if(img_url.indexOf("http://boomposter.com") !== -1) {
                                    img_url = img_url.replace("http://boomposter.com", "")
                                }
                                return {original: img_url}
                            })}
                            infinite={false}
                        />
                    )}
                </div>
                <div
                    className="d-flex flex-column px-5 gap-3"
                    style={{paddingTop: 100, width: 500}}
                >
                    <div className="row">
                        <div className="col">{__["Price"]}:</div>
                        <div className="col">
                            <b>{adspace.price}</b> RUB/{__["day"]}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">{__["Posted"]}:</div>
                        <div className="col">{moment(adspace.created).fromNow()}</div>
                    </div>
                    <div className="row">
                        <div className="mb-2">{__["Description"]}:</div>
                        <div>{adspace.description}</div>
                    </div>
                    <div className="row mb-4">
                        <div className="mb-2">{__["Tags"]}:</div>
                        <div>
                            {adspace.tags.length > 0 ? (
                                adspace.tags.map((tag, index) => <span key={index} className="me-4">{tag}</span>)
                            ) : (
                                <div>{__["Not tags assigned"]}</div>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-2">{__["User"]}:</div>
                        <div>{adspace.user.username}</div>
                    </div>
                    {adspace.user.contactEmail && (
                        <div className="row">
                            <div className="mb-2">{__["Email"]}:</div>
                            <div>{adspace.user.contactEmail}</div>
                        </div>
                    )}
                    {adspace.user.contactPhone && (
                        <div className="row">
                            <div className="mb-2">{__["Phone"]}:</div>
                            <div>{adspace.user.contactPhone}</div>
                        </div>
                    )}
                    {adspace.user.contactMessenger && (
                        <div className="row">
                            <div className="mb-2">{__["Messenger"]}:</div>
                            <div>{adspace.user.contactMessenger}</div>
                        </div>
                    )}
                    {adspace.latitude && adspace.longitude && (
                        <div className="row mt-4">
                            <MapPicker
                                defaultLocation={{
                                    lat: adspace.latitude,
                                    lng: adspace.longitude,
                                }}
                                zoom={zoom}
                                mapTypeId="roadmap"
                                style={{height: 300, width: 500}}
                                onChangeLocation={() => {
                                }}
                                onChangeZoom={(zoom) => setZoom(zoom)}
                                apiKey={GOOGLE_MAPS_API_KEY}
                            />
                        </div>
                    )}
                </div>
            </div>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{__["Delete adspace"]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{__["Are your sure you want to delete this adspace"]}?</Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        {__["Close"]}
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            toast.promise(handleDelete(), {
                                promise: __["Deleting adspace..."],
                                error: __["Error while deleting"],
                                success: __["The adspace was deleted"],
                            })
                        }
                    >
                        {__["Yes"]}
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AdSpace;
