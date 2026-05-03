/** Nigeria business WhatsApp — digits only, country code first */
export const WHATSAPP_BUSINESS_E164 = "2348147453358";

export function buildWhatsAppChatUrl(prefilledMessage?: string): string {
  const base = `https://wa.me/${WHATSAPP_BUSINESS_E164}`;
  const text = prefilledMessage?.trim();
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Contact section — general inquiry */
export function contactPageWhatsAppPrefill(): string {
  return `Hi Kayode — I'm reaching out via your portfolio contact page.`;
}

/** Project cards / dialog — identifies the work item in WhatsApp */
export function projectWhatsAppPrefill(
  projectTitle: string,
  categoryLabel: string,
  siteOrigin?: string
): string {
  const lines = [
    `Hi Kayode — I'm interested in discussing your portfolio project "${projectTitle}" (${categoryLabel}).`,
  ];
  const origin = siteOrigin?.trim().replace(/\/$/, "");
  if (origin) {
    lines.push(`Portfolio: ${origin}`);
  }
  return lines.join("\n\n");
}
