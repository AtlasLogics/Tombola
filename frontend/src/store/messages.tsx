import { action as act } from 'typesafe-actions'
import { actionTypes } from './actionTypes';
import { Reducer } from 'redux'

/* Message Actions */

export const success = (message: string) => act(actionTypes.ALERT_SUCCESS, message);
export const danger = (message: string) => act(actionTypes.ALERT_DANGER, message)
export const clear = () => act(actionTypes.ALERT_CLEAR);

export interface IMessage {
    readonly type: string,
    readonly message: string
}
const initialState = {
    message: "",
    type: "alert-clear",
}

/* Message Reducer */
const messageReducer: Reducer<IMessage> = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALERT_SUCCESS:
            return {
                message: action.payload,
                type: 'alert-success',
            };
        case actionTypes.ALERT_DANGER:
            return {
                message: action.payload,
                type: 'alert-danger',
            };
        case actionTypes.ALERT_CLEAR:
            return {
                message: action.payload,
                type: 'alert-clear',
            };

        default:
            return state
    }
}
export { messageReducer }
