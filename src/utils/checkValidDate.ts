import { getFormattedDate } from "./getFormattedDate";

export function checkValidDate(date: Date) {
    if (new Date(getFormattedDate(date)).toString() === "Invalid Date") {
        return false;
    }

    return true;
}