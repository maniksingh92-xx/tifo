export function formatCurrency(input) {
  if (Intl) return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(input);
  else return "$"+input;
}