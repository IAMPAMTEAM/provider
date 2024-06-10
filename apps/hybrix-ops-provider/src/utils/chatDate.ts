const zeroPad = (num: any, pad: any) => {
  return String(num).padStart(pad, '0');
};

const isSameDay = (d1: any, d2: any) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const parseTimestamp = (timestamp: any, format = '') => {
  if (!timestamp) return;

  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : timestamp;

  if (format === 'HH:mm') {
    return `${zeroPad(date.getHours(), 2)}:${zeroPad(date.getMinutes(), 2)}`;
  } else if (format === 'DD MMMM YYYY') {
    const options: any = { month: 'long', year: 'numeric', day: 'numeric' };
    return `${new Intl.DateTimeFormat('en-GB', options).format(date)}`;
  } else if (format === 'DD/MM/YY') {
    const options: any = { month: 'numeric', year: 'numeric', day: 'numeric' };
    return `${new Intl.DateTimeFormat('en-GB', options).format(date)}`;
  } else if (format === 'DD MMMM, HH:mm') {
    const options: any = { month: 'long', day: 'numeric' };
    return `${new Intl.DateTimeFormat('en-GB', options).format(date)}, ${zeroPad(
      date.getHours(),
      2
    )}:${zeroPad(date.getMinutes(), 2)}`;
  }

  return date;
};

export const formatTimestamp = (date: any, timestamp: any) => {
  const timestampFormat = isSameDay(date, new Date()) ? 'HH:mm' : 'DD/MM/YY';
  const result = parseTimestamp(timestamp, timestampFormat);
  return timestampFormat === 'HH:mm' ? `Today, ${result}` : result;
};
