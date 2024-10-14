import { createRoot } from "react-dom/client";
import { createElement } from "react";
import App from "./components/App.tsx";
import "./index.css";

const root = document.getElementById("appRoot")!;
const reactDOM = createRoot(root);

reactDOM.render(createElement(App));
