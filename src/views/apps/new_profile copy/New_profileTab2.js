import { Box, Typography } from '@mui/material'
import React from 'react'

function New_profileTab2() {
  return (
    <Box sx={{padding:"20px", display:"flex", flexDirection:"column", gap:"60px"}}>
      <Box>
        <Typography sx={{color:"#342C2C", fontSize:"17px"}}>Язык приложения</Typography>
        <Box sx={{display:"flex", pt:"10px", flexDirection:"column", gap:"20px"}}>
          <Box sx={{fontSize:"17px", display:"flex", alignItems:"center", color:"#1D1515", fontWeight:"400"}}>
            <input className='my_radio_input' type="radio" id="ru" name="fav_language" value="HTML" />
            <label for="ru" style={{display:"flex", alignItems:"center"}}><img style={{marginLeft:"16px", marginRight:"16px"}} src="/images/ruFlag.png" alt="" /> Русский</label>
          </Box>
          <Box sx={{fontSize:"17px", display:"flex", alignItems:"center", color:"#1D1515", fontWeight:"400"}}>
            <input className='my_radio_input' type="radio" id="uz" name="fav_language" value="HTML" />
            <label for="uz" style={{display:"flex", alignItems:"center"}}><img style={{marginLeft:"16px", marginRight:"16px"}} src="/images/uzFlag.png" alt="" /> O'zbek</label>
          </Box>
        </Box>
      </Box>
      
      <Box>
        <Typography sx={{color:"#342C2C", fontSize:"17px", mb:"20px"}}>Пуш уведомления</Typography>
        <Box sx={{ color:"#342C2C", fontSize:"17px", display:"flex", flexDirection:"column", gap:"20px"}}>
          <Box sx={{display:"flex", alignItems:"center"}}>
            <input type="checkbox" style={{width:"25px", height:"25px", borderRadius:'5px', marginRight:"16px"}} id='cash'/> <label htmlFor="cash">О снятии средств </label>
          </Box>
          <Box>
            <input type="checkbox" style={{width:"25px", height:"25px", borderRadius:'5px', marginRight:"16px"}} id='move'/> <label htmlFor="move">О переводе средств</label>
          </Box>
          <Box>
            <input type="checkbox" style={{width:"25px", height:"25px", borderRadius:'5px', marginRight:"16px"}} id='fill'/> <label htmlFor="fill">О пополнении</label>
          </Box>
          <Box>
            <input type="checkbox" style={{width:"25px", height:"25px", borderRadius:'5px', marginRight:"16px"}} id='device'/> <label htmlFor="device">Об авторизации на другом устройстве</label>
          </Box>
        </Box>
      </Box>

      <button className='main_btn' style={{width:"fit-content"}}>
        Сохранить
      </button>

    </Box>
  )
}

export default New_profileTab2
