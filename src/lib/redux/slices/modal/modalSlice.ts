import type { ReactElement } from "react";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ModalSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface SingleModalProps {
  id: string;
  open: boolean;
  body: ReactElement | null;
  title: string;
  onClose?: () => void;
  size?: ModalSize;
  modalClassName?: string;
  titleClassName?: string;
}

export type OpenModalPayload = Omit<SingleModalProps, "open"> & {
  open?: boolean;
};

export interface ModalState {
  modals: SingleModalProps[];
}

const initialState: ModalState = {
  modals: [],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state, action: PayloadAction<OpenModalPayload>) => {
      state.modals.push({
        ...action.payload,
        open: true,
        size: action.payload.size ?? "xl",
        body: action.payload.body ?? null,
        title: action.payload.title,
      });
    },
    close: (state, action: PayloadAction<{ id: string }>) => {
      state.modals = state.modals.filter((m) => m.id !== action.payload.id);
    },
  },
});
