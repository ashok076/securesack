import {ActionType} from '../../types/action.types';

export const save = (save) => {
    
  return {
    type: ActionType.SAVE,
    payload: save
  };
};