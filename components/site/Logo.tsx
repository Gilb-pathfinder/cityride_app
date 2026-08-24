import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  const textColor = dark ? "text-white" : "text-navy";
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8Z"
            fill="#C6FF00"
          />
          <circle cx="12" cy="10" r="3" fill="#101828" />
        </svg>
      </span>
      <span className={`text-lg font-bold tracking-tight ${textColor}`}>CityRide</span>
    </Link>
  );
}
