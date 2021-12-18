import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { stringFa } from '../../../../../assets/strings/stringFaCollection'
import Button from "../../../../../components/UI/Button/Button";
import * as homeActions from "../../../../../store/actions/home";

import './Footer.scss'
const PlayerFooter = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch();

    const setShowModal = (showModal) => {
        dispatch(homeActions.setShowModal(showModal));
    };
    const setEditMode = (editMode) => {
        dispatch(homeActions.setEditMode(editMode));
    };
    const onChange = e => {
        setValue(e.target.value)
    }
    const addPlayerClick = () => {
        setShowModal(true)
        setEditMode(false)
    }
    return (
        <div className="tournament-content-footer-wrapper">
            <Button onClick={addPlayerClick}>{stringFa.new_player}</Button>
            <Button>{stringFa.add}</Button>
            <input
                className='tournament-content-input'
                maxLength={10}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default PlayerFooter
