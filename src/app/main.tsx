import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./router/AppRouter";
import "../styles/base/global.css";
createRoot(document.getElementById("root")!).render(<BrowserRouter><AppRouter/></BrowserRouter>);
