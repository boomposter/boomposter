import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import client from "../client";
import routes from "../routes";
import {
    getFileBase64DataUrl,
    getCurrentLatitudeLongitude,
    DEFAULT_LOCATION,
    GOOGLE_MAPS_API_KEY,
} from "../utils";
import MapPicker from "react-google-map-picker";
import {_, LanguageContext} from "../App";

export default function AdSpaceCreate() {
    const {language} = useContext(LanguageContext);
    const __ = _[language];

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [images, setImages] = useState([]);

    const [defaultLocation, setDefaultLocation] = useState(undefined);
    const [location, setLocation] = useState(undefined);
    const [zoom, setZoom] = useState(10);

    function handleChangeLocation(lat, lng) {
        setLocation({lat, lng});
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    const fetchCurrentUserLocation = async () => {
        try {
            const currentLocation = await getCurrentLatitudeLongitude();
            setLocation(currentLocation);
            setDefaultLocation(currentLocation);
            // setLocation(currentLocation);
        } catch (error) {
            // if (error instanceof GeolocationPositionError) {
                setDefaultLocation(DEFAULT_LOCATION);
                setLocation(DEFAULT_LOCATION);
                // return;
            // }
            console.error(error);
            // toast.error(error);
        }
    };

    useEffect(() => {
        fetchCurrentUserLocation();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await client.adspaces.create({
                title,
                price: price || null,
                description,
                tags,
                images,
                latitude: location?.lat,
                longitude: location?.lng,
            });

            navigate(routes.adspaces);
            return;
        } catch (error) {
            console.error(error);
            toast.error("Error");
        }
    };

    const handleTagCountIncrement = () => {
        setTags([...tags, ""]);
    };

    const handleTagInputChange = (e, index) => {
        setTags(
            tags.map((tag, tagIndex) => (tagIndex === index ? e.target.value : tag))
        );
    };

    const handleImagesChange = async (e) => {
        // Iterate over all uploaded images and convert them into Base64 data URL strings
        // (image serialized (not binary) form used in JSON text format)
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

    return (
        <div id="wrap" className="container">
            <h2 className="mb-3 mt-5">{__["Post advertisement space"]}</h2>

            <form
                className="col-lg-6 col-12"
                onSubmit={(e) =>
                    toast.promise(handleSubmit(e), {
                        pending: __["Creating new adspace"],
                        success: __["New adspace was created"],
                        error: __["Error while creating adspace"],
                    })
                }
            >
                <div className="mb-2">
                    <label className="form-label" htmlFor="createTitleInput">
                        {__["Title"]}
                    </label>
                    <input
                        className="form-control"
                        id="createTitleInput"
                        type="text"
                        maxLength={255}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="form-label" htmlFor="createPriceInput">
                        {__["Price"]}
                    </label>
                    <input
                        className="form-control"
                        id="createPriceInput"
                        type="number"
                        min={1}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="form-label" htmlFor="createDescriptionInput">
                        {__["Description"]}
                    </label>
                    <textarea
                        className="form-control"
                        id="createDescriptionInput"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="form-label">{__["Tags"]}</label>
                    <div>
                        {[...Array(tags.length).keys()].map((i) => (
                            <input
                                className="form-control mb-1"
                                key={i}
                                maxLength={255}
                                type="text"
                                onChange={(e) => handleTagInputChange(e, i)}
                            />
                        ))}
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={() => handleTagCountIncrement()}
                        >
                            {__["Add tag"]}
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="createImagesInput">
                        {__["Images"]}
                    </label>
                    <input
                        className="form-control"
                        id="createImagesInput"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        multiple
                        onChange={(e) =>
                            toast.promise(handleImagesChange(e), {
                                pending: __["Uploading images"],
                                error: __["Error while image upload"],
                                success: __["Images are uploaded"],
                            })
                        }
                    />
                    <div className="form-text">{__["Select multiple images"]}</div>
                </div>

                {defaultLocation !== undefined && (
                    <MapPicker
                        className="mb-3"
                        defaultLocation={defaultLocation}
                        zoom={zoom}
                        mapTypeId="roadmap"
                        style={{height: 300}}
                        onChangeLocation={handleChangeLocation}
                        onChangeZoom={handleChangeZoom}
                        apiKey={GOOGLE_MAPS_API_KEY}
                    />
                )}

                <button className="btn btn-primary" type="submit">
                    {__["Create"]}
                </button>
            </form>
        </div>
    );
}
