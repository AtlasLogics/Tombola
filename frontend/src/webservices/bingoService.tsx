import { handleResponse } from '../store/actionTypes';

export const getCards = async (cardCount: number) => {
    const requestOptions = {
        method: 'GET',
    };
    console.log("Requesting cardCount", cardCount);
    const uri = "http://localhost:8000/play/cards";
    return fetch(uri, requestOptions)
        .then(handleResponse)
        .then((cards) => cards);
}

export const getCalled = async (cardCount: number) => {
    const requestOptions = {
        method: 'GET',
    };
    console.log("Requesting cardCount", cardCount);
    const uri = "http://localhost:8000/play/balls";
    return fetch(uri, requestOptions)
        .then(handleResponse)
        .then((calls) => calls);
}
