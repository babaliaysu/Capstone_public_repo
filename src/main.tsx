import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./frontend/dil/config.ts";

createRoot(document.getElementById("root")!).render(<App />);
