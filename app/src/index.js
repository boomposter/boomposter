import { render } from "react-dom";
import App from "./App";

import "./scss/index.scss";
import "./scss/bootstrap.scss";
import "bootstrap/dist/js/bootstrap.bundle";

import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/scss/image-gallery.scss";

render(<App />, document.getElementById("root"));
