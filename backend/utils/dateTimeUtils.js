// utils/dateTimeUtils.js

const isValidDateTime = (date, time) => {
    const visitDate = new Date(date);
    const dayOfWeek = visitDate.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Check if the day is Sunday (0) or the time is not between 11 am to 7 pm
    return !(dayOfWeek === 0 || !(time >= '11:00' && time <= '19:00'));
};

module.exports = { isValidDateTime };
