function getInitialState(){
    const currentCities = JSON.parse(localStorage.getItem('currentCities'));
    return currentCities || [];
}

const cityReducer = (state = getInitialState(), action) => {
    switch(action.type){
        case 'ADD':
            return [...state, action.payload]
        case 'DELETE':
            return state.filter((city) => city.id !== action.payload);
        case 'REFRESH':
            return state.map(city =>  (city.id === action.payload.id ? 
                action.payload.data : city));
        default: 
            return state;
    }
}

export default cityReducer;