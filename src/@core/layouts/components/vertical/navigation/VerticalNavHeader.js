// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingRight: theme.spacing(4),
  justifyContent: 'space-between',
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)({
  fontWeight: 700,
  lineHeight: 1.2,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
})

const StyledLink = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = props => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  const theme = useTheme()
  const { mode, direction, navCollapsed } = settings
  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const svgFillSecondary = () => {
    if (mode === 'semi-dark') {
      return `rgba(${theme.palette.customColors.dark}, 0.6)`
    } else {
      return theme.palette.text.secondary
    }
  }

  const svgFillDisabled = () => {
    if (mode === 'semi-dark') {
      return `rgba(${theme.palette.customColors.dark}, 0.38)`
    } else {
      return theme.palette.text.disabled
    }
  }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 40) / 8
      }
    } else {
      return 5.5
    }
  }

  const svgRotationDeg = () => {
    if (navCollapsed) {
      if (direction === 'rtl') {
        if (navHover) {
          return 0
        } else {
          return 180
        }
      } else {
        if (navHover) {
          return 180
        } else {
          return 0
        }
      }
    } else {
      if (direction === 'rtl') {
        return 180
      } else {
        return 0
      }
    }
  }

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <StyledLink href='/'>
          <img width='175px' style={{ marginTop: '40px' }} src={`/images/white_logo.png`} alt='open bank logo' />
          {/* <svg width="100" height="30" viewBox="0 0 211 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M70.0855 26.2949C70.0855 34.8434 75.5951 40.733 83.3841 40.733C91.1724 40.733 96.7765 34.8434 96.7765 26.2949C96.7765 17.7464 91.1724 11.8574 83.3841 11.8574C75.5951 11.8574 70.0855 17.7463 70.0855 26.2949ZM85.7584 52.5107C78.9193 52.5107 73.0301 49.7569 70.6559 45.6721H70.3705C70.4652 46.337 70.561 47.2873 70.561 49.9464V64.0538C70.5609 65.0891 70.2506 66.1006 69.67 66.9578C69.0895 67.815 68.2653 68.4785 67.304 68.8627L57.3577 72.8383V1.78892H69.6107V4.06908C69.6209 5.46443 69.5577 6.85935 69.4209 8.24802H69.7063C72.8402 3.40356 78.9193 0.269043 86.3287 0.269043C100.101 0.269043 110.075 11.0024 110.075 26.3908C110.075 41.778 99.7216 52.5108 85.7584 52.5108" fill="#4E0F8A"/>
                <path d="M127.841 22.1153H151.397C150.447 15.9416 146.173 11.8574 139.998 11.8574C133.54 11.8574 129.17 15.7516 127.841 22.1153ZM140.474 52.5108C124.896 52.5108 114.068 41.4926 114.068 26.3908C114.068 11.0977 124.991 0.269043 140.284 0.269043C154.721 0.269043 164.41 11.1925 164.41 26.3908C164.429 27.793 164.302 29.1934 164.03 30.5692H127.841C129.266 37.0283 133.729 40.733 140.568 40.733C146.077 40.733 149.687 39.023 152.917 34.9394L160.611 43.0125C155.577 49.567 148.832 52.5108 140.473 52.5108" fill="#4E0F8A"/>
                <path d="M189.818 0.269043C201.976 0.269043 210.81 8.05801 210.81 19.8364V50.9917H197.511V19.4563C197.532 18.4527 197.35 17.4551 196.976 16.5236C196.602 15.5922 196.043 14.7461 195.333 14.0362C194.623 13.3263 193.777 12.7674 192.845 12.3929C191.914 12.0185 190.917 11.8364 189.913 11.8574C185.448 11.8574 182.219 15.0867 182.219 19.4563V50.9916H168.921V19.361C168.921 7.96266 177.66 0.269043 189.818 0.269043Z" fill="#4E0F8A"/>
                <path d="M26.3862 13.0878C29.9116 13.0927 33.2914 14.4954 35.7842 16.9882C38.2771 19.4811 39.6798 22.8607 39.6847 26.3861H52.7724C52.7724 19.3881 49.9922 12.6767 45.0439 7.72831C40.0955 2.77996 33.3842 0 26.3862 0C19.3882 0 12.6769 2.77996 7.72851 7.72831C2.78016 12.6767 0 19.3881 0 26.3861H13.0877C13.0926 22.8607 14.4953 19.4811 16.9882 16.9882C19.481 14.4954 22.8608 13.0927 26.3862 13.0878Z" fill="#4E0F8A"/>
                <path d="M26.3862 39.6843C24.2234 39.6833 22.0935 39.1551 20.1809 38.1455C18.2683 37.1358 16.6309 35.6752 15.4099 33.8901L4.60229 41.2778C7.02029 44.8153 10.2633 47.7105 14.0514 49.7132C17.8395 51.7159 22.0585 52.7658 26.3434 52.772C30.6283 52.7783 34.8503 51.7407 38.6442 49.7491C42.4381 47.7574 45.6897 44.8716 48.118 41.3412L37.3417 33.9215C36.12 35.6986 34.4842 37.1518 32.5757 38.1558C30.6671 39.1597 28.543 39.6843 26.3865 39.6843" fill="#81DABB"/>
              </svg> */}
        </StyledLink>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{ p: 0, backgroundColor: 'transparent !important' }}
        >
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{ p: 0, color: 'text.primary', backgroundColor: 'transparent !important' }}
        >
          {userMenuLockedIcon && userMenuUnlockedIcon ? (
            navCollapsed ? (
              userMenuUnlockedIcon
            ) : (
              userMenuLockedIcon
            )
          ) : (
            <Box
              width={22}
              fill='none'
              height={22}
              component='svg'
              viewBox='0 0 22 22'
              xmlns='http://www.w3.org/2000/svg'
              sx={{
                transform: `rotate(${svgRotationDeg()}deg)`,
                transition: 'transform .25s ease-in-out .35s'
              }}
            >
              <path
                fill={svgFillSecondary()}
                d='M11.4854 4.88844C11.0082 4.41121 10.2344 4.41121 9.75716 4.88844L4.51029 10.1353C4.03299 10.6126 4.03299 11.3865 4.51029 11.8638L9.75716 17.1107C10.2344 17.5879 11.0082 17.5879 11.4854 17.1107C11.9626 16.6334 11.9626 15.8597 11.4854 15.3824L7.96674 11.8638C7.48943 11.3865 7.48943 10.6126 7.96674 10.1353L11.4854 6.61667C11.9626 6.13943 11.9626 5.36568 11.4854 4.88844Z'
              />
              <path
                fill={svgFillDisabled()}
                d='M15.8683 4.88844L10.6214 10.1353C10.1441 10.6126 10.1441 11.3865 10.6214 11.8638L15.8683 17.1107C16.3455 17.5879 17.1193 17.5879 17.5965 17.1107C18.0737 16.6334 18.0737 15.8597 17.5965 15.3824L14.0779 11.8638C13.6005 11.3865 13.6005 10.6126 14.0779 10.1353L17.5965 6.61667C18.0737 6.13943 18.0737 5.36568 17.5965 4.88844C17.1193 4.41121 16.3455 4.41121 15.8683 4.88844Z'
              />
            </Box>
          )}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
