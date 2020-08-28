import {ActionType} from '../../types/action.types';

const initialState = {
  countries_list: [],
};

const countries = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.COUNTRIES:
    console.log("HAHAHAHAH6", action.payload)
      return {
        ...state,
        countries_list: action.payload,
      };
      break;
    default:
      return state;
      break;
  }
};

export default countries