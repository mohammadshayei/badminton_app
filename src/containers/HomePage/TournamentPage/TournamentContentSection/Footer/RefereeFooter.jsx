import './Footer.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addReferee, searchPlayer } from '../../../../../api/home';
import { stringFa } from '../../../../../assets/strings/stringFaCollection'
import Button from "../../../../../components/UI/Button/Button";
import * as homeActions from "../../../../../store/actions/home";
import ErrorDialog from '../../../../../components/UI/Error/ErrorDialog';

const RefereeFooter = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token)
    const selectedTournament = useSelector(state => state.home.selectedTournament)

    const addContent = (content, key) => {
        dispatch(homeActions.addContent(content, key));
    };
    const onChange = e => {
        setValue(e.target.value)
    }
    const onAddPlayer = async () => {
        setDialog(null)
        setLoading(true)
        const result = await addReferee({ input: value, tournamentId: selectedTournament }, token)
        if (result.success) {
            setDialog(<ErrorDialog type="success">{stringFa.umpire_added}</ErrorDialog>)
            setValue('')
            addContent(result.data, 'referee')
        } else {
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        }

        setLoading(false)

    }
    return (
        <div className="tournament-content-footer-wrapper">
            {dialog}
            <Button
                loading={loading}
                disabled={value.length < 10 || value.length > 11}
                onClick={onAddPlayer}>{stringFa.add}</Button>
            <input
                className='tournament-content-input wide-input'
                maxLength={11}
                value={value}
                onChange={onChange}
                placeholder={stringFa.national_number_or_phone}
            />
        </div>
    )
}

export default RefereeFooter
