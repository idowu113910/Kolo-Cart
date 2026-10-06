/**
 * Formats a number as Nigerian Naira currency (e.g. "₦1,450.07" or "N1,450.07")
 */
export function formatCurrency(amount: number, useSymbol: boolean = true): string {
  const prefix = useSymbol ? '₦' : 'N';
  const hasDecimals = amount % 1 !== 0;
  
  const formattedNumber = new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return `${prefix}${formattedNumber}`;
}

/**
 * Returns formatted relative time string, e.g. "Uploaded 55m ago", "Added 5s ago"
 */
export function formatRelativeTime(dateStringOrTimestamp: string | number): string {
  const now = Date.now();
  const past = typeof dateStringOrTimestamp === 'number' 
    ? dateStringOrTimestamp 
    : new Date(dateStringOrTimestamp).getTime();
  
  if (isNaN(past)) return 'Recently';

  const diffInSeconds = Math.max(0, Math.floor((now - past) / 1000));

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  }
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

/**
 * Formats full readable date
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Generates an order number e.g. KC-784652
 */
export function generateOrderNumber(): string {
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  return `KC-${randomSixDigits}`;
}

/**
 * Returns a time-of-day greeting (e.g. Good Morning, Good Afternoon, Good Evening)
 */
export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}
