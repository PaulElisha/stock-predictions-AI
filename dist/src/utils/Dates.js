/** @format */
class Dates {
    static formatDate(date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }
    static getDateNDaysAgo(n) {
        const now = new Date(); // current date and time
        now.setDate(now.getDate() - n); // subtract n days
        return Dates.formatDate(now);
    }
}
export { Dates };
