import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstChar(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function sanitizeId(id: string | number) {
  if (typeof id === 'number') return id;
  return id.split('-')[0];
}

export function smoothScroll(
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  target: string,
) {
  const element = document.getElementById(target);
  const headerOffset = 0;
  const elementPosition = element?.getBoundingClientRect().top;
  const offsetPosition = elementPosition ?? 0 + window.scrollY - headerOffset;

  e.preventDefault();

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

export function removeHyphen(str: string) {
  return str.replace(/-/g, ' ');
}

export function titleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
