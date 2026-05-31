const monthLookup = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};

export function getIntakeStatus(intake, referenceDate = new Date()) {
    if (intake?.applyDeadline) {
        const deadline = new Date(intake.applyDeadline);
        if (!Number.isNaN(deadline.getTime())) {
            return deadline >= referenceDate ? "Applications Open" : "Closed";
        }
    }

    const intakeName = (intake?.intakeName || intake?.name || "").toLowerCase();
    const foundMonth = Object.entries(monthLookup).find(([month]) => intakeName.includes(month));

    if (!foundMonth) {
        return "Applications Open";
    }

    const monthIndex = foundMonth[1];
    const currentMonth = referenceDate.getMonth();

    return monthIndex < currentMonth ? "Closed" : "Applications Open";
}