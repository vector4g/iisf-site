"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import CharterModal from "./CharterModal";

type CharterContextValue = {
  openCharter: () => void;
  openSupport: () => void;
};

const CharterContext = createContext<CharterContextValue | null>(null);

export function useCharter() {
  const ctx = useContext(CharterContext);
  if (!ctx) throw new Error("useCharter must be used within provider");
  return ctx;
}

export default function CharterModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<"charter" | "support" | null>(null);

  const openCharter = useCallback(() => setMode("charter"), []);
  const openSupport = useCallback(() => setMode("support"), []);

  const onClose = () => setMode(null);

  return (
    <CharterContext.Provider value={{ openCharter, openSupport }}>
      {children}
      <CharterModal mode={mode} onClose={onClose} />
    </CharterContext.Provider>
  );
}
