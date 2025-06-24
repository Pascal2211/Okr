import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validatePassword(password: string): string | null {
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (password.length < minLength) {
    return "Passordet må være minst 8 tegn langt.";
  }
  if (!hasUppercase) {
    return "Passordet må inneholde minst én stor bokstav.";
  }
  if (!hasNumber) {
    return "Passordet må inneholde minst ett tall.";
  }
  if (!hasSymbol) {
    return "Passordet må inneholde minst ett symbol.";
  }

  return null;
}
