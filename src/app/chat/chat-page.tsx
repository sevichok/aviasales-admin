import { Card, CardContent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import socket from '../../socket';
import { Room } from "./types/room.type";

export default function ChatPage() {
    const [rooms, setRooms] = useState<Room[]>([])
    const navigate = useNavigate()
    const { t } = useTranslation();

    useEffect(() => {
        socket.emit('connect-manager')
        socket.emit("get-rooms")
        socket.on("new-chat", (room) => {
            setRooms(prev => [...prev, room])
        })
        socket.on("rooms", (rooms) => {
            setRooms(rooms)
        })
    }, [])
    const handleNavigateToPrivateRoom = (id: string) => {
        navigate(id)
    }
    console.log(rooms[0])
    return (
        <Stack direction='row' alignItems='center' gap={3} className='users-stack'>
            {rooms.map(room => {
                return <Card className='user-card' onClick={() => handleNavigateToPrivateRoom(room.id)} key={room.id}>
                    <CardContent>
                        <Typography variant='h2'>
                            {t('room.client')}: {room.first_name + ' ' + room.last_name}
                        </Typography>
                        <Typography variant='h4' paddingTop={'3px'}>
                            {t('room.room_id')}: {room.id}
                        </Typography>
                    </CardContent>
                </Card>
            })}
        </Stack>
    )
}
