/**
 * Identify internal sample billing records. Never count these as earned revenue,
 * even when a member of staff previews the payment lifecycle.
 */
export function isSimulatedInvoice(invoice: {
 number: string;
 description?: string | null;
 client?: {name?: string | null; industry?: string | null} | null;
}): boolean {
 return /^DEMO[-_]/i.test(invoice.number) ||
  /\b(?:simulare|simulat[ăaei]?|simulation|fictiv[ăei]?)\b/i.test(invoice.description ?? "") ||
  /\[DEMO\]/i.test(invoice.client?.name ?? "") ||
  /\bprofil fictiv\b/i.test(invoice.client?.industry ?? "");
}
