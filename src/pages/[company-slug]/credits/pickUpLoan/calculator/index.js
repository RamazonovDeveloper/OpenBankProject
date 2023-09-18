import React from 'react'
import Card from 'src/@core/theme/overrides/card'
import CalculatorBody from 'src/views/apps/credits/pickUpLoanItems/calculator/CalculatorBody'
import CalculatorHeader from 'src/views/apps/credits/pickUpLoanItems/calculator/CalculatorHeader'

function index() {
  return (
    <div>
        <CalculatorHeader/>
      {/* <Card> */}
        <CalculatorBody/>
      {/* </Card> */}
    </div>
  )
}

export default index
