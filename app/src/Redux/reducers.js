const roomReducer = (selectedRoom=null, action) => {
    if(action.type === 'SELECTED_ROOM') {
        return action.room; 
    };

    return selectedRoom;
};

const dayReducer = (selectedDay=null, action) => {
    if(action.type === 'SELECTED_DAY') {
        return action.day; 
    };

    return selectedDay;
};

const termReducer = (hour=null, user=undefined, action) => {
    if(action.type === 'BOOKED_TERM') {
        return {
            hour: action.hour,
            user: action.user
        };
    };
    return {
        hour: hour,
        user: user
    };
};

export default roomReducer;
export default dayReducer;
export default termReducer;