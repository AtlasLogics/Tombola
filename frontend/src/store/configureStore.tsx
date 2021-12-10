import { createStore, compose, applyMiddleware, combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";
import { messageReducer, IMessage } from './messages';
import { cardReducer, ICardArray } from './cards';
import { IBallArray, ballReducer } from './balls';

export interface IConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}

export interface IApplication {
    message: IMessage,
    cards: ICardArray,
    balls: IBallArray,
}

const configureStore = () => {
    const reducers = {
        cards: cardReducer,
        message: messageReducer,
	balls: ballReducer
    };
    const loggerMiddleware = createLogger();
    const middleware = [
        thunk,
        loggerMiddleware,
    ];
    const rootReducer = combineReducers({
        ...reducers,
    });
    return createStore(
        rootReducer,
        compose(applyMiddleware(...middleware)),
    );
 }
export default configureStore;
