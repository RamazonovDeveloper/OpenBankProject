export default function sumWithPenny(paymentsList) {
  let sumOfBalance =
    paymentsList.length > 0 &&
    paymentsList
      .map(payment => {
        return payment.balance && payment.balance
      })
      .reduce((sum, item) => sum + item)

  if (sumOfBalance) {
    return parseSinglePaymentBalance(sumOfBalance)
  }

  return null
}

function balanceToPenny(sumOfBalance) {
  let sumWithPenny = sumOfBalance.toString().split('')
  sumWithPenny.splice(6, 0, ',')

  return sumWithPenny.join('')
}

export function parsePaymentBalance(paymentList) {
  paymentList.map(payment => {
    if (payment.balance) {
      // payment.amount = payment.amount.toLocaleString('en-US', {
      //   style: 'currency',
      //   currency: 'UZS',
      //   minimumFractionDigits: 2
      // })
      const str = payment.balance.toString()
      const parts = str.split('')
      const whole = parts.slice(0, -2).join('')
      const cents = parts.slice(-2).join('')
      const regex = /(\d)(?=(\d{3})+$)/g
      const formattedWhole = whole.replace(regex, '$1,')
      payment.balance = formattedWhole + '.' + cents
    }
  })

  return paymentList
}

export function parseSinglePaymentBalance(balance) {
  if (balance) {
    // payment.amount = payment.amount.toLocaleString('en-US', {
    //   style: 'currency',
    //   currency: 'UZS',
    //   minimumFractionDigits: 2
    // })
    const str = balance.toString()
    const parts = str.split('')
    const whole = parts.slice(0, -2).join('')
    const cents = parts.slice(-2).join('')
    const regex = /(\d)(?=(\d{3})+$)/g
    const formattedWhole = whole.replace(regex, '$1,')
    balance = formattedWhole + '.' + cents
  }

  return balance
}

export function parsePaymentBalance2(paymentList) {
  paymentList.map(payment => {
    if (payment.amount) {
      // payment.amount = payment.amount.toLocaleString('en-US', {
      //   style: 'currency',
      //   currency: 'UZS',
      //   minimumFractionDigits: 2
      // })
      const str = payment.amount.toString()
      const parts = str.split('')
      const whole = parts.slice(0, -2).join('')
      const cents = parts.slice(-2).join('')
      const regex = /(\d)(?=(\d{3})+$)/g
      const formattedWhole = whole.replace(regex, '$1,')
      payment.amount = formattedWhole + '.' + cents
    }
  })

  return paymentList
}
