import i18n from "../i18n";

const MINUTE = 1000 * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const formatRelativeDate = (date) => {
  const now = new Date();
  const inputDate = new Date(date);
  const isSameYear = inputDate.getFullYear() === now.getFullYear();

  const difference = now - inputDate;

  const minutes = Math.floor(difference / MINUTE);
  const hours = Math.floor(difference / HOUR);
  const days = Math.floor(difference / DAY);

  if (minutes < 1) {
    return i18n.t("formatRelativeDate.just-now");
  }
  if (minutes === 1) {
    return i18n.t("formatRelativeDate.minute-ago");
  }
  if (minutes < 60) {
    return i18n.t("formatRelativeDate.minutes-ago", { minutes });
  }
  if (hours === 1) {
    return i18n.t("formatRelativeDate.hour-ago");
  }
  if (hours < 24) {
    return i18n.t("formatRelativeDate.hours-ago", { hours });
  }
  if (days === 1) {
    return i18n.t("formatRelativeDate.day-ago");
  }
  if (days < 30) {
    return i18n.t("formatRelativeDate.days-ago", { days });
  }
  if (days >= 30) {
    if (isSameYear) {
      return inputDate.toLocaleDateString(i18n.language, { month: "long", day: "numeric" });
    }
    return inputDate.toLocaleDateString(i18n.language, { year: "numeric", month: "long", day: "numeric" });
  }
};

export default formatRelativeDate;
