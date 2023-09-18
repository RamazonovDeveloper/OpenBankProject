import * as React from 'react'
import Box from '@mui/material/Box'

// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Divider from '@mui/material/Divider'
import TabContext from '@mui/lab/TabContext'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send'
import KeyIcon from '@mui/icons-material/Key'
import KeyOffIcon from '@mui/icons-material/KeyOff'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'
import SuccesMessage from 'src/views/alerts/SuccesMessage'

import useUsers from 'src/hooks/useUsers'
import { useForm, Controller } from 'react-hook-form'

const Organisation = () => {
  const [value, setValue] = useState('2')
  const [open, setOpen] = useState(false)
  const [formType, setFormType] = useState('create')
  const handleOpen = () => setOpen(true)

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      role: ''
    }
  })

  const {
    users,
    getUsers,
    addUser,
    errors,
    message,
    setMessage,
    deleteUser,
    rmItemStatus,
    setRmItemStatus,
    deletedItem,
    createdSuccessfully,
    editUser
  } = useUsers()

  const handleClose = () => {
    setOpen(false)
    reset(null)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleTabsChange = (event, newValue) => {
    setValue(newValue)
  }

  const onSubmit = data => {
    if (formType == 'create') {
      addUser(data)
    }

    if (formType == 'edit') {
      console.log('data', data)
      editUser(data)
    }
  }

  const handleEditUser = data => {
    console.log(data)
    handleOpen()
    reset(data)
    setFormType('edit')
  }

  console.log('users', users)

  useEffect(() => {
    getUsers()
    handleClose()
  }, [createdSuccessfully])

  return (
    <Grid container spacing={4}>
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ mr: 1.75 }}>
          Моя организация
        </Typography>
      </Box>
      {message && <SuccesMessage message={message} />}
      <Box sx={{ width: '100%', mt: 5 }}>
        <TabContext value={value}>
          <TabList
            variant='scrollable'
            scrollButtons={false}
            onChange={handleTabsChange}
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab value='1' label='Информация' />
            <Tab value='2' label='Пользователи' />
            <Tab value='3' label='Заявления' />
            <Tab value='4' label='Управление тарифами' />
          </TabList>
          <CardContent>
            <TabPanel sx={{ p: 0 }} value='1'>
              <Card sx={{ maxWidth: '100%' }}>
                <CardContent>
                  <Grid container spacing={6}>
                    <Grid item xl={4} md={4} xs={6}>
                      <Typography gutterBottom variant='h6' component='div'>
                        Нет данных
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='2'>
              <Card sx={{ maxWidth: '100%' }}>
                <Grid container spacing={6} sx={{ p: 4, justifyContent: 'space-between' }}>
                  <Grid item xl={4} md={4} xs={6}>
                    <Typography gutterBottom variant='h6' component='div'>
                      Пользователи
                    </Typography>
                  </Grid>
                  <Grid item xl={4} md={4} xs={6} sx={{ textAlign: 'end' }}>
                    <Button onClick={handleOpen} variant='contained'>
                      Новый Пользователи
                    </Button>
                  </Grid>
                </Grid>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>ФИО</TableCell>
                        <TableCell align='right'>Номер телефона</TableCell>
                        <TableCell align='right'>Должность</TableCell>
                        <TableCell align='right'>Ключ</TableCell>
                        <TableCell align='right'>Действия</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users &&
                        users.map(row => (
                          <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component='th' scope='row'>
                              {row.first_name} {row.last_name}
                            </TableCell>
                            <TableCell align='right'>{row.phone}</TableCell>
                            <TableCell align='right'>
                              {row.role === 101 && 'Главный бухгалтер'}
                              {row.role === 102 && 'Бухгалтер'}
                              {row.role === 100 && 'BOSS'}
                            </TableCell>
                            <TableCell align='right'>
                              {row.is_key_required ? (
                                <IconButton aria-label='delete' size='medium' color='success'>
                                  <KeyIcon fontSize='inherit' />
                                </IconButton>
                              ) : (
                                <IconButton aria-label='delete' size='medium' color='warning'>
                                  <KeyOffIcon fontSize='inherit' />
                                </IconButton>
                              )}
                            </TableCell>
                            <TableCell align='right'>
                              <IconButton onClick={() => deleteUser(row.id)} aria-label='delete' size='medium'>
                                <DeleteIcon fontSize='inherit' />
                              </IconButton>
                              <IconButton onClick={() => handleEditUser(row)} aria-label='edit' size='medium'>
                                <EditIcon fontSize='inherit' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                    <Dialog open={open} onClose={handleClose} fullWidth={true}>
                      <DialogTitle>
                        {formType == 'create' && 'Новый Пользователи'}
                        {formType == 'edit' && 'Изменить пользователя'}
                      </DialogTitle>
                      {message && errors && (
                        <Alert sx={{ mx: 4 }} severity='success'>
                          {message}
                        </Alert>
                      )}

                      <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent>
                          <Controller
                            name='first_name'
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                autoFocus
                                margin='dense'
                                id='name'
                                size='small'
                                label='Имя'
                                type='text'
                                fullWidth
                                variant='standard'
                              />
                            )}
                          />
                          {errors && errors.first_name && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.first_name}</FormHelperText>
                          )}
                          <Controller
                            name='last_name'
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin='dense'
                                id='name'
                                size='small'
                                label='Фамилия'
                                type='text'
                                fullWidth
                                variant='standard'
                              />
                            )}
                          />
                          {errors && errors.last_name && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.last_name}</FormHelperText>
                          )}
                          <Controller
                            name='phone'
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                margin='dense'
                                id='name'
                                size='small'
                                label='Номер телефона'
                                type='text'
                                fullWidth
                                variant='standard'
                              />
                            )}
                          />
                          {errors && errors.phone && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.phone}</FormHelperText>
                          )}
                          <Controller
                            name='role'
                            control={control}
                            render={({ field }) => (
                              <FormControl fullWidth variant='standard'>
                                <InputLabel id='demo-simple-select-standard-label'>Должность</InputLabel>
                                <Select
                                  labelId='demo-simple-select-standard-label'
                                  id='demo-simple-select-standard'
                                  placeholder='Должность'
                                  label='Должность'
                                  {...field}
                                >
                                  <MenuItem value='101'>Главный бухгалтер</MenuItem>
                                  <MenuItem value='102'>Бухгалтер</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          />
                          {errors && errors.role && (
                            <FormHelperText sx={{ color: 'error.main' }}>{errors.role}</FormHelperText>
                          )}
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Отмена</Button>
                          <Button type='submit'>
                            {formType == 'create' && 'Добавить'}
                            {formType == 'edit' && 'Редактировать'}
                          </Button>
                        </DialogActions>
                      </form>
                    </Dialog>
                  </Table>
                </TableContainer>
              </Card>
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='3'>
              <Card sx={{ maxWidth: '100%' }}>
                <CardContent>
                  <Grid container spacing={6}>
                    <Grid item xl={4} md={4} xs={6}>
                      <Typography gutterBottom variant='h6' component='div'>
                        Нет данных
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel sx={{ p: 0 }} value='4'>
              <Card sx={{ maxWidth: '100%' }}>
                <CardContent>
                  <Grid container spacing={6}>
                    <Grid item xl={4} md={4} xs={6}>
                      <Typography gutterBottom variant='h6' component='div'>
                        Нет данных
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </TabPanel>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
        </TabContext>
      </Box>

      <Dialog
        open={rmItemStatus}
        onClose={setRmItemStatus}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Вы действительно хотите удалить?'}</DialogTitle>
        <DialogActions>
          <Button onClick={setRmItemStatus}>Отмена</Button>
          <Button onClick={() => deleteUser(deletedItem)} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default Organisation
