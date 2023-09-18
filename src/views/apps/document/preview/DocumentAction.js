// ** Next Import
import { useEffect, useState } from 'react'
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import CardContent from '@mui/material/CardContent'
import EditIcon from '@mui/icons-material/Edit'
import DownloadIcon from '@mui/icons-material/Download'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import useLoanAgreementFilter from 'src/hooks/useLoanAgreement'
import useEimzo from 'src/hooks/useEimzo'
import MessageStatus from 'src/views/alerts/MessageStatus'
import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'

import { useForm, Controller } from 'react-hook-form'

import EIMZO from 'src/lib/Eimzo'
import EImzo from 'src/utils/e-imzo'

const DocumentAction = ({ id, toggleSendInvoiceDrawer, toggleAddPaymentDrawer, data, getInfo }) => {
  const { loading, isSigned, setIsSigned, setSighnToDocument, error } = useLoanAgreementFilter()
  const EIMZOClient = new EIMZO()
  const [certificates, setCertificates] = useState([])
  const [choosenCert, setChoosenCert] = useState('')
  const [currentHash, setCurrentHash] = useState('')
  const [open, setOpen] = useState(false)

  const { loadKey, createPkcs7, append_pkcs7_attached } = useEimzo()

  const putHash = async () => {
    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
    if (companyInfo) {
      let companyInn = companyInfo.inn

      let itm = certificates.filter(item => {
        return item.TIN == companyInn
      })[0]

      console.log('itm', itm)

      if (itm) {
        const key = await loadKey(itm)
        console.log('key itm', key)

        let hash
        if (data.pkcs7) {
          hash = await append_pkcs7_attached(data.pkcs7, key.id)
          console.log('loan hash hash', hash)

          let paramas = {
            uuid_code: data.uuid_code,
            hash: hash.pkcs7_64
          }
          setSighnToDocument(paramas)
          getInfo()
          setOpen(true)
        } else {
          hash = await createPkcs7(key)
          console.log('false')
          console.log('loan hash', hash)

          let paramas = {
            uuid_code: data.uuid_code,
            hash: hash
          }
          setSighnToDocument(paramas)
          getInfo()
          setOpen(true)
        }
      }
    }
  }

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur'
  })

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const listAllKeys = async () => {
      const certs = await EIMZOClient.install()
      const data = await EIMZOClient.listAllUserKeys()
      console.log(data)
      setCertificates(data)
    }
    listAllKeys()

    let companyInfo = JSON.parse(localStorage.getItem('companyInfo'))
    let companyInn = companyInfo.inn

    // let itm = data.signers.filter(item => {
    //   return item.tin == companyInn
    // })[0]

    if (data.sign_status) {
      setIsSigned(true)
    }
  }, [])

  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      {error && <MessageStatus message='Server Error' />}
      {!isSigned && <Button className='gray_btn'>Отклонить</Button>}

      <LoadingButton
        className='main_btn'
        style={{ backgroundColor: '#4E0F8A', fontSize: '17px', fontWeight: 600 }}
        onClick={() => putHash()}
        loading={loading}
        disabled={isSigned ? true : false}
      >
        {isSigned ? 'Подписан' : 'Подписать'}
      </LoadingButton>

      <Dialog open={open} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
        <DialogTitle>
          <CheckCircleOutlineIcon sx={{ mr: 2, color: 'green' }} />
          {'Документ был успешно подписан.'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DocumentAction
