import { ActionType } from '../../types/action.types';

export const toggleLoginSession = (isLogin) => {
    return {
        type: ActionType.LOGIN_SESSION,
        payload: isLogin
    }
}