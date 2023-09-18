// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// Styled component for the trophy image
const TrophyImg = styled('img')(({ theme }) => ({
  right: 22,
  bottom: 0,
  width: 106,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 95
  }
}))

const cardItems = [{
  title: "Кредит для бизнеса",
  imgSrc: "https://cdn-icons-png.flaticon.com/512/649/649001.png"
},
{
  title: "Можно картой?",
  imgSrc: "https://cdn-icons-png.flaticon.com/512/4320/4320287.png"
},
{
  title: "Личный юрист для бизнеса",
  imgSrc: "https://cdn-icons-png.flaticon.com/512/1208/1208147.png"
},
{
  title: "Зарплатный проект",
  imgSrc: "https://cdn-icons-png.flaticon.com/512/3142/3142102.png"
},
]

const CardItems = () =>  (
  cardItems.map((item, index) => {
    return (
      <Grid key={index} item xs={12} md={3}>
        <Card sx={{ position: 'relative', backgroundColor: "#81dabb47"}}>
          <CardContent>
            <Typography variant='body1'>
              {item.title}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
              </Box>
            </Typography>
            <Button sx={{ mt: 4}} size='small' variant='contained'>
              Подробнее
            </Button>
            <TrophyImg sx={{ mb: 3, width: '60px' }} alt='trophy' src={item.imgSrc} />
          </CardContent>
        </Card>
      </Grid>
    )
  })
)

export default CardItems
