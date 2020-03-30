import * as actionTypes from '../../constants/redux/line/actionTypes'

const initialState = {
  expanded: true,
  tourneysSource: [],
  matchesSource: [],
  error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.TOGGLE_ALL_GROUPS:
        var tourneys = state.tourneysSource.map(x => Object.assign({}, x, {
          expanded: !state.expanded
        }));
        return {
          ...state,
          tourneysSource: tourneys,
          expanded: !state.expanded
        };
      case actionTypes.TOGGLE_ITEM_GROUP:
        const newArray = [];
        const originItem = state.tourneysSource.find(x => x.id === action.index);
        const item = Object.assign({}, originItem, { expanded: !originItem.expanded });
        newArray.push(item);
        return {
          ...state,
          tourneysSource: state.tourneysSource.map(obj => newArray.find(o => o.id === obj.id) || obj)
        }
      case actionTypes.FETCH_SOURCE_PENDING:
        return state;
      case actionTypes.FETCH_SOURCE_SUCCESS:
        return {
          ...state,
          tourneysSource: action.tourneys,
          matchesSource: action.matches
        };
      case actionTypes.FETCH_SOURCE_ERROR:
        return {
          ...state,
          error: action.error
        };
      default:
        return state;
    }
  };