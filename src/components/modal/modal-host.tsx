"use client";

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  modalSlice,
  selectModals,
  type SingleModalProps,
} from "@/lib/redux/slices/modal";

/**
 * Montare una sola volta dentro il `Provider` Redux (es. in `AppProviders`).
 * Stesso ruolo di `CustomModal` negli esempi.
 */
export function ModalHost() {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(selectModals);

  const handleOpenChange = (modalData: SingleModalProps, open: boolean) => {
    if (!open) {
      modalData.onClose?.();
      dispatch(modalSlice.actions.close({ id: modalData.id }));
    }
  };

  return (
    <>
      {modals.map((modalData) => (
        <DialogRoot
          key={modalData.id}
          open={modalData.open}
          onOpenChange={(open) => handleOpenChange(modalData, open)}
        >
          <DialogPortal>
            <DialogOverlay />
            <DialogContent
              size={modalData.size ?? "xl"}
              className={modalData.modalClassName ?? ""}
            >
              <DialogHeader className={modalData.titleClassName}>
                {modalData.title}
              </DialogHeader>
              <DialogCloseTrigger />
              <DialogBody className="max-md:px-0.5">
                {modalData.body}
              </DialogBody>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
      ))}
    </>
  );
}

/** Alias come in `examples/src/components/Modal`. */
export const CustomModal = ModalHost;
