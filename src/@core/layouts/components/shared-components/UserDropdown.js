// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

import useAccount from 'src/hooks/useAccount'
import useProfile from 'src/hooks/useProfile'

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = props => {
  // ** Props

  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars

  const { getAccountsList, accountsSync, accountItems, sum } = useAccount()
  const { viewProfile, profile } = useProfile()
  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
  console.log(companyInfo)

  console.log(profile)
  useEffect(() => {
    getAccountsList()
    viewProfile()
    accountsSync()
  }, [])

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = url => {
    if (url) {
      router.push(`/${companyInfo.slug}/${url}`)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          borderRadius: '9px',
          backgroundColor: '#FFFFFF',
          padding: '8px 16px',
          boxShadow: '0px 10px 20px 0px #0000001A',
          mr: '20px',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FF8888',
            width: '2px',
            height: '40px',
            mr: '10px'
          }}
        ></Box>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>{sum} UZS</Typography>
          <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
            Средств на UZS счетах
          </Typography>
        </Box>
      </Box>
      {/* <Box
        sx={{
          display: 'flex',
          borderRadius: '9px',
          backgroundColor: '#FFFFFF',
          padding: '8px 16px',
          boxShadow: '0px 10px 20px 0px #0000001A',
          mr: '120px',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            backgroundColor: '#FFBC1F',
            width: '2px',
            height: '40px',
            mr: '10px'
          }}
        ></Box>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>0 USD</Typography>
          <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
            Средств на USD счетах
          </Typography>
        </Box>
      </Box> */}
      <Badge
        overlap='circular'
        sx={{
          marginRight: '20px',
          padding: '16px',
          cursor: 'pointer',
          backgroundColor: '#FFFFFF ',
          boxShadow: '0px 10px 20px 0px #0000001A',
          borderRadius: '9px'
        }}
      >
        <img src='/images/notifaction.png' alt='notifaction' />
      </Badge>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{
          ml: 2,
          cursor: 'pointer',
          backgroundColor: '#FFFFFF ',
          boxShadow: '0px 10px 20px 0px #0000001A'
        }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Avatar
          alt={profile?.first_name + ' ' + profile?.last_name}
          onClick={handleDropdownOpen}
          sx={{ width: 56, height: 56, backgroundColor: '#FFFFFF' }}
          src={profile?.photo}
        />
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar
                alt={profile?.first_name + ' ' + profile?.last_name}
                src={profile?.photo}
                sx={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{profile?.first_name + ' ' + profile?.last_name}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                {companyInfo?.name}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('new_profile')}>
          <Box sx={styles}>
            <Icon icon='mdi:account-outline' />
            Профиль
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose('my_employees')}>
          <Box sx={styles}>
            <Icon icon='gg:organisation' />
            Организация
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:cog-outline' />
            Настройки
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <Icon icon='mdi:help-circle-outline' />
            Справочник
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:logout-variant' />
          Выход
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
