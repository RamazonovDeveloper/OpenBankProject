// ** MUI Imports
import Input from '@mui/material/Input'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'

const SelectVariants = () => {
  return (
    <FormControl fullWidth>
      <Input
        id='input-with-icon-adornment'
        startAdornment={
          <IconButton color='inherit' sx={{ ml: -2.75 }}>
            <Icon icon='ic:baseline-search' />
          </IconButton>
        }
      />
    </FormControl>
  )
}

export default SelectVariants
