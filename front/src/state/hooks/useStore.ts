import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export function useStore() {
    return useContext(AppContext);
}