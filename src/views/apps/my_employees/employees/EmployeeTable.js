import { Box, Card, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useUsers from 'src/hooks/useUsers'
import EmployeeTableComponent from 'src/views/table/EmployeeTable'

const columns = [
  { field: 'role', headerName: 'Должность', minWidth: 20 },
  {
    field: 'first_name',
    headerName: 'ФИО',
    minWidth: 20,
    renderCell: params => {
      return (
        <Box>
          <Typography variant='body2' gutterBottom>
            Name not given
          </Typography>
        </Box>
      )
    }
  },
  { field: 'id', headerName: 'Последний визит', minWidth: 20 },
  { field: 'status', headerName: 'Статус', minWidth: 20 }
]

function EmployeeTable(props) {
  const { users, getUsers, loading } = useUsers()

  useEffect(() => {
    getUsers()
  }, [])

  const handleClick = funcProps => {
    console.log('BBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCC')
    console.log(funcProps)
    props.setSelectedUser(funcProps.id)
  }

  console.log('BBBBBBBBBBBBBBBBB', users)

  return (
    <Box>
      <Card sx={{ p: '20px', borderTopLeftRadius: '0px' }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
          <button className='main_btn' onClick={() => props.setValue('2')}>
            Добавить сотрудника
            <span>+</span>
          </button>
        </Box>
        <Box>
          {/* {users && <MyTable handleClick={props.setEditable} columns={columns} rows={users} loading={loading} />} */}
          {users && (
            <EmployeeTableComponent handleClick={handleClick} columns={columns} rows={users} loading={loading} />
          )}
        </Box>
      </Card>
    </Box>
  )
}

export default EmployeeTable
