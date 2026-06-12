import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import type { RootState } from "./root-reducer";

export type AppDispatch = ThunkDispatch<RootState, undefined, UnknownAction>;
