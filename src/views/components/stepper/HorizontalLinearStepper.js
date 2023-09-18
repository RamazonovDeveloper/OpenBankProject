import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Badge, Chip, Stack } from '@mui/material'

export default function HorizontalLinearStepper({ signers, sign_status }) {
  console.log('signers', signers)
  console.log('sign_status', sign_status)

  const [activeStep, setActiveStep] = React.useState(
    signers?.filter(item => {
      return item.has_signed
    }).length
  )
  const [steps, setSteps] = React.useState(signers)
  const [skipped, setSkipped] = React.useState(new Set())

  const isStepOptional = step => {
    return step === 1
  }

  const isStepSkipped = step => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)

      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const singleStepStatus = sign_status ? (
    <Stack direction='row' spacing={1}>
      <Chip label='Подписан' color='success' variant='outlined' />
    </Stack>
  ) : (
    <Stack direction='row' spacing={1}>
      <Chip label='Ожидают вашей подписи' color='primary' variant='outlined' />
    </Stack>
  )

  const multiplayleStepStatus = (
    <Stepper activeStep={activeStep}>
      {steps &&
        steps.map((item, index) => {
          return (
            <Step key={index}>
              <StepLabel></StepLabel>
            </Step>
          )
        })}
    </Stepper>
  )

  return singleStepStatus
}
