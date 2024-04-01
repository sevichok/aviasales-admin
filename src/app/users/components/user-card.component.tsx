// ======= utils, types ======= //
import { User } from '../types/User.type'
import { useNavigate } from 'react-router'

// ======= mui ======= //
import { Card, CardContent, Typography, CardActions } from '@mui/material'
import { RoutesConstant } from 'src/constants/RoutesConstants.enum'
import { useTranslation } from 'react-i18next'
interface Props {
  user: User
}

export default function UserCard({ user }: Props) {
  const navigate = useNavigate()
  const {t} = useTranslation()

  const handleNavigate = () => {
    navigate(RoutesConstant.user_id + user.id)
  }

  return (
    <>
      <Card className='user-card'>
        <CardContent>
          <Typography variant='h2'>
            {user.last_name} {user.first_name}
          </Typography>
          <Typography variant='h5' paddingTop={'3px'}>
          {t('users.user_email')}: {user.email}
          </Typography>
          <Typography variant="h5" paddingTop={'3px'}>
          {t('users.user_tickets')}: {user.tickets.length}
          </Typography>
        </CardContent>
        <CardActions sx={{ padding: "16px" }}>
          <Typography variant="h5" className='personal-info' onClick={handleNavigate}>
          {t('users.watch_info')}
          </Typography>
        </CardActions>
      </Card>
    </>
  )
}
