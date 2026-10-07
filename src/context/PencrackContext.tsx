"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ToastItem {
  id: string;
  msg: string;
  type?: "info" | "err" | "success";
}

interface PencrackContextType {
  // Drawer
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;

  // Auth
  isAuthOpen: boolean;
  authMode: "login" | "signup";
  openAuth: (mode?: "login" | "signup") => void;
  closeAuth: () => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;

  // Gift
  isGiftOpen: boolean;
  giftRecipient: { name: string; img: string } | null;
  openGift: (name: string, img: string) => void;
  closeGift: () => void;

  // Service Request
  isServiceRequestOpen: boolean;
  serviceRequestName: string;
  openServiceRequest: (serviceName: string) => void;
  closeServiceRequest: () => void;

  // Reader
  isReaderOpen: boolean;
  readerData: any | null;
  openReader: (data: any, type?: string) => void;
  closeReader: () => void;

  // Toast
  toasts: ToastItem[];
  showToast: (msg: string, type?: "info" | "err" | "success") => void;
}

const PencrackContext = createContext<PencrackContextType | undefined>(undefined);

export function PencrackProvider({ children }: { children: ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState<{ name: string; img: string } | null>(null);

  const [isServiceRequestOpen, setIsServiceRequestOpen] = useState(false);
  const [serviceRequestName, setServiceRequestName] = useState("");

  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerData, setReaderData] = useState<any | null>(null);

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  const openAuth = (mode: "login" | "signup" = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    closeDrawer();
  };
  const closeAuth = () => setIsAuthOpen(false);

  const login = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    showToast("Welcome to Pencrack! 🎉", "success");
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast("Logged out successfully");
  };

  const openGift = (name: string, img: string) => {
    setGiftRecipient({ name, img });
    setIsGiftOpen(true);
  };
  const closeGift = () => {
    setIsGiftOpen(false);
    setGiftRecipient(null);
  };

  const openServiceRequest = (serviceName: string) => {
    setServiceRequestName(serviceName);
    setIsServiceRequestOpen(true);
  };
  const closeServiceRequest = () => setIsServiceRequestOpen(false);

  const openReader = (data: any, type = "Story") => {
    setReaderData({ ...data, contentType: type });
    setIsReaderOpen(true);
  };
  const closeReader = () => setIsReaderOpen(false);

  const showToast = (msg: string, type: "info" | "err" | "success" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <PencrackContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawer,
        closeDrawer,
        isAuthOpen,
        authMode,
        openAuth,
        closeAuth,
        isLoggedIn,
        login,
        logout,
        isGiftOpen,
        giftRecipient,
        openGift,
        closeGift,
        isServiceRequestOpen,
        serviceRequestName,
        openServiceRequest,
        closeServiceRequest,
        isReaderOpen,
        readerData,
        openReader,
        closeReader,
        toasts,
        showToast,
      }}
    >
      {children}
    </PencrackContext.Provider>
  );
}

export function usePencrack() {
  const context = useContext(PencrackContext);
  if (!context) {
    throw new Error("usePencrack must be used within a PencrackProvider");
  }
  return context;
}
