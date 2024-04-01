import { useEffect } from 'react'
import { useParams } from 'react-router'

// ======= store ======= //
import { useAppDispatch, useAppSelector } from 'src/storeTypes'
import { getUser } from './store/users.action'
import { userErrorsSelector, userPendingSelector, userSelector } from './store/users.selector'

// ======= mui ======= //
import { Typography, CircularProgress, Container, Stack } from '@mui/material'

// ======= components ======= //
import UserEdit from './components/user-edit.component'
import UserTicketsComponent from './components/user-tickets.component'
import AlertMessage from '../../components/alert-message'
import { useTranslation } from 'react-i18next'

export default function UserPage() {
    const dispatch = useAppDispatch()
    const { id } = useParams<string>()
    const user = useAppSelector(userSelector)
    const user_errors = useAppSelector(userErrorsSelector)
    const user_pending = useAppSelector(userPendingSelector)
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(getUser(id!))
    }, [])

    if (user_pending) {
        return <CircularProgress />
    }

    return (
        <Container sx={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            {user ? <><Stack className='user-edit-stack'>
                <Typography variant='h1' color={'whitesmoke'}>{t('users.user')}: {user.first_name} {user.last_name}</Typography>
                <UserEdit user={user} />
            </Stack>
                <Stack direction='column' className='users-stack'>
                    {user.tickets.length ? user.tickets.map(ticket => {
                        return <UserTicketsComponent key={ticket.id} ticket={ticket} />
                    })
                        :
                        <Typography variant='h3' >{t('tickets.no_tickets')}</Typography>}
                </Stack>
            </> : null}
            {user_errors ? <AlertMessage errorMessage={user_errors} ></AlertMessage> : null}

        </Container>
    )
}
