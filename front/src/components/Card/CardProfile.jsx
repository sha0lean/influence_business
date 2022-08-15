import MuiBox from '@mui/material/Box'
import MuiStack from '@mui/material/Stack'
import MuiCard from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardMedia from '@mui/material/CardMedia'
import MuiTypography from '@mui/material/Typography'

import img__bgPatternCard from '../../assets/images/bg-pattern-card.svg'

import img__profile from '../../assets/images/image-victor.jpg'

const CardMui = () => {
  return (
    <MuiCard
      sx={{
        width: 500,
        borderRadius: '1.25em',
        boxShadow: '2px 2px 25px rgba(0, 0, 0, 0.15)',
      }}
    >
      <MuiCardContent
        sx={{
          position: 'relative',
          padding: 0,
        }}
      >
        <MuiCardMedia sx={{ position: 'absolute' }} component="img" image={img__bgPatternCard} />
      </MuiCardContent>
      <MuiCardContent sx={{ marginTop: '6em' }}>
        <MuiCardMedia
          sx={{
            position: 'relative',
            width: '100px',
            margin: '0.5em auto',
            borderRadius: '100%',
            border: '4px solid transparent',
            borderColor: 'background.paper',
          }}
          component="img"
          image={img__profile}
        />
        <MuiTypography sx={{ textAlign: 'center' }} variant="body1" color="text.primary">
          Nouveau Projet
          <MuiTypography sx={{ margin: '0 0.25em' }} variant="caption" color="text.secondary">
            28
          </MuiTypography>
        </MuiTypography>
        <MuiTypography sx={{ textAlign: 'center' }} variant="subtitle1" color="text.secondary">
          London
        </MuiTypography>

        <MuiStack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          sx={{ marginTop: '1em', paddingTop: '1em', borderTop: '1px solid #ccc' }}
        >
          <MuiBox sx={{ textAlign: 'center' }}>
            <MuiTypography sx={{ marginBottom: 0 }} variant="body1" color="text.primary">
              50 / 100
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary">
              Module 1
            </MuiTypography>
          </MuiBox>

          <MuiBox sx={{ textAlign: 'center' }}>
            <MuiTypography sx={{ marginBottom: 0 }} variant="body1" color="text.primary">
              803K
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary">
              Module 2
            </MuiTypography>
          </MuiBox>

          <MuiBox sx={{ textAlign: 'center' }}>
            <MuiTypography sx={{ marginBottom: 0 }} variant="body1" color="text.primary">
              1.4K
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary">
              Module 3
            </MuiTypography>
          </MuiBox>
          <MuiBox sx={{ textAlign: 'center' }}>
            <MuiTypography sx={{ marginBottom: 0 }} variant="body1" color="text.primary">
              1.4K
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary">
              Module 4
            </MuiTypography>
          </MuiBox>
        </MuiStack>
        <MuiStack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
          sx={{ marginTop: '1em', paddingTop: '1em', borderTop: '1px solid #ccc' }}
        >
          <MuiBox sx={{ textAlign: 'center' }}>
            <MuiTypography sx={{ marginBottom: 0 }} variant="body1" color="text.primary">
              50 / 100
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary">
              Module 1
            </MuiTypography>
          </MuiBox>

          <MuiBox sx={{ textAlign: 'center' }}>
            <MuiTypography sx={{ marginBottom: 0 }} variant="body1" color="text.primary">
              803K
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary">
              Module 2
            </MuiTypography>
          </MuiBox>

          <MuiBox sx={{ textAlign: 'center' }}>
            <MuiTypography sx={{ marginBottom: 0 }} variant="body1" color="text.primary">
              1.4K
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary">
              Module 3
            </MuiTypography>
          </MuiBox>
          <MuiBox sx={{ textAlign: 'center' }}>
            <MuiTypography sx={{ marginBottom: 0 }} variant="body1" color="text.primary">
              1.4K
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary">
              Module 4
            </MuiTypography>
          </MuiBox>
        </MuiStack>
      </MuiCardContent>
    </MuiCard>
  )
}

export default CardMui
