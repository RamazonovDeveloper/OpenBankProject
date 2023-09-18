import { Badge, Box, Button, Card, CardContent, Grid, Slider } from '@mui/material'
import { useState } from 'react'
import React from 'react'
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

function CalculatorBody() {

    const router = useRouter()

    const [activeButton, setActiveButton] = useState('1')

    const [typeButton, setTypeButton] = useState("1")

    const buttonStyle = { 
        color:"#808080", 
        borderColor:"#808080",
        marginRight:"10px"
    }

    const activeButtonStyle = { 
        color:"black", 
        borderColor:"#dedede",
        backgroundColor:"#dedede",
        marginRight:"10px"
    }

    const PrettoSlider = styled(Slider)({
        color: '#4E0F8A',
        height: 8,
        '& .MuiSlider-track': {
          border: 'none',
        },
        '& .MuiSlider-thumb': {
          height: 24,
          width: 24,
          backgroundColor: '#fff',
          border: '2px solid currentColor',
          '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
          },
          '&:before': {
            display: 'none',
          },
        },
        '& .MuiSlider-valueLabel': {
          lineHeight: 1.2,
          fontSize: 12,
          background: 'unset',
          padding: 0,
          width: 32,
          height: 32,
          borderRadius: '50% 50% 50% 0',
          backgroundColor: '#4E0F8A',
          transformOrigin: 'bottom left',
          transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
          '&:before': { display: 'none' },
          '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
          },
          '& > *': {
            transform: 'rotate(45deg)',
          },
        },
      });

    const sliderMarks = [
        {
          value: 0,
          label: '3 000 000 UZS',
        },
        {
          value: 100,
          label: '300 000 000.00 UZS',
        },
    ]
      

  return (
    <Card>
        <CardContent>
            <Grid container>
                <Grid item md={8} sm={9} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
                    <p>Выберите условия</p>
                    <p>Сумма</p>
                    <Box marginLeft={10 } width={800}>
                    <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        defaultValue={20}
                        marks={sliderMarks}
                    />
                    </Box>
                    <p>Срок кредита</p>
                    <div style={{marginBottom:"10px"}}>
                        <Button style={activeButton == "1" ? activeButtonStyle : buttonStyle} onClick={() => setActiveButton('1')} variant='outlined'>
                            1 год
                        </Button>
                        <Button style={activeButton == "2" ? activeButtonStyle : buttonStyle} onClick={() => setActiveButton('2')} variant='outlined'>
                            2 годa
                        </Button>
                        <Button style={activeButton == "3" ? activeButtonStyle : buttonStyle} onClick={() => setActiveButton('3')} variant='outlined'>
                            3 годa
                        </Button>
                        <Button style={activeButton == "4" ? activeButtonStyle : buttonStyle} onClick={() => setActiveButton('4')} variant='outlined'>
                            4 годa
                        </Button>
                        <Button style={activeButton == "5" ? activeButtonStyle : buttonStyle} onClick={() => setActiveButton('5')} variant='outlined'
                        >
                            5 лет
                        </Button>
                    </div>
                    <p>Тип платежа</p>
                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginBottom:"50px"}}>
                        <Button style={typeButton == "1" ? activeButtonStyle : buttonStyle} onClick={() => setTypeButton('1')} variant='outlined'>
                        Аннуитентный
                        </Button>
                        <Button style={typeButton == "2" ? activeButtonStyle : buttonStyle} onClick={() => setTypeButton('2')} variant='outlined'>
                        Дифференцированный
                        </Button>
                    </div>

                    <Button onClick={() => router.push('/credits/pickUpLoan/calculator/results')} style={{background:"#4E0F8A"}} variant='contained'>
                        Рассчитать
                    </Button>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  )
}

export default CalculatorBody
