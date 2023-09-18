// ** MUI Imports
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const SelectVariants = props => {
  const { setOption, options, label } = props

  return (
    <FormControl fullWidth size='small'>
      <InputLabel id='demo-simple-select-outlined-label'>{label}</InputLabel>
      <Select
        size='small'
        label={label}
        defaultValue=''
        id='demo-simple-select-outlined'
        labelId='demo-simple-select-outlined-label'
        onChange={e => setOption(e.target.value)}
      >
        {options &&
          options.map((item, index) => {
            return (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
      </Select>
    </FormControl>
  )
}

export default SelectVariants
