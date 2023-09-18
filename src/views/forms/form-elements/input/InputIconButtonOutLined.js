// ** MUI Imports
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import TextField from '@mui/material/TextField'

const SelectVariants = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton color='inherit'>
        <Icon fontSize='30px' icon='ic:baseline-search' />
      </IconButton>
      <TextField fullWidth id='outlined-basic' label='Поиск' />
    </Box>
  )
}

export default SelectVariants
