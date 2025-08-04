"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XCircle } from "lucide-react";
import Button from "../forms/Button";

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}: ConfirmDeleteModalProps) {
  return (
    <Dialog as="div" className="relative z-50" onClose={onClose} open={isOpen}>
      <Transition appear show={isOpen} as={Fragment}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-150"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <div className="flex flex-col items-center gap-4 text-center">
                <XCircle className="text-red-500" size={48} />
                <Dialog.Title className="text-lg font-semibold text-gray-800">
                  {title}
                </Dialog.Title>
                <Dialog.Description className="text-gray-600">
                  {message}
                </Dialog.Description>

                <div className="mt-6 flex justify-center gap-4 w-full">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all"
                  >
                    Cancel
                  </button>
                  <Button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                  >
                    Yes, Delete
                  </Button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Transition>
    </Dialog>
  );
}
