export enum actionTypes {
    /* Messaging system */
    ALERT_SUCCESS = 'ALERT_SUCCESS',
    ALERT_DANGER = 'ALERT_DANGER',
    ALERT_CLEAR = 'ALERT_CLEAR',
    /* Bingo cards */
    CARD_REQUEST = 'CARD_REQUEST',
    CARD_SUCCESS = 'CARD_SUCCESS',
    CARD_FAILURE = 'CARD_FAILURE',

    BALL_REQUEST = 'BALL_REQUEST',
    BALL_SUCCESS = 'BALL_SUCCESS',
    BALL_FAILURE = 'BALL_FAILURE',

}

export interface IResponse {
    statusText: string,
    ok: boolean,
    text(): Promise<string>,
}

/* Global parsing and error handling for AJAX requests */
export const handleResponse = (response: IResponse) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
};
