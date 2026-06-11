import type { RootState } from "@/lib/redux/root-reducer";

export const selectModals = (state: RootState) => state.modal.modals;
