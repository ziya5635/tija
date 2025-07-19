import { type User } from "./user.type";

export interface AppState {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (
        username: string,
        email: string,
        password: string
    ) => Promise<void>;
}
