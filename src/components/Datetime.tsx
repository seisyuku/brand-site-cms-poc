import { LOCALE } from "@config";

interface Props {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined | null;
  size?: "sm" | "lg";
  className?: string;
}

const dateFormat = new Intl.DateTimeFormat(LOCALE.langTag, {
  dateStyle: "medium",
  timeZone: LOCALE.timeZone,
});

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className = "",
}: Props) {
  const published = new Date(pubDatetime);
  const modified = modDatetime ? new Date(modDatetime) : undefined;
  const updated = modified && modified > published ? modified : undefined;
  const date = size === "lg" && updated ? updated : published;

  return (
    <span
      className={`muted-text ${size === "sm" ? "text-sm" : "text-base"} ${className}`}
    >
      <span className={size === "sm" ? "sr-only" : undefined}>
        {size === "lg" && updated ? "更新於 " : "發布於 "}
      </span>
      <time dateTime={date.toISOString()}>{dateFormat.format(date)}</time>
    </span>
  );
}
