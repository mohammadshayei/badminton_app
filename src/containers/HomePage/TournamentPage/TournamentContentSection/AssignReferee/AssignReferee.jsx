import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { assignReferee, fetchItems } from '../../../../../api/home'
import { stringFa } from '../../../../../assets/strings/stringFaCollection'
import Button from '../../../../../components/UI/Button/Button'
import { elementTypes } from '../../../../../components/UI/CustomInput/CustomInput'
import ErrorDialog from '../../../../../components/UI/Error/ErrorDialog'
import { setUpSinglePage } from '../../../../../utils/homeFunction'
import * as homeActions from "../../../../../store/actions/home"

import './AssignReferee.scss'

const AssignReferee = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [updateMode, setUpdateMode] = useState(false)
    const [body, setBody] = useState([])
    const [order, setOrder] = useState({
        gameReferee: {
            value: '',
            id: '',
            title: stringFa.umpire,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.assign_umpire_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: false
        },
        serviceReferee: {
            value: '',
            id: '',
            title: stringFa.service_umpire,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.assign_ser.service_umpire_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: false
        }
    })
    const token = useSelector(state => state.auth.token)
    const selectedTournament = useSelector(state => state.home.selectedTournament)
    const selectedContent = useSelector(state => state.home.selectedContent)
    const contents = useSelector(state => state.home.contents)

    const dispatch = useDispatch();
    const editGame = (content, key) => {
        dispatch(homeActions.editContent(content, key));
    };
    const onSaveClickHandler = async () => {
        if (!formIsValid && !updateMode) {
            let updatedOrder = { ...order };
            for (let inputIdentifier in updatedOrder) {
                updatedOrder[inputIdentifier].touched = true;
                if (updatedOrder[inputIdentifier].elementConfig)
                    updatedOrder[inputIdentifier].touched = !updatedOrder[inputIdentifier].elementConfig.disabled && true;
            }
            setOrder(updatedOrder)
            return;
        }
        setLoading(true)
        let payload = {
            refereeId: order.gameReferee.id,
            serviceRefereeId: order.serviceReferee.id,
            gameId: selectedContent
        }
        let result = await assignReferee(payload, token)
        if (!result.success) {
            setDialog(null)
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        } else {
            setDialog(null)
            setDialog(<ErrorDialog type="success">با موفقیت انجام شد</ErrorDialog>)
            let game = contents.find(item => item.game._id === selectedContent).game
            let udpatedGame = { ...game }
            let newReferee = { ...game.referee }
            let newServiceReferee = { ...game.service_referee }
            newReferee.id = order.gameReferee.id;
            newReferee.username = order.gameReferee.value;
            newServiceReferee.id = order.serviceReferee.id;
            newServiceReferee.username = order.serviceReferee.value;
            udpatedGame.referee = newReferee
            udpatedGame.service_referee = newServiceReferee
            editGame(udpatedGame, 'game')
            props.setShowModal(false)
        }
        setLoading(false)
    }

    const onUpdateClickHandler = () => {

    }

    useEffect(async () => {
        setLoading(true)
        let updatedOrder = { ...order }
        let result = await fetchItems(selectedTournament, token, "referees")
        let game = contents.find(item => item.game._id === selectedContent).game
        if (result.success) {
            updatedOrder["gameReferee"].items = [];
            result.data.forEach(element => {
                updatedOrder["gameReferee"].items = [...updatedOrder["gameReferee"].items,
                { text: element.referee.username, id: element.referee._id }]
            });
            if (game.referee) {
                updatedOrder["gameReferee"].value = game.referee.username
                updatedOrder["gameReferee"].id = game.referee._id;

            }
            updatedOrder["serviceReferee"].items = [];
            result.data.forEach(element => {
                updatedOrder["serviceReferee"].items = [...updatedOrder["serviceReferee"].items,
                { text: element.referee.username, id: element.referee._id }]
            });
            if (game.service_referee) {
                updatedOrder["serviceReferee"].value = game.service_referee.username
                updatedOrder["serviceReferee"].id = game.service_referee._id
            }
            if (game.referee && game.service_referee)
                setUpdateMode(true)
            else
                setUpdateMode(false)

            setOrder(updatedOrder)
        } else {
            setDialog(null)
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        setUpSinglePage(order, setFormIsValid, setOrder, setBody)
    }, [order])

    return (
        <div className='assign-referee-wrapper'>
            {dialog}
            <div className="input-wrapper">
                {body}
            </div>
            <div className="action-wrapper">
                <Button loading={loading} onClick={onSaveClickHandler}>
                    {updateMode ? stringFa.save_change : stringFa.save}
                </Button>
            </div>
        </div>
    )
}

export default AssignReferee
