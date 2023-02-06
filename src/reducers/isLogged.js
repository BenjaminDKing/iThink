const loggedReducer = (state = null, action) => {
    switch(action.type){
        case 'STORE_USER':
            return action.payload;
        default:
            return state;
    }
}

export default loggedReducer;