interface FormatDateProps {
  date: Date;
  showHour?: boolean;
}
export function formatDate({ date, showHour = false }: FormatDateProps) {
  const options: Intl.DateTimeFormatOptions = showHour
    ? {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    : { timeZone: 'America/Sao_Paulo' };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}
