import { format } from "date-fns";

export const ConvertLocalDateTimeString = (isoString?: string): string => {
  if (!isoString) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    return format(tomorrow, "yyyy-MM-dd'T'HH:mm");
  }
  return format(new Date(isoString), "yyyy-MM-dd'T'HH:mm");
};

export function GenerateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
