import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="root-layout">
     <Navbar />
      {children}
    </div>
  );
}
