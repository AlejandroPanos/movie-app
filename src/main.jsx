import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import App from "./App";

const queryClient = new QueryClient();

const root = createRoot(document.querySelector("#root"));
root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>
)