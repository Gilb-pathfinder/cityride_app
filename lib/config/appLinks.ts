// Placeholder store destinations until CityRide has a published app listing.
// Swap these for the real Play Store / App Store URLs once available.
export const APP_STORE_LINKS = {
  playStore: "https://play.google.com/store/search?q=CityRide&c=apps",
  appStore: "https://apps.apple.com/search?term=CityRide",
};

export function detectMobileStoreUrl(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return APP_STORE_LINKS.playStore;
  if (/iphone|ipad|ipod/i.test(ua)) return APP_STORE_LINKS.appStore;
  return null;
}
