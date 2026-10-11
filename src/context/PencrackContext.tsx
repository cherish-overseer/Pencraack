"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ToastItem {
  id: string;
  msg: string;
  type?: "info" | "err" | "success";
}

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
  fullName?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  isWriter?: boolean;
  roles: string[];
  wallet?: {
    availableBalance: string;
    currency: string;
  } | null;
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
  isLoadingUser: boolean;
  user: CurrentUser | null;
  login: (identifier?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    isWriter?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;

  // Gift
  isGiftOpen: boolean;
  giftRecipient: { name: string; img: string; writerId?: string } | null;
  openGift: (name: string, img: string, writerId?: string) => void;
  closeGift: () => void;
  initiateGift: (
    writerId: string,
    amount: number,
    message?: string
  ) => Promise<{ success: boolean; checkoutUrl?: string; reference?: string; error?: string }>;

  // Service Request
  isServiceRequestOpen: boolean;
  serviceRequestName: string;
  serviceRequestSlug?: string;
  openServiceRequest: (serviceName: string, serviceSlug?: string) => void;
  closeServiceRequest: () => void;
  submitServiceRequest: (payload: {
    serviceId: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    budgetEstimate?: string;
    deadlineDate?: string;
    fields?: Array<{ fieldId?: number; fieldName: string; fieldValue: string }>;
  }) => Promise<{ success: boolean; reference?: string; error?: string }>;

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
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [giftRecipient, setGiftRecipient] = useState<{
    name: string;
    img: string;
    writerId?: string;
  } | null>(null);

  const [isServiceRequestOpen, setIsServiceRequestOpen] = useState(false);
  const [serviceRequestName, setServiceRequestName] = useState("");
  const [serviceRequestSlug, setServiceRequestSlug] = useState<string | undefined>();

  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [readerData, setReaderData] = useState<any | null>(null);

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (msg: string, type: "info" | "err" | "success" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Load current session on boot
  const refreshUser = async () => {
    try {
      const res = await fetch("/api/v1/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data?.user) {
          setUser(data.data.user);
          return;
        }
      }
      setUser(null);
    } catch {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  const openAuth = (mode: "login" | "signup" = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    closeDrawer();
  };
  const closeAuth = () => setIsAuthOpen(false);

  const login = async (
    identifier?: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    // If called with no arguments (e.g. demo shortcut), authenticate default user
    const loginPayload = {
      login: identifier || "admin@pencrack.com",
      password: password || "Password123!",
    };

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        const errorMsg = data?.error?.message || "Invalid email or password";
        showToast(errorMsg, "err");
        return { success: false, error: errorMsg };
      }

      setUser(data.data.user);
      setIsAuthOpen(false);
      showToast(`Welcome back, ${data.data.user.fullName || data.data.user.username}! 🎉`, "success");
      return { success: true };
    } catch (err: any) {
      // In case database is not connected yet, provide clean feedback
      const errorMsg = err.message || "Unable to reach server. Please check database connection.";
      showToast(errorMsg, "err");
      return { success: false, error: errorMsg };
    }
  };

  const register = async (data: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    isWriter?: boolean;
  }): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        const errorMsg = resData?.error?.message || "Failed to create account";
        showToast(errorMsg, "err");
        return { success: false, error: errorMsg };
      }

      setUser(resData.data.user);
      setIsAuthOpen(false);
      showToast("Account created successfully! Welcome to Pencrack 🎉", "success");
      return { success: true };
    } catch (err: any) {
      const errorMsg = err.message || "Failed to connect to authentication server";
      showToast(errorMsg, "err");
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/v1/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      showToast("Logged out successfully");
    }
  };

  const openGift = (name: string, img: string, writerId?: string) => {
    setGiftRecipient({ name, img, writerId });
    setIsGiftOpen(true);
  };
  const closeGift = () => {
    setIsGiftOpen(false);
    setGiftRecipient(null);
  };

  const initiateGift = async (
    writerId: string,
    amount: number,
    message?: string
  ): Promise<{ success: boolean; checkoutUrl?: string; reference?: string; error?: string }> => {
    try {
      const res = await fetch("/api/v1/gifts/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ writerId, amount, message }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        const errorMsg = data?.error?.message || "Could not initialize gift";
        showToast(errorMsg, "err");
        return { success: false, error: errorMsg };
      }

      return {
        success: true,
        checkoutUrl: data.data.checkoutUrl,
        reference: data.data.paymentReference,
      };
    } catch (err: any) {
      const errorMsg = err.message || "Network error initializing payment";
      showToast(errorMsg, "err");
      return { success: false, error: errorMsg };
    }
  };

  const openServiceRequest = (serviceName: string, serviceSlug?: string) => {
    setServiceRequestName(serviceName);
    setServiceRequestSlug(serviceSlug);
    setIsServiceRequestOpen(true);
  };
  const closeServiceRequest = () => {
    setIsServiceRequestOpen(false);
    setServiceRequestSlug(undefined);
  };

  const submitServiceRequest = async (payload: {
    serviceId: number;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    budgetEstimate?: string;
    deadlineDate?: string;
    fields?: Array<{ fieldId?: number; fieldName: string; fieldValue: string }>;
  }): Promise<{ success: boolean; reference?: string; error?: string }> => {
    try {
      const res = await fetch("/api/v1/service-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        const errorMsg = data?.error?.message || "Failed to submit service brief";
        showToast(errorMsg, "err");
        return { success: false, error: errorMsg };
      }

      showToast(`Service brief received! Reference: ${data.data.referenceCode}`, "success");
      return { success: true, reference: data.data.referenceCode };
    } catch (err: any) {
      const errorMsg = err.message || "Failed to submit request";
      showToast(errorMsg, "err");
      return { success: false, error: errorMsg };
    }
  };

  const openReader = (data: any, type = "Story") => {
    setReaderData({ ...data, contentType: type });
    setIsReaderOpen(true);
  };
  const closeReader = () => setIsReaderOpen(false);

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
        isLoggedIn: !!user,
        isLoadingUser,
        user,
        login,
        register,
        logout,
        refreshUser,
        isGiftOpen,
        giftRecipient,
        openGift,
        closeGift,
        initiateGift,
        isServiceRequestOpen,
        serviceRequestName,
        serviceRequestSlug,
        openServiceRequest,
        closeServiceRequest,
        submitServiceRequest,
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
