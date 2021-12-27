import { useCallback, useEffect, useRef, useState } from 'react'
import IMAGE from '../../../../../assets/images/user_avatar.svg'
import { stringFa } from '../../../../../assets/strings/stringFaCollection';
import Button from "../../../../../components/UI/Button/Button";
import './GymModal.scss'
import { AiFillCamera } from 'react-icons/ai'
import { elementTypes } from '../../../../../components/UI/CustomInput/CustomInput';
import { setUpSinglePage } from '../../../../../utils/homeFunction';
import { addGym, updateGym } from '../../../../../api/home';
import { useDispatch, useSelector } from 'react-redux';
import * as homeActions from "../../../../../store/actions/home";
import { baseUrl } from '../../../../../constants/Config';

const GymModal = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [body, setBody] = useState([])
    const [order, setOrder] = useState({
        gymTitle: {
            value: '',
            title: stringFa.gym_title,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.gym_title_error,
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
        capacity: {
            value: '',
            title: stringFa.capacity,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: '',
            invalid: true,
            validation: {

            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        landCount: {
            value: '',
            title: stringFa.land_count,
            elementConfig: {
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.land_count_error,
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
        landNumbers: {
            value: [],
            title: stringFa.land_numbers,
            count: 0,
            elementType: elementTypes.multiInputTitle,
            validationMessage: stringFa.land_numbers_error,
            invalid: true,
            validation: {

            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: false
        },
        optionsSituation: {
            value: '',
            title: stringFa.options_situation,
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.land_numbers_error,
            invalid: true,
            validation: null,
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: false
        },
        address: {
            value: '',
            title: stringFa.address,
            elementType: elementTypes.titleTextarea,
            validationMessage: stringFa.address_error,
            invalid: true,
            validation: null,
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: false
        },

    })
    const selectedTournament = useSelector(state => state.home.selectedTournament)
    const selectedContent = useSelector(state => state.home.selectedContent)
    const contents = useSelector(state => state.home.contents)
    const token = useSelector(state => state.auth.token)
    const editMode = useSelector(state => state.home.editMode)
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
            }
            setOrder(updatedOrder)
            return;
        }
        setLoading(true)
        let payload = {
            title: order.gymTitle.value,
            landCount: order.landCount.value,
            landNumbers: order.landNumbers.value,
            capacity: order.capacity.value,
            options: order.optionsSituation.value,
            address: order.address.value,
            tournamentId: selectedTournament,
        }
        let result = await addGym(payload, token)
        if (!result.success) {
            alert(result.error)
        } else {
            alert('با موفقیت ساخته شد')
            addContent(result.data, 'gym')
        }
        setLoading(false)
        setShowModal(false)
    }
    const onUpdateClickHandler = async () => {
        setLoading(true)
        let payload = {
            title: order.gymTitle.value,
            landCount: order.landCount.value,
            landNumbers: order.landNumbers.value,
            capacity: order.capacity.value,
            options: order.optionsSituation.value,
            address: order.address.value,
            tournamentId: selectedTournament,
            gymId: selectedContent
        }

        let result = await updateGym(payload, token)
        if (!result.success) {
            alert(result.error)
        } else {
            alert('با موفقیت به روز رسانی شد')
            editContent(result.data, 'gym')
        }
        setLoading(false)
        setShowModal(false)
    }
    useEffect(() => {
        setUpSinglePage(order, setFormIsValid, setOrder, setBody)
    }, [order])
   
    useEffect(() => {
        if (editMode) {
            let findedGym = contents.find(item => item.gym._id === selectedContent).gym
            let updatedOrder = { ...order }
            console.log(findedGym.land_numbers.map(item => item.number))
            updatedOrder.gymTitle.value = findedGym.title;
            updatedOrder.landCount.value = findedGym.land_count;
            updatedOrder.landNumbers.count=findedGym.land_count;
            updatedOrder.landNumbers.value = findedGym.land_numbers.map(item => item.number);
            updatedOrder.capacity.value = findedGym.capacity;
            updatedOrder.optionsSituation.value = findedGym.options;
            updatedOrder.address.value = findedGym.address;
            setOrder(updatedOrder)
        }
    }, [editMode])
    return (
        <div className='gym-modal-wrapper'>
            <div className="input-wrapper">
                {
                    body
                }
            </div>
            <div className="action-wrapper">
                <Button onClick={() => editMode ? onUpdateClickHandler() : onSaveClickHandler()}>
                    {editMode ? stringFa.save_change : stringFa.save}
                </Button>

            </div>
        </div>
    )
}

export default GymModal
