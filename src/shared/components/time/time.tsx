export type TimeProps = {
  dateTime: string | number;
};

export const Time = ({ dateTime }: TimeProps) => {
  const date = new Date(dateTime);
  const value = date.toISOString();
  const text = value.slice(0, 19).replace('T', ' ');

  return <time dateTime={value}>{text}</time>;
};
