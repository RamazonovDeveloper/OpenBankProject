// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PreviewActions = ({ id, toggleSendInvoiceDrawer, toggleAddPaymentDrawer }) => {
  return (
    <Card>
      <CardContent>
        <Button fullWidth sx={{ mb: 3.5 }} color='secondary' variant='outlined'>
          Скачать
        </Button>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          component={Link}
          color='secondary'
          variant='outlined'
          href='#'

          // href={`/apps/invoice/print/${id}`}
        >
          Печать
        </Button>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          component={Link}
          color='secondary'
          variant='outlined'
          href='#'

          // href={`/apps/invoice/edit/${id}`}
        >
          Изменить Счета
        </Button>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
