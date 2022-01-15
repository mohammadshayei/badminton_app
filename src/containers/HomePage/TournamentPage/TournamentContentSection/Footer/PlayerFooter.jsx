import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPlayerWithPhone, searchPlayer } from '../../../../../api/home';
import { stringFa } from '../../../../../assets/strings/stringFaCollection'
import Button from "../../../../../components/UI/Button/Button";
import ErrorDialog from '../../../../../components/UI/Error/ErrorDialog';
import * as homeActions from "../../../../../store/actions/home";

import './Footer.scss'
const PlayerFooter = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const selectedTournament = useSelector(state => state.home.selectedTournament)
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
        setDialog(null)
        setLoading(true)
        const result = await addPlayerWithPhone({ tournamentId: selectedTournament, nationalNumber: value }, token)
        if (result.success) {
            setDialog(<ErrorDialog type="success">{stringFa.player_added}</ErrorDialog>)
            addContent(result.data, 'player')

        } else {
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        }

        setLoading(false)

    }
    return (
        <div className="tournament-content-footer-wrapper">
            {dialog}
            <Button
                onClick={onCreatePlayer}>{stringFa.new_player}</Button>
            <Button
                loading={loading}
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
