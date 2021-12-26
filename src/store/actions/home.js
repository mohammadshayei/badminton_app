import * as actionTypes from "./actionTypes";


export const setTournaments = (tournaments) => {
    return {
        type: actionTypes.SET_TOURNAMENTS,
        tournaments
    };
}
export const setSelectedTournament = (tournament) => {
    return {
        type: actionTypes.SET_SELECTED_TOURNAMENT,
        tournament
    };
}
export const setContents = (contents) => {
    return {
        type: actionTypes.SET_CONTENTS,
        contents
    };
}
export const setSelectedContent = (content) => {
    return {
        type: actionTypes.SET_SELECTED_CONTENT,
        content
    };
}
export const setMode = (mode) => {
    return {
        type: actionTypes.SET_MODE_HOME_PAGE,
        mode
    };
}
export const addTournament = (tournament) => {
    return {
        type: actionTypes.ADD_TOURNAMENT,
        tournament
    };
}
export const editTournament = (tournament) => {
    return {
        type: actionTypes.EDIT_TOURNAMENT,
        tournament
    };
}
export const setShowModal = (showModal) => {
    return {
        type: actionTypes.SET_HOME_SHOW_MODAL,
        showModal
    };
}
export const setEditMode = (editMode) => {
    return {
        type: actionTypes.SET_EDIT_MODE,
        editMode
    };
}
export const addContent = (content, key) => {
    return {
        type: actionTypes.ADD_CONTENT,
        content,
        key
    };
}
export const editContent = (content, key) => {
    return {
        type: actionTypes.EDIT_CONTENT,
        content,
        key

    };
}
export const removeItemContent = (id, key) => {
    return {
        type: actionTypes.REMOVE_ITEM,
        id,
        key

    };
}