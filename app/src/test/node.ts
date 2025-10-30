import { setupServer } from "msw/node";
import { apiHandlers } from "./apiMock";

export const server = setupServer(...apiHandlers);
