import type { ReactNode } from "react";
//T would be only object type
export type Props<T extends object = object> = {
    children?: ReactNode;
} & T;