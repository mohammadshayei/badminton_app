import { useEffect, useState } from "react";
import "./GameModal.scss"
import { elementTypes } from '../../../../../components/UI/CustomInput/CustomInput';
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import { setUpSinglePage } from '../../../../../utils/homeFunction';
import Button from "../../../../../components/UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import * as homeActions from "../../../../../store/actions/home";
import { fetchItems } from '../../../../../api/home';
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog"
import { createGame, updateGame } from '../../../../../api/home';

const GameModal = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [gyms, setGyms] = useState(null)
    const [body, setBody] = useState([])
    const [order, setOrder] = useState({
        gym: {
            value: '',
            id: '',
            title: stringFa.gym,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.gym_title_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        landNumber: {
            value: '',
            title: stringFa.land_numbers,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.land_number_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        date: {
            value: null,
            title: stringFa.date,
            elementType: elementTypes.datePicker,
            validationMessage: stringFa.date_error,
            invalid: true,
            validation: {
                bdRequired: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true

        },
        gameNumber: {
            value: '',
            title: stringFa.number_of_game,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.number_of_game_error,
            invalid: true,
            validation: {
                required: true,
                isNumeric: true
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        competitionType: {
            value: '',
            title: stringFa.competition_type,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.competition_type_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        type: {
            value: '',
            title: stringFa.game_type,
            elementType: elementTypes.radioImageButton,
            double: false,
            validationMessage: '',
            invalid: true,
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        player1: {
            value: '',
            id: '',
            title: stringFa.player1_teamA,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.player1_teamA_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 1,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        player2: {
            value: '',
            id: '',
            title: stringFa.player1_teamB,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.player1_teamB_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 1,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        player3: {
            value: '',
            id: '',
            title: stringFa.player2_teamA,
            elementType: elementTypes.dropDown,
            elementConfig: {
                disabled: false
            },
            dropUp: true,
            items: [],
            validationMessage: stringFa.player2_teamA_error,
            invalid: true,
            validation: {
                required: false,
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        player4: {
            value: '',
            id: '',
            title: stringFa.player2_teamB,
            elementType: elementTypes.dropDown,
            elementConfig: {
                disabled: false
            },
            dropUp: true,
            items: [],
            validationMessage: stringFa.player2_teamB_error,
            invalid: true,
            validation: {
                required: false,
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: true
        },
    })
    const selectedTournament = useSelector(state => state.home.selectedTournament)
    const editMode = useSelector(state => state.home.editMode)
    const token = useSelector(state => state.auth.token)
    const selectedContent = useSelector(state => state.home.selectedContent)
    const contents = useSelector(state => state.home.contents)
    const dispatch = useDispatch();

    const setShowModal = (showModal) => {
        dispatch(homeActions.setShowModal(showModal));
    };
    const editContent = (content, key) => {
        dispatch(homeActions.editContent(content, key));
    };
    const addContent = (content, key) => {
        dispatch(homeActions.addContent(content, key));
    };

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
            competitionType: order.competitionType.value,
            gameType: order.type.double ? "double" : "single",
            gameNumber: order.gameNumber.value,
            gymId: order.gym.id,
            landNumber: order.landNumber.value,
            date: order.date.value,
            teamNameA: "teama",
            playersTeamA: [
                order.player1.id
            ],
            teamNameB: "teamb",
            playersTeamB: [
                order.player2.id
            ],
            tournamentId: selectedTournament
        }
        if (order.type.double)
            payload = {
                ...payload,
                playersTeamA: [...payload.playersTeamA, order.player3.id],
                playersTeamB: [...payload.playersTeamB, order.player4.id],
            }
        let result = await createGame(payload, token)
        if (!result.success) {
            setDialog(null)
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        } else {
            setDialog(null)
            setDialog(<ErrorDialog type="success">با موفقیت انجام شد</ErrorDialog>)
            addContent(result.data, 'game')
            setShowModal(false)
        }
        setLoading(false)
    }

    const onUpdateClickHandler = async () => {
        setLoading(true)
        let payload = {
            competitionType: order.competitionType.value,
            gameType: order.type.double ? "double" : "single",
            gameNumber: `${order.gameNumber.value}`,
            gymId: order.gym.id,
            landNumber: order.landNumber.value,
            date: order.date.value,
            teamNameA: "teama",
            playersTeamA: [
                order.player1.id
            ],
            teamNameB: "teamb",
            playersTeamB: [
                order.player2.id
            ],
            tournamentId: selectedTournament,
            gameId: selectedContent
        }
        if (order.type.double)
            payload = {
                ...payload,
                playersTeamA: [...payload.playersTeamA, order.player3.id],
                playersTeamB: [...payload.playersTeamB, order.player4.id],
            }
        let result = await updateGame(payload, token)
        if (!result.success) {
            setDialog(null)
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        } else {
            setDialog(null)
            setDialog(<ErrorDialog type="success">با موفقیت انجام شد</ErrorDialog>)
            addContent(result.data, 'game')
            setShowModal(false)
        }
        setLoading(false)
    }

    const getItems = async (key) => {
        let updatedOrder = { ...order }
        let result = await fetchItems(selectedTournament, token, key)
        if (result.success) {
            if (key === "gyms") {
                setGyms(result.data);
                updatedOrder["gym"].items = [];
                result.data.forEach(element => {
                    updatedOrder["gym"].items = [...updatedOrder["gym"].items,
                    { text: element.gym.title, id: element.gym._id }]
                });
            }
            else if (key === "players") {
                [...Array(4)].forEach((element, i) => {
                    result.data.forEach((player) => {
                        updatedOrder[`player${i + 1}`].items =
                            [...updatedOrder[`player${i + 1}`].items,
                            { text: player.player.username, id: player.player._id }]
                    })
                })
            }
            setOrder(updatedOrder)
        } else {
            setDialog(null)
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        }
    }

    useEffect(() => {
        setLoading(true)
        getItems("gyms")
        getItems("players")
        setLoading(false)
    }, []);

    useEffect(() => {
        if (gyms) {
            let updatedOrder = { ...order }
            gyms.forEach(element => {
                if (element.gym.title === order.gym.value) {
                    element.gym.land_numbers.forEach(land => {
                        updatedOrder.landNumber.items =
                            [...updatedOrder.landNumber.items, { text: land.number, id: "0" }]
                    });
                }
            });
            setOrder(updatedOrder)
        }
    }, [order.gym.value])

    useEffect(() => {
        let updatedOrder = { ...order }
        if (order.type.double) {
            updatedOrder.player3.elementConfig.disabled = false;
            updatedOrder.player4.elementConfig.disabled = false;
            updatedOrder.player3.required = true;
            updatedOrder.player4.required = true;
            updatedOrder.player3.shouldValidate = true;
            updatedOrder.player4.shouldValidate = true;
        }
        else {
            updatedOrder.player3.elementConfig.disabled = true;
            updatedOrder.player4.elementConfig.disabled = true;
            updatedOrder.player3.required = false;
            updatedOrder.player4.required = false;
            updatedOrder.player3.shouldValidate = false;
            updatedOrder.player4.shouldValidate = false;
        }
        setOrder(updatedOrder)
    }, [order.type.double])


    useEffect(() => {
        setUpSinglePage(order, setFormIsValid, setOrder, setBody)
    }, [order])

    useEffect(() => {
        if (editMode && gyms) {
            let foundedGame = contents.find(item => item.game._id === selectedContent).game
            let updatedOrder = { ...order }
            order.competitionType.value = foundedGame.competition_type
            gyms.forEach(gym => {
                if (gym.gym._id === foundedGame.gym_id) {
                    updatedOrder.gym.value = gym.gym.title;
                    updatedOrder.gym.id = gym.gym._id;
                }
            });
            updatedOrder.landNumber.value = foundedGame.land_number;
            updatedOrder.date.value = foundedGame.date;
            // updatedOrder.time.value = foundedGame.time;
            updatedOrder.gameNumber.value = foundedGame.game_number;
            updatedOrder.type.double = foundedGame.game_type === "single" ? false : true;
            foundedGame.teamA.players.forEach((player, i) => {
                if (i === 0) {
                    updatedOrder.player1.value = player.player.username;
                    updatedOrder.player1.id = player.player._id
                }
                else if (i === 1) {
                    updatedOrder.player3.value = player.player.username;
                    updatedOrder.player3.id = player.player._id
                }
            });
            foundedGame.teamB.players.forEach((player, i) => {
                if (i === 0) {
                    updatedOrder.player2.value = player.player.username;
                    updatedOrder.player2.id = player.player._id
                }
                else if (i === 1) {
                    updatedOrder.player4.value = player.player.username;
                    updatedOrder.player4.id = player.player._id
                }
            });
            setOrder(updatedOrder)
        }
    }, [gyms])

    return (
        <div className='gym-modal-wrapper'>
            {dialog}
            <div className="input-wrapper">
                {body}
            </div>
            <div className="action-wrapper">
                <Button
                    buttonClass={'back-button'}
                    onClick={() => setShowModal(false)}>
                    {stringFa.back}
                </Button>
                <Button loading={loading} onClick={() => editMode ? onUpdateClickHandler() : onSaveClickHandler()}>
                    {editMode ? stringFa.save_change : stringFa.save}
                </Button>
            </div>
        </div>
    )
}

export default GameModal
