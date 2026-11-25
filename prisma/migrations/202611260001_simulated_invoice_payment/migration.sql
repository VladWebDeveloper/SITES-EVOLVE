-- Simulated payment status must remain distinct from real settled invoices.
ALTER TYPE "InvoiceStatus" ADD VALUE IF NOT EXISTS 'SIMULATED_PAID';
