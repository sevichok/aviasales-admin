import { useEffect, useState } from 'react'

// ======= helpers ======= //
import useDebounce from 'src/hooks/useDebounce'

// ======= store ======= //
import { useAppDispatch, useAppSelector } from 'src/storeTypes'
import {getFirstUsers, getUsers, getUsersBySearch} from './store/users.action'
import { usersCountSelector, usersErrorsSelector, usersPendingSelector, usersSelector } from './store/users.selector'

// ======= mui ======= //
import { Container, Stack, TextField, Typography } from '@mui/material'

// ======= components ======= //
import UserCard from './components/user-card.component'
import AlertMessage from '../../components/alert-message'
import { useTranslation } from 'react-i18next'

export default function UsersPage() {
    const users = useAppSelector(usersSelector)
    const errors = useAppSelector(usersErrorsSelector)
    const pending = useAppSelector(usersPendingSelector)
    const [scroll, setScroll] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const totalCount = useAppSelector(usersCountSelector)
    const dispatch = useAppDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(getFirstUsers(currentPage))
        setCurrentPage(prev => prev + 1)
    }, [])

    useEffect(() => {
        if (scroll) {
            dispatch(getUsers(currentPage)).finally(() => {
                setCurrentPage(prev => prev + 1)
                setScroll(false)
            })
        }
    }, [scroll])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [scroll, users])

    const scrollHandler = (e: any) => {
        if (
            (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 10)
            &&
            users.length < totalCount
        ) {
            setScroll(true)
        }
    }

    const handleInput = (value: string) => {
        dispatch(getUsersBySearch(value))
    }
    const debounced = useDebounce(handleInput)

    return (
        <Container sx={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Stack className='users-search-stack'>
                <Typography variant='h1' className='main'>{t('users.title')}</Typography>
                <TextField
                    id="filled-search"
                    label={t('users.search_users_label')}
                    placeholder={t('users.search_users_placeholder')}
                    InputLabelProps={{ shrink: true }}
                    type="search"
                    sx={{ color: 'whitesmoke', width: '40%' }}
                    variant='outlined'
                    onChange={(e) => debounced(e.target.value)}
                />
            </Stack>
            <Stack direction='column' className='users-stack'>
                {users.length ? users.map(user => {
                    return <UserCard key={user.id} user={user} />
                }) :

                    <Typography variant='h3'>{t('users.no_users')}</Typography>}
            </Stack>
            {errors ? <AlertMessage errorMessage={errors} /> : null}
        </Container>
    )
}
