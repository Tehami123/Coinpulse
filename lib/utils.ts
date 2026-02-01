import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  value?: number | null,
  options?: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '-';

  const locale = options?.locale ?? 'en-US';
  const currency = options?.currency ?? 'USD';
  let min = options?.minimumFractionDigits;
  let max = options?.maximumFractionDigits;

  // If digits not explicitly provided, infer reasonable defaults based on magnitude
  if (min === undefined && max === undefined) {
    const abs = Math.abs(value);
    if (abs >= 1) {
      min = 2;
      max = 2;
    } else if (abs >= 0.01) {
      min = 2;
      max = 4;
    } else {
      min = 2;
      max = 8;
    }
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });

  return formatter.format(value);
}
