"use client";

import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex h-16 flex-none items-center justify-between border-b border-border bg-surface px-5">
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-border lg:hidden"
        aria-label="Toggle menu"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      <span className="hidden lg:block" />
      <LanguageSwitcher />
    </header>
  );
}
