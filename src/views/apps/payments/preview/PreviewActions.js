// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import LoadingButton from '@mui/lab/LoadingButton'
import CardContent from '@mui/material/CardContent'
import SendIcon from '@mui/icons-material/Send'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const PreviewActions = ({
  id,
  toggleSendInvoiceDrawer,
  toggleAddPaymentDrawer,
  confirmPaymentHandle,
  isPaymentSent,
  data
}) => {
  console.log(id)

  return (
    <Card>
      <CardContent>
        {/* <Button fullWidth sx={{ mb: 3.5 }} color='secondary' variant='outlined'>
          Скачать
        </Button> */}
        {/* <Button
          fullWidth
          sx={{ mb: 3.5 }}
          color='success'
          variant='contained'
          onClick={confirmPaymentHandle}
          endIcon={<SendIcon />}
        >
          Подписать
        </Button> */}
        <LoadingButton
          fullWidth
          sx={{ mb: 3.5 }}
          color='success'
          variant='outlined'
          onClick={confirmPaymentHandle}
          loading={isPaymentSent}
          disabled={data.status === 3 ? true : false}
          startIcon={<SendIcon />}
        >
          {data.status === 3 ? 'Подписан' : 'Подписать'}
        </LoadingButton>
      </CardContent>
    </Card>
  )
}

export default PreviewActions
