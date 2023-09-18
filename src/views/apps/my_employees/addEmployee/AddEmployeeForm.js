import { Box, Card, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import useUsers from 'src/hooks/useUsers'
import SuccesMessage from 'src/views/alerts/SuccesMessage'
import ModalComponent from 'src/views/components/Modal/ModalComponent'

function AddEmployeeForm({setValue}) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      role: ''
    }
  })

  const { users, getUsers, addUser, createdSuccessfully, message, setMessage, deleteUser, editUser } = useUsers()

  const [statusMessage, setStatusMessage] = useState(null)

  const telRef = useRef()
  const pinflRef = useRef()
  const positionRef = useRef()



  const onSubmit = async () => {
    console.log('ZZZZZZZZZZZZZZZZZZ')
    console.log('MESSAGE IS A ', message)

    let data = {
      first_name: 'Abs',
      last_name: 'Abs',
      phone: telRef.current.value,
      role: 101,
      pinfl: pinflRef.current.value
    }

    // deleteUser(17)

    setTimeout(() => {
      setMessage(null)
    }, 3000)

    if (telRef.current.value && pinflRef.current.value) {
      const result = await addUser(data)

      console.log("FFFFFFFFFFFFFFFFFFFFFFFFF")
      console.log(result)

      result && setStatusMessage(
        <ModalComponent 
          {...result}
          closeDialog={() => {
            setStatusMessage(null)
            setValue('1')
            // setSelectedUser('')
            // getUsers()
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

  const handleEditUser = data => {
    console.log(data)
    handleOpen()
    reset(data)
    setFormType('edit')
  }

  console.log('users', users)

  useEffect(() => {
    getUsers()
  }, [createdSuccessfully])

  return (
    <Box>
      <Box>
        <Card sx={{ padding: '20px', display: 'flex', flexDirection: 'column', boxShadow: 'none', gap: '20px' }}>
          <Box>
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Номер телефона</Typography>
            <Box className='myInput' sx={{ display: 'flex', justifyContent: 'start', height: '55px' }}>
              <img src='/images/Phone.png' alt='' style={{ marginRight: '20px' }} />
              <input
                type='text'
                ref={telRef}
                className=''
                style={{ border: 'none', background: 'transparent', padding: '0px' }}
                defaultValue={'+998'}
              />
            </Box>
          </Box>
          <Box>
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>ПИНФЛ</Typography>
            <Box className='myInput' sx={{ display: 'flex', justifyContent: 'space-between', height: '55px' }}>
              <input
                ref={pinflRef}
                type='text'
                className=''
                style={{ border: 'none', background: 'transparent', padding: '0px', width: '100%' }}
                placeholder='Впишите ПИНФЛ'
                defaultValue={''}
              />
            </Box>
          </Box>
          <Box>
            <Typography sx={{ mb: '8px', fontSize: '17px' }}>Должность</Typography>
            <Box className='myInput' sx={{ display: 'flex', height: '55px', justifyContent: 'start' }}>
              <input
                ref={positionRef}
                type='text'
                className=''
                style={{ border: 'none', background: 'transparent', padding: '0px' }}
                placeholder='Впишите  должность'
                defaultValue={''}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', mt: '60px', justifyContent: 'start' }}>
            <button onClick={onSubmit} className='main_btn'>
              Сохранить
            </button>
          </Box>
        </Card>
      </Box>
      {statusMessage}
    </Box>
  )
}

export default AddEmployeeForm
