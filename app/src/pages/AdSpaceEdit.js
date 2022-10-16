import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import client from "../client";
import {NotFoundError} from "../client/errors";
import PageLoading from "../components/PageLoading";
import routes from "../routes";
import {getFileBase64DataUrl, GOOGLE_MAPS_API_KEY} from "../utils";
import MapPicker from "react-google-map-picker";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {DEFAULT_LOCATION} from "../utils";
import {_, LanguageContext} from "../App";

const AdSpaceEdit = () => {
    const {language} = useContext(LanguageContext);
    const __ = _[language];

    const {id} = useParams();
    const navigate = useNavigate();

    const [adspace, setAdspace] = useState(undefined);
    // Images for uploading
    const [images, setImages] = useState(undefined);

    // const [defaultLocation, setDefaultLocation] = useState(undefined);
    const [, setLocation] = useState(undefined);
    const [zoom, setZoom] = useState(10);

    const fetchAdspace = async () => {
        try {
            setAdspace(await client.adspaces.retrieve(id));
        } catch (error) {
            if (error instanceof NotFoundError) {
                navigate(routes.notFound, {replace: true});
            }

            console.error(error);
            toast.error("Error");
        }
    };
    useEffect(() => {
        fetchAdspace();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await client.adspaces.update(adspace);
            navigate(routes.adspace(id));
            return;
        } catch (error) {
            console.error(error);
            toast.error("Error");
        }
    };

    const handleDeleteImage = async (id) => {
        try {
            // Remove image on the server
            await client.images.destroy(id);

            // Remove image on the client
            setAdspace({
                ...adspace,
                images: adspace.images.filter((image) => image.id !== id),
            });
        } catch (error) {
            console.error(error);
            return;
        }
    };

    const handleImageChange = async (e) => {
        try {
            setImages(
                await Promise.all(
                    [...e.target.files].map((file) => getFileBase64DataUrl(file))
                )
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();

        try {
            // Upload images to the server
            const uploadedImages = await Promise.all(
                images.map((image) =>
                    client.images.create({adspace: adspace.id, image: image})
                )
            );

            // Add images locally
            setAdspace({
                ...adspace,
                images: [...adspace.images, ...uploadedImages],
            });

            // Clear file input
            e.target.reset();
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    if (adspace === undefined) {
        return <PageLoading/>;
    }

    return (
        <div className="container">
            <h2 className="mb-3 mt-5">{__["Edit advertisement space"]}</h2>
            <form
                className="col-lg-6 col-12"
                onSubmit={(e) =>
                    toast.promise(handleFormSubmit(e), {
                        pending: __["Updating adspace"],
                        success: __["Adspace was updated"],
                        error: __["Error while updating adspace"],
                    })
                }
            >
                <div className="mb-2">
                    <label className="form-label" htmlFor="editTitleInput">
                        {__["Title"]}
                    </label>
                    <input
                        className="form-control"
                        id="editTitleInput"
                        type="text"
                        maxLength={255}
                        defaultValue={adspace.title}
                        onChange={(e) => setAdspace({...adspace, title: e.target.value})}
                    />
                </div>
                <div className="mb-2">
                    <label className="form-label" htmlFor="editTitleInput">
                        {__["Price"]}
                    </label>
                    <input
                        className="form-control"
                        id="editTitleInput"
                        type="number"
                        min={1}
                        defaultValue={adspace.price}
                        onChange={(e) => setAdspace({...adspace, price: e.target.value})}
                    />
                </div>
                {/* <div className="mb-2">
          <label className="form-label" htmlFor="editTitleInput">
            Location
          </label>
          <input
            className="form-control"
            id="editTitleInput"
            type="text"
            maxLength={255}
            defaultValue={adspace.location}
            onChange={(e) =>
              setAdspace({ ...adspace, location: e.target.value })
            }
          />
        </div> */}
                <div className="mb-2">
                    <label className="form-label" htmlFor="editTitleInput">
                        {__["Description"]}
                    </label>
                    <textarea
                        className="form-control"
                        id="editTitleInput"
                        defaultValue={adspace.description}
                        onChange={(e) =>
                            setAdspace({...adspace, description: e.target.value})
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">{__["Tags"]}</label>
                    {[...Array(adspace.tags.length).keys()].map((i) => (
                        <input
                            className="form-control mb-1"
                            key={i}
                            type="text"
                            defaultValue={adspace.tags[i]}
                            onChange={(e) =>
                                setAdspace({
                                    ...adspace,
                                    tags: adspace.tags.map((tag, index) =>
                                        index === i ? e.target.value : tag
                                    ),
                                })
                            }
                        />
                    ))}
                    <div>
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() =>
                                setAdspace({...adspace, tags: [...adspace.tags, ""]})
                            }
                        >
                            {__["Add tag"]}
                        </button>
                    </div>
                </div>
                {/* {adspace.latitude && adspace.longitude && <>Hello</>} */}
                {
                    <MapPicker
                        className="mb-3"
                        defaultLocation={{
                            lat: adspace.latitude || DEFAULT_LOCATION.lat,
                            lng: adspace.longitude || DEFAULT_LOCATION.lng,
                        }}
                        zoom={zoom}
                        mapTypeId="roadmap"
                        style={{height: 300, width: 500}}
                        onChangeLocation={(lat, lng) =>
                            setAdspace({...adspace, latitude: lat, longitude: lng})
                        }
                        onChangeZoom={(zoom) => setZoom(zoom)}
                        apiKey={GOOGLE_MAPS_API_KEY}
                    />
                }
                <div>
                    <button className="btn btn-primary mb-3" type="submit">
                        {__["Save"]}
                    </button>
                </div>
            </form>
            <form
                className="col-lg-6 col-12"
                onSubmit={(e) =>
                    toast.promise(handleImageUpload(e), {
                        pending: __["Uploading images"],
                        success: __["Images were uploaded"],
                        error: __["Error while uploading images"],
                    })
                }
            >
                <div className="mb-3">
                    <label className="form-label">{__["Images"]}</label>
                    {adspace.images.map((image) => (
                        <div className="mb-1 d-flex align-items-start" key={image.id}>
                            <img
                                className="img-fluid rounded-2"
                                src={image.image}
                                width={200}
                                style={{objectFit: "cover", height: 150}}
                            />
                            <button
                                className="btn"
                                type="button"
                                onClick={() =>
                                    toast.promise(handleDeleteImage(image.id), {
                                        pending: __["Deleting image"],
                                        error: __["Error while deleting image"],
                                        success: __["Image was deleted"],
                                    })
                                }
                            >
                                <FontAwesomeIcon className="fs-4" icon={faCircleXmark}/>
                            </button>
                        </div>
                    ))}
                </div>
                <input
                    className="form-control mb-2"
                    type="file"
                    multiple
                    onChange={(e) =>
                        toast.promise(handleImageChange(e), {
                            pending: __["Processing images"],
                            success: __["Images were processed"],
                            error: __["Error while processing images"],
                        })
                    }
                />
                <button className="btn btn-primary" type="submit">
                    {__["Upload"]}
                </button>
            </form>
        </div>
    );
};

export default AdSpaceEdit;
