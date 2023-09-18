// ** React Import
import { useRef, useState } from 'react'

// ** MUI Import
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import Drawer from './Drawer'
import VerticalNavItems from './VerticalNavItems'
import VerticalNavHeader from './VerticalNavHeader'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import OpenVerticalNavItems from './OpenVerticalNavItems'
import OpenVerticalNavHeader from './OpenVerticalNavHeader'

const StyledBoxForShadow = styled(Box)(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  '&.scrolled': {
    opacity: 1
  }
}))

const Navigation = props => {
  const companyInfo = JSON.parse(localStorage.getItem('companyInfo'))

  // ** Props
  const { hidden, settings, afterNavMenuContent, beforeNavMenuContent, navMenuContent: userNavMenuContent } = props

  // ** States
  const [navHover, setNavHover] = useState(false)
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])

  // ** Ref
  const shadowRef = useRef(null)

  // ** Hooks
  const theme = useTheme()
  const { mode } = settings

  // ** Var
  const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } = themeConfig

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = ref => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect
      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
      container = hidden ? container.target : container
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains('scrolled')) {
          // @ts-ignore
          shadowRef.current.classList.add('scrolled')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('scrolled')
      }
    }
  }

  const shadowBgColor = () => {
    if (mode === 'light') {
      return `linear-gradient(${theme.palette.customColors.lightBg} 5%,${hexToRGBA(
        theme.palette.customColors.lightBg,
        0.85
      )} 30%,${hexToRGBA(theme.palette.customColors.lightBg, 0.5)} 65%,${hexToRGBA(
        theme.palette.customColors.lightBg,
        0.3
      )} 75%,transparent)`
    } else {
      return `linear-gradient(${theme.palette.customColors.darkBg} 5%,${hexToRGBA(
        theme.palette.customColors.darkBg,
        0.85
      )} 30%,${hexToRGBA(theme.palette.customColors.darkBg, 0.5)} 65%,${hexToRGBA(
        theme.palette.customColors.darkBg,
        0.3
      )} 75%,transparent)`
    }
  }

  const cashStyles = {
    fontSize: '14px',
    color: 'white'
  }

  const ScrollWrapper = hidden ? Box : PerfectScrollbar

  return (
    <Drawer {...props} navHover={navHover} setNavHover={setNavHover}>
      <OpenVerticalNavHeader />
      <Box>
        <ScrollWrapper>
          <div style={{}}>
            <div
              style={{
                marginTop: '36px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                marginLeft: '15px',
                marginRight: '15px',
                padding: '10px',
                borderRadius: 9
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  color: 'white'
                }}
              >
                Компания
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.8rem',
                  color: 'white',
                  pt: '8px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold'
                }}
              >
                "{companyInfo?.name}"
              </Typography>
            </div>
            <Box sx={{ marginTop: '18px', marginX: '15px' }}>
              <OpenVerticalNavItems />
            </Box>
          </div>
          <Box style={{ paddingLeft: '15px', paddingRight: '15px', display: 'flex', marginTop: '140px' }}>
            <Box sx={{}}>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={cashStyles}>USD</Typography>
                <Box sx={{ backgroundColor: 'white', width: '24px', height: '24px', borderRadius: '8px' }}>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect width='24' height='24' rx='8.91' fill='white' fill-opacity='0.9' />
                    <path
                      d='M11.9999 3.67499L11.6549 4.00499L6.4349 9.23999C6.2924 9.35624 6.22677 9.54186 6.26803 9.72186C6.30927 9.89999 6.4499 10.0406 6.62803 10.0819C6.80803 10.1231 6.99365 10.0575 7.1099 9.91499L11.5199 5.50499V19.68C11.518 19.8525 11.608 20.0137 11.758 20.1019C11.908 20.1881 12.0918 20.1881 12.2418 20.1019C12.3918 20.0137 12.4818 19.8525 12.4799 19.68V5.50499L16.8899 9.91499C17.0062 10.0575 17.1918 10.1231 17.3718 10.0819C17.5499 10.0406 17.6905 9.89999 17.7318 9.72186C17.773 9.54186 17.7074 9.35624 17.5649 9.23999L12.3449 4.00499L11.9999 3.67499Z'
                      fill='#1AB759'
                    />
                  </svg>
                </Box>
              </Box>
              <Typography sx={cashStyles}>11 520.00</Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={cashStyles}>EUR</Typography>
                <Box sx={{ backgroundColor: 'white', width: '24px', height: '24px', borderRadius: '8px' }}>
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect width='24' height='24' rx='8.91' fill='white' fill-opacity='0.9' />
                    <path
                      d='M11.9999 3.67499L11.6549 4.00499L6.4349 9.23999C6.2924 9.35624 6.22677 9.54186 6.26803 9.72186C6.30927 9.89999 6.4499 10.0406 6.62803 10.0819C6.80803 10.1231 6.99365 10.0575 7.1099 9.91499L11.5199 5.50499V19.68C11.518 19.8525 11.608 20.0137 11.758 20.1019C11.908 20.1881 12.0918 20.1881 12.2418 20.1019C12.3918 20.0137 12.4818 19.8525 12.4799 19.68V5.50499L16.8899 9.91499C17.0062 10.0575 17.1918 10.1231 17.3718 10.0819C17.5499 10.0406 17.6905 9.89999 17.7318 9.72186C17.773 9.54186 17.7074 9.35624 17.5649 9.23999L12.3449 4.00499L11.9999 3.67499Z'
                      fill='#1AB759'
                    />
                  </svg>
                </Box>
              </Box>
              <Typography sx={cashStyles}>12 500.00</Typography>
            </Box>
            <Box sx={{ marginLeft: '15px' }}>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={cashStyles}>RUB</Typography>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    width: '24px',
                    height: '24px',
                    borderRadius: '8px',
                    marginLeft: '8px'
                  }}
                >
                  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect
                      width='24'
                      height='24'
                      rx='8.91'
                      transform='matrix(1 0 0 -1 0 24)'
                      fill='white'
                      fill-opacity='0.9'
                    />
                    <path
                      d='M11.9999 20.325L11.6549 19.995L6.4349 14.76C6.2924 14.6438 6.22677 14.4581 6.26803 14.2781C6.30927 14.1 6.4499 13.9594 6.62803 13.9181C6.80803 13.8769 6.99365 13.9425 7.1099 14.085L11.5199 18.495V4.32001C11.518 4.14751 11.608 3.98626 11.758 3.89814C11.908 3.81189 12.0918 3.81189 12.2418 3.89814C12.3918 3.98626 12.4818 4.14751 12.4799 4.32001V18.495L16.8899 14.085C17.0062 13.9425 17.1918 13.8769 17.3718 13.9181C17.5499 13.9594 17.6905 14.1 17.7318 14.2781C17.773 14.4581 17.7074 14.6438 17.5649 14.76L12.3449 19.995L11.9999 20.325Z'
                      fill='#D23232'
                    />
                  </svg>
                </Box>
              </Box>
              <Typography sx={cashStyles}>130.00</Typography>
            </Box>
          </Box>
        </ScrollWrapper>
      </Box>
    </Drawer>
  )
}

export default Navigation
