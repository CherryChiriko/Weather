export const add = (newCity) => {
    return {
        type: 'ADD',
        payload: newCity
    };
};
export const del = (cityId) => {
    return {
        type: 'DELETE',
        payload: cityId
    };
}
export const refresh = (cityId, cityData) => {
    return {
        type: 'REFRESH',
        payload: {id: cityId, data: cityData}
    };
}

export const updateId = (cityId) => {
    return {
        type: 'UPDATE_ID',
        payload: cityId
    };
}
export const updateRefreshKey = (cityId) => {
    return {
        type: 'REFRESH_KEY',
        payload: cityId
    };
}

