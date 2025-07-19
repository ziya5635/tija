import { type AppState } from "../../types/appStore.type";
import { createContext } from "react";

export const AppContext = createContext<AppState>(null!);
