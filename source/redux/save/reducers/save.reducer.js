import {ActionType} from '../../types/action.types';

const initialState = {
  save: null,
};

const save = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SAVE:
    console.log(action.payload)
      return {
        ...state,
        save: action.payload,
      };
      break;

    default:
      return state;
      break;
  }
};

export default save;
