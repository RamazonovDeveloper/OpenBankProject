// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import { newVerticalNavItems } from 'src/@core/layouts/components/vertical/navigation/OpenVerticalNavItems'

const cashStyles = {
  fontSize: '17px',
  color: 'black'
}

const AppBarContent = props => {
  const router = useRouter()
  const { pathname, query } = router
  const { item } = query

  console.log(' ====== ', newVerticalNavItems, pathname)
  console.log(' router ', router)

  const headerText = newVerticalNavItems.find(item => item.path == pathname)
    ? newVerticalNavItems.find(item => item.path == pathname).title
    : item

  // ** Props

  return (
    <Box
      className='open_vertical_app_bar'
      sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ flex: '1', fontSize: '22px', fontWeight: '700', color: '#342C2C' }}>{headerText}</Box>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
