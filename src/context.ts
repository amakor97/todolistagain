import { createContext } from "react";
import type { Store } from "./types/Store";
import { initialState } from "./defaultValues";

export const AppContext = createContext<Store>(initialState);