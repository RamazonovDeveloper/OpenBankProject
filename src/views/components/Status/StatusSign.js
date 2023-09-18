import Box from '@mui/material/Box'

export default function StatusSign({ data }) {
  if (data) {
    return (
      <Box
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          marginRight: 10,
          backgroundColor: data.color,
          display: 'inline-block'
        }}
      ></Box>
    )
  }

  return (
    <Box
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        marginRight: 10,
        backgroundColor: '#4E0F8A',
        display: 'inline-block'
      }}
    ></Box>
  )
}
