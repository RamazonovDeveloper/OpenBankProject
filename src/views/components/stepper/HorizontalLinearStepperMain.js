import * as React from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'

export default function HorizontalLinearStepperMain({ data }) {
  console.log('data ===> ', data)
  if (data) {
    return (
      <Stepper
        activeStep={
          data.filter(item => {
            return item.has_signed
          }).length
        }
      >
        {data &&
          data.map((item, index) => {
            return (
              <Step
                key={index}
                sx={{
                  '& .MuiStepLabel-root .Mui-completed': {
                    color: '#4E0F8A', // circle color (COMPLETED)
                    width: '15px',
                    height: '15px'
                  },
                  '& .MuiStepLabel-root .Mui-active': {
                    color: '#D2D0D0', // circle color (ACTIVE)
                    width: '15px',
                    height: '15px'
                  },
                  '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                    fill: '#D2D0D0' // circle's number (ACTIVE)
                  },
                  '& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-root': {
                    color: '#D2D0D0', // circle color (ACTIVE)
                    width: '15px',
                    height: '15px'
                  },
                  '& .MuiStepLabel-root .Mui-disabled .MuiStepIcon-root .MuiStepIcon-text': {
                    fill: '#D2D0D0' // circle's number (ACTIVE)
                  }
                }}
              >
                <StepLabel></StepLabel>
              </Step>
            )
          })}
      </Stepper>
    )
  }

  return null
}
