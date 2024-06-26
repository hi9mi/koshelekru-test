export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}
