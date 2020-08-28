import {ActionType} from '../../types/action.types';

export const countries = (countries_list) => {
  return {
    type: ActionType.COUNTRIES,
    payload: countries_list,
  };
};