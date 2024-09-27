import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTournaments } from '../../../api/liveGame'
import { stringFa } from '../../../assets/strings/stringFaCollection'
import Button from '../../../components/UI/Button/Button'
import { elementTypes } from '../../../components/UI/CustomInput/CustomInput'
import ErrorDialog from '../../../components/UI/Error/ErrorDialog'
import { setUpSinglePage } from '../../../utils/homeFunction'

import './AssignLand.scss'
import { useNavigate } from 'react-router-dom'
import { dynamicApi, dynamicGetApi } from '../../../api/home'

const AssignLand = ({ games }) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [tournaments, setTournaments] = useState(null)
    const [gyms, setGyms] = useState(null)

    const [body, setBody] = useState([])
    const [order, setOrder] = useState({
        tournaments: {
            value: '',
            id: '',
            title: stringFa.tournament,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.tournament_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
        },
        gyms: {
            value: '',
            id: '',
            title: stringFa.gym,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.gym_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
        },
        lands: {
            value: '',
            id: '',
            title: stringFa.land_number,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.land_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            listStyle: { maxHeight: 90 }
        }
    })
    const token = useSelector(state => state.auth.token)

    const navigate = useNavigate()

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
        const game = games.find(item => (item.gym_id === order.gyms.id && item.land_number === order.lands.value))
        if (game) {
            navigate(`/scoreboard_view?gameId=${game._id}&gymId=${order.gyms.id}&landNumber=${order.lands.value}`)
        } else {
            navigate(`/wait?tournametId=${order.tournaments.id}&gymId=${order.gyms.id}&landNumber=${order.lands.value}`)
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true)
            let updatedOrder = { ...order }
            let result = await dynamicGetApi(token, 'get_tournaments_to_assing_land')
            if (result.success) {
                setTournaments(result.data.tournaments)
                updatedOrder.tournaments.items = [];
                result.data.tournaments?.reverse().forEach(tournament => {
                    updatedOrder.tournaments.items = [...updatedOrder.tournaments.items,
                    { text: tournament.title, id: tournament._id }]
                });
                setOrder(updatedOrder)
            }
            else {
                setDialog(null)
                setDialog(<ErrorDialog type="error">{result.message}</ErrorDialog>)
            }
            setLoading(false)
        })()
    }, [])
    useEffect(() => {
        if (!tournaments) return;
        (async () => {
            let updatedOrder = { ...order }
            updatedOrder.gyms.items = [];
            updatedOrder.gyms.value = '';
            let tournament = tournaments.find(tournament => tournament._id === order.tournaments.id)
            setGyms(tournament.gyms)
            tournament.gyms.forEach(item => {
                updatedOrder.gyms.items = [...updatedOrder.gyms.items,
                { text: item.gym.title, id: item.gym._id }]
            });
            setOrder(updatedOrder)
        })()

    }, [order.tournaments.id])
    useEffect(() => {
        if (!gyms) return;
        (async () => {
            let updatedOrder = { ...order }
            updatedOrder.lands.items = [];
            updatedOrder.lands.value = '';
            let gym = gyms.find(item => item.gym._id === order.gyms.id)?.gym
            gym.land_numbers.forEach(land => {
                updatedOrder.lands.items = [...updatedOrder.lands.items,
                { text: land.number, id: land._id }]
            });
            setOrder(updatedOrder)
        })()

    }, [order.gyms.id])

    useEffect(() => {
        setUpSinglePage(order, setFormIsValid, setOrder, setBody)
    }, [order])

    return (
        <div className='assign-scoreboard-wrapper'>
            {dialog}
            <div className="input-wrapper">
                {body}
            </div>
            <div className="action-wrapper">
                <Button loading={loading} onClick={onSaveClickHandler}>
                    {stringFa.save}
                </Button>
            </div>
        </div>
    )
}

export default AssignLand
