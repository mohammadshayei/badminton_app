import React from 'react'
import { useDispatch } from 'react-redux';
import Button from '../../../../../components/UI/Button/Button'
import * as homeActions from "../../../../../store/actions/home";

const SimpleFooter = ({ titleButton }) => {
    const dispatch = useDispatch();

    const setShowModal = (showModal) => {
        dispatch(homeActions.setShowModal(showModal));
    };
    const setEditMode = (editMode) => {
        dispatch(homeActions.setEditMode(editMode));
    };

    const onClick = () => {
        setShowModal(true)
        setEditMode(false)
    }
    return (
        <div className='tournament-content-footer-wrapper'>
            <Button
                onClick={onClick}>
                {titleButton}
            </Button>
        </div >
    )
}

export default SimpleFooter
