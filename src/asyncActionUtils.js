export default function createAsyncDispatcher(type, promiseFn) {
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    async function actionHanlder(dispatch, ...rest) {
        dispatch({ type });
        try {
            const data = await promiseFn(...rest);
            dispatch({ type: SUCCESS, data: data });
        } catch (e) {
            dispatch({ type: ERROR, error: e });
        }
    }
    return actionHanlder;
}

export const initialAsyncState = { loading: false, data: null, error: null };
const loadingState = { loading: true, data: null, error: null };
const success = data => ({ loading: false, data: data, error: null });
const error = e => ({ loading: false, data: null, error: e });

export function createAsyncHandler(type, key) {
    const SUCCESS = `${type}_SUCCESS`;
    const ERROR = `${type}_ERROR`;

    return function hanlder(state, action) {
        switch (action.type) {
            case type: return { ...state, [key]: loadingState };
            case SUCCESS: return { ...state, [key]: success(action.data) };
            default: return state;
        }
    }
}
