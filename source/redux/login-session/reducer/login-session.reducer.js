import { ActionType } from '../../types/action.types';

const initialState = {
    isLogin: false,
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.LOGIN_SESSION:
            return {
                ...state,
                isLogin: action.payload
            };
            break;
    
        default:
        return state;
            break;
    }
}

export default loginReducer;