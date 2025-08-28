"use client";

import { useEffect, useState } from "react";

import { Auth } from "@/components/auth";
import { useAuthStore } from "@/contexts/store/authStore";

export default function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { token } = useAuthStore();

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Render nothing on server and first client render to avoid hydration mismatch
  if (!isClient) return <></>;

  return <>{token ? children : <Auth />}</>;
}
