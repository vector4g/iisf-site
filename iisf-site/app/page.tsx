import type { Metadata } from "next";
import IISFPage from "./iisf/page";

export const metadata: Metadata = {
  alternates: { canonical: "https://intersectionalsafety.org" },
};

export default function Home() {
  return <IISFPage />;
}
