const loggedReducer = (state = null, action) => {
    switch(action.type){
        case 'STORE_USER':
            return action.payload;
        case 'ADD_BUDDY':
            let new_user = {...state }
            new_user.buddies.push(action.payload)
            console.log(new_user)
            return new_user
        default:
            return state;
    }
}

export default loggedReducer;