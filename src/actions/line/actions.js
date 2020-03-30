import * as actionTypes from "../../constants/redux/line/actionTypes";

export function toggleAll() {
    return {
        type: actionTypes.TOGGLE_ALL_GROUPS
    }
}

export function toggleItem(index) {
    return {
        type: actionTypes.TOGGLE_ITEM_GROUP,
        index: index
    }
}

export function fetchSourcePending() {
    return {
        type: actionTypes.FETCH_SOURCE_PENDING
    }
}

export function fetchSourceSuccess(tourneys, matches) {
    return {
        type: actionTypes.FETCH_SOURCE_SUCCESS,
        tourneys: tourneys,
        matches: matches
    }
}

export function fetchSourceError(error) {
    return {
        type: actionTypes.FETCH_SOURCE_ERROR,
        error: error
    }
}