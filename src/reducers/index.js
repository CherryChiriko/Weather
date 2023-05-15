import cityReducer from './cities';
import refreshKeyReducer from './refreshKey';
import selectedIdReducer from './selectedId';
import { combineReducers} from 'redux';

const allReducers = combineReducers({
    cities: cityReducer,
    selectedId: selectedIdReducer,
    refreshKey: refreshKeyReducer
})

export default allReducers