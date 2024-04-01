import { useEffect, useState } from 'react'

// ======= store ======= //
import { useAppDispatch, useAppSelector } from 'src/storeTypes'
import { getTickets } from './store/tickets.action'
import { ticketsErrorsSelector, ticketsPendingSelector, ticketsSelector, ticketsTotalCountSelector } from './store/tickets.selector'

// ======= mui ======= //
import { CircularProgress, Container, Stack, Typography } from '@mui/material'

// ======= components ======= //
import AlertMessage from 'src/components/alert-message'
import TicketComponent from './components/ticket.component'
import { useTranslation } from 'react-i18next'

export default function TicketPage() {
    const tickets = useAppSelector(ticketsSelector)
    const errors = useAppSelector(ticketsErrorsSelector)
    const pending = useAppSelector(ticketsPendingSelector)
    const totalCount = useAppSelector(ticketsTotalCountSelector)
    const [scroll, setScroll] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    useEffect(() => {
        dispatch(getTickets(currentPage))
        setCurrentPage(prev => prev + 1)
    }, [])

    useEffect(() => {
        if (scroll) {
            dispatch(getTickets(currentPage)).finally(() => {
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
    }, [scroll, tickets,totalCount])

    const scrollHandler = (e: any) => {
        if (
            (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 10)
            &&
            tickets.length < totalCount
        ) {
            setScroll(true)
        }
    }

    return (
        <Container sx={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Stack className='tickets-search-stack'>
                <Typography variant='h1' className='main'>{t('tickets.title')}</Typography>
                <Stack className='users-stack'>
                    {tickets.length ? tickets?.map(ticket => {
                        return <TicketComponent key={ticket.id} ticket={ticket} />
                    })
                        :
                        <Typography variant='h3' className="main">{t('tickets.no_tickets')}</Typography>
                    }
                    {pending ? <CircularProgress sx={{ position: 'absolute' }} /> : null}
                </Stack>
            </Stack>
            {errors ? <AlertMessage errorMessage={errors} /> : null}
        </Container>
    )
}
