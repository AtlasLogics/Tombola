import { actionTypes } from './actionTypes';
import { action as act } from 'typesafe-actions'
import { getCards, getCalled } from '../webservices/bingoService';
import { Reducer, AnyAction } from 'redux'
import { Dispatch } from 'react';
import { danger, clear } from './messages';

/* Card Interface */

export interface ICardArray {
    readonly [key: number]: ICard,
    readonly cards: ICard[],
}
export interface IRow {
    readonly b_val: string,
    readonly i_val: string,
    readonly n_val: string,
    readonly g_val: string,
    readonly o_val: string,
    readonly v0_val: string,
    readonly v1_val: string,
    readonly v2_val: string,
    readonly v3_val: string,


}
export interface ICard {
    readonly id: number,
    readonly [key: number]: IRow,
    readonly rows: IRow[],
}

/* Card Actions */

const fetchRequest = (cardCount: number, meta: string) => act(actionTypes.CARD_REQUEST, cardCount, meta)
const fetchSuccess = (data: ICardArray) => act(actionTypes.CARD_SUCCESS, data)
const fetchFailure = (error: string) => act(actionTypes.CARD_FAILURE, error)


export const requestNumbers = async (cardCount = 1, dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchRequest(cardCount, "Requesting cards"))
    getCards(cardCount)
        .then(
            (payload) => {
                return dispatch(fetchSuccess(payload));
            },
            (error) => {
                dispatch(fetchFailure(error.toString())); // for debugging with redux-logger
                dispatch(danger(error.toString())); // sends error to the UI
                setTimeout(() => {
                    dispatch(clear()); // clear error after 10 seconds from UI
                  }, 10000);
            },
        );
}

/* Reducers map actions to state, set the default here */

const initialState = {
    cards: [],
}

/* Card Reducer */
export const cardReducer: Reducer<ICardArray> = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CARD_REQUEST:
            return {
                ...state,
            };
        case actionTypes.CARD_SUCCESS:
            return {
                ...state,
                cards: action.payload,
            };
        case actionTypes.CARD_FAILURE:
            return {
                cards: [],
                error: action.error,
            };
        default:
            return state;
    }
};
