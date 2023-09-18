import { Box, Card, FormControlLabel, Switch, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import useUsers from 'src/hooks/useUsers'
import styled from 'styled-components'
import ModalComponent from 'src/views/components/Modal/ModalComponent'

const IOSSwitch = styled(props => <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />)(
  ({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#4E0F8A',
          opacity: 1,
          border: 0
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5
        }
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff'
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: '#eeeeee'
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7
      }
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#E9E9EA',
      opacity: 1,
      transition: 'all'
    }
  })
)

function EmployeeForm({ selectedUser, setSelectedUser }) {
  
  const { users, getUsers, loading, message, setMessage, editUser } = useUsers()

  const nameRef = useRef()
  const telRef = useRef()
  const pinflRef = useRef()
  const positionRef = useRef()

  const [statusMessage, setStatusMessage] = useState(null)

  
  const onSubmit = async () => {
    console.log('ZZZZZZZZZZZZZZZZZZ EMPLOYEE DATA EDIT')
    console.log('MESSAGE IS A ', message)

    let data = {
      id: selectedUser,
      first_name: nameRef.current.value,
      last_name: 'Abs',
      phone: telRef.current.value,
      role: 101,
      pinfl: pinflRef.current.value
    }

    // deleteUser(17)

    setTimeout(() => {
      setMessage(null)
    }, 3000)

    if (telRef.current.value && pinflRef.current.value && nameRef.current.value) {
      const result = await editUser(data)
      
      console.log("FFFFFFFFFFFFFFFFFFFFFF")
      console.log(result)
      result && setStatusMessage(
        <ModalComponent 
          {...result}
          closeDialog={() => {
            setStatusMessage(null)
            setSelectedUser('')
            getUsers()
          }}
        />
      )

    } else {
      setMessage('Fill the form')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }
  
  useEffect(() => {
    getUsers()
  }, [])

  
  
  console.log('BBBBBBBBBBBBBB EmployeeForm employee props is', selectedUser)
  users && console.log(users[selectedUser]);

  let formData = {}

  users ? (formData = users.find((element) => element.id == selectedUser)) :  ''

  // let userName = formData?.first_name + ' ' + formData?.last_name || formData?.id + ' - user'

  return (
    <Box>
      <Card sx={{ padding: '20px', display: 'flex', flexDirection: 'column', boxShadow: 'none', gap: '20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'end' }} onClick={() => setSelectedUser('')}> 
          <img src='/images/Close.png' alt='' />
        </Box>
        <Box>
          <Typography sx={{ mb: '8px', fontSize: '17px' }}>ФИО</Typography>
          <Box className='myInput' sx={{ display: 'flex', justifyContent: 'space-between', height: '55px' }}>
            <input
              type='text'
              className=''
              ref={nameRef}
              style={{ border: 'none', background: 'transparent', padding: '0px', width: '100%' }}
              defaultValue={formData?.first_name}
              // defaultValue={`${formData?.first_name} ${formData?.last_name}` || `${formData?.id}-user`}
            />
          </Box>
        </Box>
        <Box>
          <Typography sx={{ mb: '8px', fontSize: '17px' }}>Номер телефона</Typography>
          <Box className='myInput' sx={{ display: 'flex', justifyContent: 'start', height: '55px' }}>
            <img src='/images/Phone.png' alt='' style={{ marginRight: '20px' }} />
            <input
              type='text'
              className=''
              ref={telRef}
              style={{ border: 'none', background: 'transparent', padding: '0px' }}
              defaultValue={formData?.phone}
            />
          </Box>
        </Box>
        <Box>
          <Typography sx={{ mb: '8px', fontSize: '17px' }}>ПИНФЛ</Typography>
          <Box className='myInput' sx={{ display: 'flex', justifyContent: 'space-between', height: '55px' }}>
            <input
              type='text'
              className=''
              ref={pinflRef}
              style={{ border: 'none', background: 'transparent', padding: '0px', width: '100%' }}
              defaultValue={formData?.pinfl}
            />
          </Box>
        </Box>
        <Box>
          <Typography sx={{ mb: '8px', fontSize: '17px' }}>Данные о последней авторизации</Typography>
          <Box className='myInput' sx={{ display: 'flex', height: '55px', justifyContent: 'start' }}>
            <input
              type='text'
              className=''
              style={{ border: 'none', background: 'transparent', padding: '0px' }}
              defaultValue={'empty'}
            />
          </Box>
        </Box>
        <Box sx={{ mb: '8px', fontSize: '17px', display: 'flex', justifyContent: 'space-between' }}>
          Блокировка учетной записи
          <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} defaultChecked />} label='' />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <button onClick={onSubmit} className='main_btn'>Сохранить</button>
        </Box>
      </Card>
      {statusMessage}
    </Box>
  )
}

export default EmployeeForm
