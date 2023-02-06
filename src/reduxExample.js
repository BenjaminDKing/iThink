// STORE -> GLOBALIZED STATE

// ACTION -> SIMPLE FUNCTION WHICH RETURNS AN OBJECT
const increment = () => {
    return { 
      type: "INCREMENT"
    }
  }
  
  const decrement = () => {
    return { 
      type: "DECREMENT"
    }
  }
  
  // REDUCER -> CHECK ACTION TO MODIFY STORE DATA
  const counter = (state = 0, action) => {
    switch(action.type){
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
    }
  }
  
  let store = createStore(counter);
  
  // Display it in the console
  store.subscribe(() => console.log(store.getState()));
  
  // DISPATCH -> SEND ACTION TO REDUCER
  store.dispatch(increment());