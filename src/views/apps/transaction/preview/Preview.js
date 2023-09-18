import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import PreviewActions from './PreviewActions'
import PreviewCards from './PreviewCards'

function Preview({ data, confirmPaymentHandle, isPaymentSent, handleClose, open, paymentMessage }) {
  return (
    <Grid>
      {/* <Typography variant='h5' sx={{mb:"20px", color:"#342C2C"}}>Детали транзакции #9119id{data.id}</Typography> */}
      <Card>
        <CardContent>
          <PreviewActions data={data} />

          <PreviewCards
            id={data.id}
            confirmPaymentHandle={confirmPaymentHandle}
            isPaymentSent={isPaymentSent}
            data={data}
            handleClose={handleClose}
            open={open}
            paymentMessage={paymentMessage}
          />

          {/* <Grid sx={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px"}}> 
                        <Box>
                            <Typography sx={{color:'#342C2C',fontWeight:'500' , fontSize:"20px", mb:"10px"}}>Плательщик</Typography>
                            <Card sx={{boxShadow:"none", backgroundColor:"#EEEEEE"}}>
                                <CardContent>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>Наименование организации </Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>{data.sent_date}</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>МФО банка</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>{data.sender_mfo}</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>Расчетный счет </Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>На рассмотрении</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>ИНН</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>10 000 000,00 UZS</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                        <Box>
                            <Typography sx={{color:'#342C2C',fontWeight:'500' , fontSize:"20px", mb:"10px"}}>Получатель</Typography>
                            <Card sx={{boxShadow:"none", backgroundColor:"#EEEEEE"}}>
                                <CardContent>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>Наименование организации </Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>23.06.2023, 11:45</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>МФО банка</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>{data.receiver_mfo}</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>Расчетный счет</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>На рассмотрении</Typography>
                                    </Box>
                                    <Box sx={{display:'grid', gridTemplateColumns:"1fr 1fr", justifyContent:'space-between', alignItems:'center', mb:'20px'}}>
                                        <Typography variant={'body'}>ИНН</Typography>
                                        <Typography sx={{color:"#342C2C"}} variant={'body'}>10 000 000,00 UZS</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid> */}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Preview
