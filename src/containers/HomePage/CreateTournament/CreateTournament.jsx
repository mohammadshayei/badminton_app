import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createTournament, editTournament } from '../../../api/home'
import { stringFa } from '../../../assets/strings/stringFaCollection'
import Button from '../../../components/UI/Button/Button'
import TransparentButton from '../../../components/UI/Button/TransparentButton/TransparentButton'
import { elementTypes } from '../../../components/UI/CustomInput/CustomInput'
import * as homeActions from "../../../store/actions/home";
import { onChangeMultiPage, setUpMultiPage } from '../../../utils/homeFunction'
import './CreateTournament.scss'
import ErrorDialog from "../../../components/UI/Error/ErrorDialog"

const CreateTournament = (props) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [body, setBody] = useState([])
    // const [checked, setChecked] = useState(false)
    const [page, setPage] = useState('page1')
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState({
        page1: {
            title: {
                value: '',
                title: stringFa.tournament_title,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: stringFa.tournament_title_error,
                invalid: true,
                validation: {
                    required: true,
                    minLength: 2,
                },
                shouldValidate: true,
                isFocused: false,
                touched: false,
                isHalf: false
            },
            periodNumber: {
                value: '',
                title: stringFa.period_number,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: stringFa.period_number_error,
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
            ageRange: {
                value: '',
                title: stringFa.age_ragne,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: stringFa.age_ragne_error,
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
            gamesType: {
                value: '',
                title: stringFa.games_type,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            freeRanking: {
                value: false,
                title: stringFa.free_ranking,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.switchInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            startDate: {
                value: '',
                title: stringFa.start_date,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.datePicker,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            endDate: {
                value: '',
                title: stringFa.end_date,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.datePicker,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },


        },
        page2: {
            supervisor: {
                value: '',
                title: stringFa.supervisor,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true
            },
            grade: {
                value: '',
                title: stringFa.grade,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            executor: {
                value: '',
                title: stringFa.executor,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: false

            },
            rewardType: {
                value: '',
                title: stringFa.reward_type,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            certificate: {
                value: false,
                title: stringFa.certificate,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.switchInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            country: {
                value: '',
                title: stringFa.country,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            province: {
                value: '',
                title: stringFa.province,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            city: {
                value: '',
                title: stringFa.city,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            town: {
                value: '',
                title: stringFa.town,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },

        },
        page3: {
            serviceOptions: {
                value: '',
                title: stringFa.service,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true
            },
            tranportation: {
                value: '',
                title: stringFa.transportation,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            catering: {
                value: false,
                title: stringFa.catering,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.switchInput,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: true

            },
            hotel: {
                value: '',
                title: stringFa.hotel,
                elementConfig: {
                    type: 'text',
                },
                elementType: elementTypes.titleTextarea,
                validationMessage: '',
                invalid: false,
                validation: {
                },
                shouldValidate: false,
                isFocused: false,
                touched: false,
                isHalf: false

            },
        }

    })
    const [dialog, setDialog] = useState(null)
    const refereeId = useSelector(state => state.auth.refereeId)
    const token = useSelector(state => state.auth.token)
    const tournaments = useSelector(state => state.home.tournaments)
    const selectedTournament = useSelector(state => state.home.selectedTournament)

    const dispatch = useDispatch();

    const addTournament = (touranemnt) => {
        dispatch(homeActions.addTournament(touranemnt));
    };
    const updatedStoreTournament = (touranemnt) => {
        dispatch(homeActions.editTournament(touranemnt));
    };
    const setSelectedTournament = (tournamentId) => {
        dispatch(homeActions.setSelectedTournament(tournamentId));
    };



    const onNextClick = () => {
        if (page === 'page1') setPage('page2')
        else if (page === 'page2') setPage('page3')
    }
    const onPreviousClick = () => {
        if (page === 'page3') setPage('page2')
        else if (page === 'page2') setPage('page1')
    }
    const onSaveClick = async () => {
        setDialog(null)
        if (!formIsValid) {
            let updatedOrder = { ...order };
            let updatedPage = { ...updatedOrder.page1 }
            for (let inputIdentifier in updatedPage) {
                updatedPage[inputIdentifier].touched = true;
            }
            updatedOrder.page1 = updatedPage;
            setOrder(updatedOrder)
            return;
        }
        setLoading(true)
        const payload = {
            title: order.page1.title.value,
            period: order.page1.periodNumber.value,
            ageCategory: order.page1.ageRange.value,
            freeRanking: order.page1.freeRanking.value,
            refereeId,
            gameType: order.page1.gamesType.value,
            gameDate: {
                start: order.page1.startDate.value !== '' ? order.page1.startDate.value : null,
                end: order.page1.endDate.value !== '' ? order.page1.endDate.value : null,
            },
            supervisor: order.page2.supervisor.value,
            grade: order.page2.grade.value,
            rewardType: order.page2.rewardType.value,
            certificate: order.page2.certificate.value,
            placeInfo: {
                country: order.page2.country.value,
                province: order.page2.province.value,
                city: order.page2.city.value,
                town: order.page2.town.value,
            },
            options: order.page3.serviceOptions.value,
            transportation: order.page3.tranportation.value,
            catering: order.page3.catering.value,
            hotel: order.page3.hotel.value,
        }
        const result = await createTournament(payload, token)
        if (!result.success) {
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        } else {
            setDialog(<ErrorDialog type="success">با موفقیت ساخته شد</ErrorDialog>)
            addTournament(result.tournament)
            setSelectedTournament(result.tournament._id)
        }
        setLoading(false)
        props.modalClosed()

    }
    const onUpdateClick = async () => {
        setDialog(null)
        setLoading(true)
        const payload = {
            tournamentId: selectedTournament,
            title: order.page1.title.value,
            period: order.page1.periodNumber.value,
            ageCategory: order.page1.ageRange.value,
            freeRanking: order.page1.freeRanking.value,
            gameType: order.page1.gamesType.value,
            gameDate: {
                start: order.page1.startDate.value !== '' ? order.page1.startDate.value : null,
                end: order.page1.endDate.value !== '' ? order.page1.endDate.value : null,
            },
            supervisor: order.page2.supervisor.value,
            grade: order.page2.grade.value,
            rewardType: order.page2.rewardType.value,
            certificate: order.page2.certificate.value,
            placeInfo: {
                country: order.page2.country.value,
                province: order.page2.province.value,
                city: order.page2.city.value,
                town: order.page2.town.value,
            },
            options: order.page3.serviceOptions.value,
            transportation: order.page3.tranportation.value,
            catering: order.page3.catering.value,
            hotel: order.page3.hotel.value,
        }
        const result = await editTournament(payload, token)
        if (!result.success) {
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
            setLoading(false)
        } else {
            setDialog(<ErrorDialog type="success">با موفقیت به روز رسانی شد</ErrorDialog>)
            updatedStoreTournament(result.tournament)
            setSelectedTournament(result.tournament._id)
        }
        setLoading(false)
        props.modalClosed()
    }


    useEffect(() => {
        setUpMultiPage(order, page, setFormIsValid, setOrder, setBody)
    }, [page, order])

    useEffect(() => {
        if (props.editMode) {
            let findedTournament = tournaments.find(item => item.tournament._id === selectedTournament).tournament
            let updatedOrder = { ...order }
            updatedOrder.page1.title.value = findedTournament.title;
            updatedOrder.page1.periodNumber.value = findedTournament.period;
            updatedOrder.page1.ageRange.value = findedTournament.age_category;
            updatedOrder.page1.freeRanking.value = findedTournament.free_ranking;
            updatedOrder.page1.gamesType.value = findedTournament.game_type;
            updatedOrder.page1.startDate.value = findedTournament.game_date.start;
            updatedOrder.page1.endDate.value = findedTournament.game_date.end;

            updatedOrder.page2.supervisor.value = findedTournament.supervisor;
            updatedOrder.page2.grade.value = findedTournament.grade;
            updatedOrder.page2.rewardType.value = findedTournament.reward_type;
            updatedOrder.page2.certificate.value = findedTournament.certificate;
            updatedOrder.page2.country.value = findedTournament.place_info.country;
            updatedOrder.page2.province.value = findedTournament.place_info.province;
            updatedOrder.page2.city.value = findedTournament.place_info.city;
            updatedOrder.page2.town.value = findedTournament.place_info.town;

            updatedOrder.page3.serviceOptions.value = findedTournament.options;
            updatedOrder.page3.tranportation.value = findedTournament.transportation;
            updatedOrder.page3.catering.value = findedTournament.catering;
            updatedOrder.page3.hotel.value = findedTournament.hotel;
            setOrder(updatedOrder)
        }
    }, [props.editMode])
    return (
        <div className='create-container'>
            {dialog}
            <div className='inputs-container'>
                {
                    body
                }
            </div>
            <div className='action-container'>
                {
                    page !== 'page3' &&
                    <TransparentButton
                        buttonClass='next-button'
                        onClick={onNextClick}>
                        {stringFa.next}
                    </TransparentButton>
                }

                <Button
                    loading={loading}
                    onClick={() => props.editMode ? onUpdateClick() : onSaveClick()}
                    buttonClass={`save-button ${props.editMode && 'save-button-large'}`}
                >
                    {props.editMode ? stringFa.save_change : stringFa.save}
                </Button>
                {
                    page !== 'page1' &&
                    <TransparentButton
                        buttonClass='prev-button'
                        onClick={onPreviousClick}
                    >
                        {stringFa.previous}
                    </TransparentButton>
                }
            </div>
        </div>
    )
}

export default CreateTournament
