import type { ReactNode } from "react";

export type Props<T = undefined> = { children?: ReactNode } & T;