export const selectRoom = room => {
    return {
        type: "SELECTED_ROOM",
        room: room
    }
} 

export const selectDay = day => {
    return {
        type: "SELECTED_DAY",
        day: day
    }
}

export const bookTerm = (hour, user) => {
    return {
        type: "BOOKED_TERM",
        hour: hour,
        user: user
    }
}

