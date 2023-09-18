import * as React from 'react'
import Box from '@mui/material/Box'

// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import useProfile from 'src/hooks/useProfile'

import { useForm, Controller } from 'react-hook-form'

const Profile = () => {
  const [valueTab, setValueTab] = useState('1')
  const [open, setOpen] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
  const { viewProfile, profile, editProfile } = useProfile()

  console.log('default ', { ...profile })

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {}
  })

  const onSubmit = data => {
    editProfile(data, imageFile)
    handleClose()
    window.location.reload(false)
  }

  useEffect(() => {
    viewProfile()
  }, [])

  useEffect(() => {
    console.log('effect profile', profile)
    profile &&
      reset({
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone
      })
  }, [profile])

  const handleTabsChange = (event, newValue) => {
    setValueTab(newValue)
  }

  const uploadPicture = e => {
    console.log(e)
    setImageFile({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0]
    })
  }

  return (
    <Grid container spacing={4}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ mr: 1.75 }}>
          Мой профиль
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mt: 5 }}>
        <TabContext value={valueTab}>
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={handleTabsChange}
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab value='1' label='Текущая учётная запись' />
            <Tab value='2' label='Настройка уведомлений' />
            <Tab value='3' label='Мобильные устройства' />
            <Tab value='4' label='Согласия' />
          </TabList>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='1'>
              {profile && (
                <>
                  <Card sx={{ maxWidth: '100%' }}>
                    <CardContent>
                      <img
                        src={profile.photo}
                        width={90}
                        alt={profile.first_name + ' ' + profile.last_name}
                        loading='lazy'
                      />
                    </CardContent>
                    <CardContent>
                      <Grid container spacing={6}>
                        <Grid item xl={9} md={4} xs={6}>
                          <Typography gutterBottom variant='h6' component='div'>
                            {profile.first_name} {profile.last_name} | {companyInfo.name}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={8} xs={6}>
                          <Button onClick={handleOpen}>Изменить </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardContent>
                      {/* <Grid container spacing={6}>
                        <Grid item xl={4} md={4} xs={6}>
                          <Typography gutterBottom variant='subtitle1' component='div'>
                            Логин
                          </Typography>
                          <Typography gutterBottom variant='subtitle1' component='div'>
                            Пароль
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={8} xs={6}>
                          <Typography variant='subtitle1' color='text.secondary'>
                            Test
                          </Typography>
                          <Typography variant='subtitle1' color='text.secondary'>
                            Test
                          </Typography>
                          <Button size='small' sx={{ p: 0 }}>
                            Изменить
                          </Button>
                        </Grid>
                      </Grid> */}
                    </CardContent>
                    <CardContent>
                      <Grid container spacing={6}>
                        <Grid item xl={4} md={4} xs={6}>
                          <Typography gutterBottom variant='subtitle1' component='div'>
                            Организация
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={8} xs={6}>
                          <Typography variant='subtitle1' color='text.secondary'>
                            {companyInfo.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardContent>
                      <Grid container spacing={6}>
                        <Grid item xl={4} md={4} xs={6}>
                          <Typography gutterBottom variant='subtitle1' component='div'>
                            Телефон для отправки СМС-сообщений
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={8} xs={6}>
                          <Typography variant='subtitle1' color='text.secondary'>
                            {profile.phone}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Dialog open={open} onClose={handleClose} fullWidth={true}>
                    <DialogTitle>Изменить мой профиль</DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                      <img
                        src={imageFile ? imageFile.picturePreview : profile.photo}
                        width={90}
                        alt={profile.first_name + ' ' + profile.last_name}
                        loading='lazy'
                      />
                      <TextField
                        name='photo'
                        margin='dense'
                        id='name'
                        label='Фото'
                        type='file'
                        variant='standard'
                        onChange={uploadPicture}
                      />
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <DialogContent>
                        <Controller
                          name='first_name'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              autoFocus
                              margin='dense'
                              id='name'
                              label='Имя'
                              type='text'
                              fullWidth
                              variant='standard'
                            />
                          )}
                        />
                        <Controller
                          name='last_name'
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              margin='dense'
                              id='name'
                              label='Фамилия'
                              type='text'
                              fullWidth
                              variant='standard'
                            />
                          )}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button type='submit'>Изменит</Button>
                      </DialogActions>
                    </form>
                  </Dialog>
                </>
              )}
            </TabPanel>

            <TabPanel value='2'>
              <Typography variant='subtitle1'>Нет данных</Typography>
            </TabPanel>

            <TabPanel value='3'>
              <Typography variant='subtitle1'>Нет данных</Typography>
            </TabPanel>

            <TabPanel value='4'>
              <Typography variant='subtitle1'>Нет данных</Typography>
            </TabPanel>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
        </TabContext>
      </Box>
    </Grid>
  )
}

export default Profile
