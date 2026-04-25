/**
 * Opciones para configurar el formateo de moneda
 */
interface CurrencyOptions {
  currency?: string; // Ej: 'USD', 'MXN', 'EUR'
  locale?: string; // Ej: 'en-US', 'es-MX', 'es-ES'
  decimals?: number; // Cantidad de decimales
}

/**
 * Convierte un número en un string con formato de moneda local.
 * @param amount El valor numérico a formatear
 * @param options Configuración opcional de moneda y región
 * @returns string formateado
 */
export const formatCurrency = (
  amount: number | string | null | undefined,
  { currency = 'MXM', locale = 'es-MX', decimals = 2 }: CurrencyOptions = {}
): string => {
  // 1. Validar si el valor es numérico
  const numericValue = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (numericValue === null || numericValue === undefined || isNaN(numericValue)) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(0);
  }

  // 2. Formatear usando la API nativa Intl
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numericValue);
};
