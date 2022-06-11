

export const convertUnixTime = unixTime => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000; // getTimezoneOffset() in minutes * 60(seconds) * 1000(miliseconds) = 60000
    const date = new Date((unixTime * 1000) - timezoneOffset)  // JavaScript time is in miliseconds (* 1000) minus the timezone offset.
    return date.toDateString()
}