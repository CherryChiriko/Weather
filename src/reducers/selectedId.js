const selectedIdReducer = (state = null, action) => {
    switch(action.type){
        case 'UPDATE_ID':
            return action.payload;
        default: 
            return state;
    }
}

export default selectedIdReducer;