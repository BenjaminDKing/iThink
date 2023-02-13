const loggedReducer = (state = null, action) => {
    switch(action.type){
        case 'STORE_USER':
            return action.payload;
        case 'ADD_BUDDY':
            let add_buddy_user = {...state }
            add_buddy_user.buddies.push(action.payload)
            console.log(add_buddy_user)
            return add_buddy_user
        case 'REMOVE_BUDDY':
            let remove_buddy_user = {...state};
            const index = remove_buddy_user.buddies.indexOf(action.payload);
            remove_buddy_user.buddies.splice(index, 1);
            console.log(remove_buddy_user);
            return remove_buddy_user
        default:
            return state;
    }
}

export default loggedReducer;