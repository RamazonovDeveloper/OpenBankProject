import { Box, Button, DialogActions, DialogContent, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ModalComponent from 'src/views/components/Modal/ModalComponent'

function New_profileTab1({ profile, editProfile }) {
  console.log('Profile is ...................', profile)

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {}
  })

  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
  const [imageFile, setImageFile] = useState(null)

  const [statusMessage, setStatusMessage] = useState(null)

  const onSubmit = async (data) => {
    const result = editProfile(data, imageFile)

    console.log(result)
      result && setStatusMessage(
        <ModalComponent 
          {...result}
          closeDialog={() => {
            setStatusMessage(null)
          }}
        />
      )

    // setTimeout(() => {
    //   window.location.reload(false)
    // }, 2000)
  }

  useEffect(() => {
    console.log('effect profile', profile)
    profile &&
      reset({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone
      })
  }, [profile])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Typography sx={{ mb: '8px', fontSize: '17px' }}>Имя</Typography>
        <Controller
          name='first_name'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Box className='myInput' sx={{ display: 'flex', justifyContent: 'space-between', height: '55px' }}>
              <input
                {...field}
                type='text'
                className='name'
                style={{ border: 'none', background: 'transparent', padding: '0px', width: '100%' }}
                defaultValue={'00.00'}
              />
            </Box>
          )}
        />
        <Typography sx={{ mb: '8px', mt: '15px', fontSize: '17px' }}>Фамилия</Typography>

        <Controller
          name='last_name'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Box className='myInput' sx={{ display: 'flex', justifyContent: 'space-between', height: '55px' }}>
              <input
                {...field}
                type='text'
                className='name'
                style={{ border: 'none', background: 'transparent', padding: '0px', width: '100%' }}
                defaultValue={'00.00'}
              />
            </Box>
          )}
        />
        <Box>
          <Typography sx={{ mb: '8px', mt: '15px', fontSize: '17px' }}>Номер телефона</Typography>
          <Box className='myInput' sx={{ display: 'flex', justifyContent: 'start', height: '55px' }}>
            <img src='/images/Phone.png' alt='' style={{ marginRight: '20px' }} />
            <input
              type='text'
              className=''
              style={{ border: 'none', background: 'transparent', padding: '0px' }}
              defaultValue={'+998'}
              value={profile?.phone}
            />
          </Box>
        </Box>
        <Box>
          <Typography sx={{ mb: '8px', mt: '15px', fontSize: '17px' }}>Компания</Typography>
          <Box className='myInput' sx={{ display: 'flex', justifyContent: 'space-between', height: '55px' }}>
            <input
              type='text'
              className=''
              style={{ border: 'none', background: 'transparent', padding: '0px', width: '100%' }}
              value={companyInfo?.name}
            />
          </Box>
        </Box>
        <Box>
          <Typography sx={{ mb: '8px', mt: '15px', fontSize: '17px' }}>Должность</Typography>
          <Box className='myInput' sx={{ display: 'flex', height: '55px', justifyContent: 'start' }}>
            <input
              type='text'
              className=''
              style={{ border: 'none', background: 'transparent', padding: '0px' }}
              defaultValue={'X555'}
            />
            {/* <Typography>Tashkent, Uzbekistan</Typography> */}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <button className='main_btn gray_btn'>Отмена</button>
        <button className='main_btn' type='submit'>
          Изменит
        </button>
      </DialogActions>
      {statusMessage}
    </form>
  )
}

export default New_profileTab1
