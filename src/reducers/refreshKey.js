const refreshKeyReducer = (state = 0, action) => {
    switch(action.type){
        case 'REFRESH_KEY':
            return state + 1;
        default: 
            return state;
    }
}

export default refreshKeyReducer;