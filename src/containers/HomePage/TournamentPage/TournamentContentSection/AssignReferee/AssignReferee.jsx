import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { assignReferee, fetchItems } from '../../../../../api/home'
import { stringFa } from '../../../../../assets/strings/stringFaCollection'
import Button from '../../../../../components/UI/Button/Button'
import { elementTypes } from '../../../../../components/UI/CustomInput/CustomInput'
import ErrorDialog from '../../../../../components/UI/Error/ErrorDialog'
import { setUpSinglePage } from '../../../../../utils/homeFunction'
import './AssignReferee.scss'

const AssignReferee = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [body, setBody] = useState([])
    const [order, setOrder] = useState({
        gameReferee: {
            value: '',
            id: '',
            title: stringFa.refereee,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.assign_refereee_error,
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
            title: stringFa.referee_service,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.assign_referee_service_error,
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
    const editMode = useSelector(state => state.home.editMode)
    const selectedTournament = useSelector(state => state.home.selectedTournament)
    const selectedContent = useSelector(state => state.home.selectedContent)
    const contents = useSelector(state => state.home.contents)


    const onSaveClickHandler = async () => {
        if (!formIsValid) {
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
        console.log(game)
        if (result.success) {
            updatedOrder["gameReferee"].items = [];
            result.data.forEach(element => {
                updatedOrder["gameReferee"].items = [...updatedOrder["gameReferee"].items,
                { text: element.referee.username, id: element.referee._id }]
            });
            if (game.referee)
                updatedOrder["gameReferee"].value = game.referee.username
            updatedOrder["serviceReferee"].items = [];
            result.data.forEach(element => {
                updatedOrder["serviceReferee"].items = [...updatedOrder["serviceReferee"].items,
                { text: element.referee.username, id: element.referee._id }]
            });
            if (game.service_referee)
                updatedOrder["serviceReferee"].value =game.service_referee.username
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
                <Button loading={loading} onClick={() => editMode ? onUpdateClickHandler() : onSaveClickHandler()}>
                    {stringFa.save}
                </Button>
            </div>
        </div>
    )
}

export default AssignReferee
