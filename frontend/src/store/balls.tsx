import { actionTypes } from './actionTypes';
import { action as act } from 'typesafe-actions'
import { getCards, getCalled } from '../webservices/bingoService';
import { Reducer, AnyAction } from 'redux'
import { Dispatch } from 'react';
import { danger, clear } from './messages';

/* Card Interface */

export interface IBallArray {
    readonly balls?: IBall[],
}

export interface IBall {
    readonly num_value?: number
}
/* Card Actions */

const fetchRequest = (cardCount: number, meta: string) => act(actionTypes.BALL_REQUEST, cardCount, meta)
const fetchSuccess = (data: IBallArray) => act(actionTypes.BALL_SUCCESS, data)
const fetchFailure = (error: string) => act(actionTypes.BALL_FAILURE, error)


export const requestCalled = async (cardCount = 1, dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchRequest(cardCount, "Requesting balls"))
    getCalled(cardCount)
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
    balls: [],
}

/* Card Reducer */
export const ballReducer: Reducer<IBallArray> = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BALL_REQUEST:
            return {
                ...state,
            };
        case actionTypes.BALL_SUCCESS:
            return {
                ...state,
                balls: action.payload,
            };
        case actionTypes.BALL_FAILURE:
            return {
                balls: [],
                error: action.error,
            };
        default:
            return state;
    }
};
