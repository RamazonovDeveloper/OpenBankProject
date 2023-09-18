export function removeHours(paymentList) {
  paymentList.map(payment => {
    if (payment.sent_date) {
      payment.sent_date = payment.sent_date.slice(0, payment.sent_date.indexOf(' '))
    }
  })

  return paymentList
}

export function getFirstDayOfWeek() {
  const today = new Date()

  const date = new Date(today)
  const day = date.getDay() // 👉️ get day of week

  // 👇️ day of month - day of week (-6 if Sunday), otherwise +1
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)

  const parsedTime = new Date(date.setDate(diff))

  return parsedTime.toJSON().slice(0, 10)
}

export function getLastDayOfCurrentWeek(firstDay) {
  let lastDay = new Date(firstDay)
  lastDay.setDate(lastDay.getDate() + 6)
  lastDay = lastDay.toJSON().slice(0, 10)

  return lastDay
}

export function getFirstDayOfMonth(year, month) {
  let date = new Date(year, month, 1)

  return date.toJSON().slice(0, 10)
}

export function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0)

  return date.toJSON().slice(0, 10)
}
