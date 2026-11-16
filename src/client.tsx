import { StartClient } from "@tanstack/react-start/client";
import { hydrateRoot } from "react-dom/client";

import { getRouter } from "./router";

hydrateRoot(document, <StartClient router={getRouter()} />);
