import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchPlayer } from '../../../../../api/home';
import { stringFa } from '../../../../../assets/strings/stringFaCollection'
import Button from "../../../../../components/UI/Button/Button";
import * as homeActions from "../../../../../store/actions/home";

import './Footer.scss'
const PlayerFooter = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const setShowModal = (showModal) => {
        dispatch(homeActions.setShowModal(showModal));
    };
    const setEditMode = (editMode) => {
        dispatch(homeActions.setEditMode(editMode));
    };
    const addContent = (content, key) => {
        dispatch(homeActions.addContent(content, key));
    };
    const onChange = e => {
        setValue(e.target.value)
    }
    const onCreatePlayer = () => {
        setShowModal(true)
        setEditMode(false)
    }
    const onAddPlayer = async () => {
        setLoading(true)
        const result = await searchPlayer({ nationalNumber: value }, token)
        if (result.success) {
            if (result.data) {
                alert(stringFa.player_added)
                addContent(result.data, 'player')
            }
            else {
                alert(stringFa.player_not_found)
            }
        } else {
            alert(result.error)
        }

        setLoading(false)

    }
    return (
        <div className="tournament-content-footer-wrapper">
            <Button onClick={onCreatePlayer}>{stringFa.new_player}</Button>
            <Button
                disabled={value.length !== 10}
                onClick={onAddPlayer}>{stringFa.add}</Button>
            <input
                className='tournament-content-input'
                maxLength={10}
                value={value}
                onChange={onChange}
                placeholder={stringFa.national_number}
            />
        </div>
    )
}

export default PlayerFooter
