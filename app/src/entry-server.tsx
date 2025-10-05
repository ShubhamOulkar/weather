import { StrictMode } from "react";
import { type RenderToPipeableStreamOptions, renderToPipeableStream } from "react-dom/server";
import App from "./App";

export function render(_url: string, options?: RenderToPipeableStreamOptions) {
    return renderToPipeableStream(
        <StrictMode>
            <App />
            <vite-streaming-end></vite-streaming-end>
        </StrictMode>,
        options
    )
}