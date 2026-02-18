"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function CharterModal({
  mode,
  onClose,
}: {
  mode: "charter" | "support" | null;
  onClose: () => void;
}) {
  const isOpen = mode !== null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-xl border border-slate-800 bg-[#05060a] p-6 text-left align-middle shadow-xl">
                {mode === "charter" && (
                  <>
                    <Dialog.Title className="text-lg font-semibold text-slate-100">
                      The Charter of Intersectional Rights
                    </Dialog.Title>
                    <p className="mt-2 text-sm text-slate-300">
                      Summary of principles governing the Intersectional Safety
                      Intelligence engine.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-200">
                      <li>1. No Data Without Consent.</li>
                      <li>2. Identity Sovereignty.</li>
                      <li>3. Algorithmic Accountability.</li>
                    </ul>
                    <a
                      href="/charter"
                      className="mt-6 inline-flex items-center rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800"
                    >
                      View Full Charter →
                    </a>
                  </>
                )}

                {mode === "support" && (
                  <>
                    <Dialog.Title className="text-lg font-semibold text-slate-100">
                      Support Our Research
                    </Dialog.Title>
                    <p className="mt-3 text-sm text-slate-300">
                      As a 501(c)(3) pending organization, we are currently
                      accepting research partnerships only. Contact the Board to
                      discuss grants, fellowships, or data collaborations.
                    </p>
                  </>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
