import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const CATEGORY_LABELS: Record<string, string> = {
  residential: 'Wohnen',
  commercial: 'Gewerbe',
  interior: 'Interieur',
}
