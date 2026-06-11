import type { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import type { RootState } from "./root-reducer";
import type { ThunkExtra } from "./thunk-extra";

export type AppDispatch = ThunkDispatch<RootState, ThunkExtra, UnknownAction>;
