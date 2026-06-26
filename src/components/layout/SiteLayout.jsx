import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-[#F9FBFF]">
      <Navbar />
      <main className="pt-24">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}