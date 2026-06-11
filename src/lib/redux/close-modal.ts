import { getAppStore } from "./app-store-ref";
import { modalSlice } from "./slices/modal";

/** Chiude una modale per id da fuori React (es. layout / effetti), come negli esempi. */
export function closeModal(modalId: string) {
  getAppStore()?.dispatch(modalSlice.actions.close({ id: modalId }));
}

/** Nome come in `examples/src/components/Modal`. */
export function CloseModal(modalId: string) {
  closeModal(modalId);
}
