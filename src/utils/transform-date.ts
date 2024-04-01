type Props = {
    date: Date,
}
export default function transformDate(date: Props) {
    const newDate = new Date(date.date).toLocaleDateString("en-US", { //если вынести в объект дает ошибку xd
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    })
    const newTime = new Date(date.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    return [newDate, newTime]
}