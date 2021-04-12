export const areRemainDaysLessThanDays = (date, days) => {
  const secondsInADay = 86400
  const unix = parseInt((new Date(date).getTime() / 1000).toFixed(0))
  const now = parseInt((new Date().getTime() / 1000).toFixed(0))

  return unix - now < secondsInADay * days
}
