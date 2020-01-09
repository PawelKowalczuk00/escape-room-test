const selectRoom = room => {
    return {
        type: SELECTED_ROOM,
        room: room
    }
} 

const selectDay = day => {
    return {
        type: SELECTED_DAY,
        day: day
    }
}

const bookTerm = (hour, user) => {
    return {
        type: BOOKED_TERM,
        hour: hour,
        user: user
    }
}

export default selectRoom
export default selectDay
export default bookTerm

