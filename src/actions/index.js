export const increment = (nr) => {
    return {
        type: 'INCREMENT',
        payload: nr
    }
}

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

export const storeUser = (user) => {
    return {
        type: 'STORE_USER',
        payload: user
    }
}

export const addBuddyRedux = (buddy) => {
    return {
        type: 'ADD_BUDDY',
        payload: buddy
    }
}
