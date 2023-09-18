// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const EcommerceImpressionsOrders = props => {
  const { accountItems } = props

  return (
    <Card>
      <Box sx={{ mx: 5, mt: 5 }}>
        <Box>
          <Typography variant='h6' sx={{ mr: 1.75 }}>
            Счета
          </Typography>
        </Box>

        {/* <Typography variant='subtitle2'>Актуально на __</Typography> */}
      </Box>
      {accountItems?.length > 0 &&
        accountItems.map((item, index) => {
          return (
            <CardContent key={index} sx={{ py: theme => `${theme.spacing(6.625)} !important` }}>
              <Box sx={{ my: 1.375, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <Typography variant='body2' sx={{ mr: 1.75 }}>
                    Расчётный
                  </Typography>
                  <Typography variant='subtitle2' sx={{ mr: 1.75 }}>
                    {item.balance} UZS
                  </Typography>
                  <Typography variant='body2'>{item.account}</Typography>
                  <Typography variant='body2'>{item.last_balance_synced_time}</Typography>
                </div>
                <Box sx={{ ml: 6.5 }}>
                  <Icon icon='material-symbols:credit-card-outline' />
                </Box>
              </Box>
            </CardContent>
          )
        })}
    </Card>
  )
}

export default EcommerceImpressionsOrders
