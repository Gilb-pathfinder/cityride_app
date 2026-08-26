"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { detectMobileStoreUrl } from "@/lib/config/appLinks";

interface DownloadAppButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  children: ReactNode;
}

// On a phone, this sends the visitor straight to the matching app store.
// On desktop, it falls through to /download, which shows both store
// buttons plus a QR code the visitor can scan with their phone.
export function DownloadAppButton({ size = "md", variant = "primary", className = "", children }: DownloadAppButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const storeUrl = detectMobileStoreUrl();
    if (storeUrl) {
      e.preventDefault();
      window.open(storeUrl, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <Button href="/download" size={size} variant={variant} className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}
