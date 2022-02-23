import { useCallback, useEffect, useRef, useState } from 'react'
import IMAGE from '../../../../../assets/images/user_avatar.svg'
import { stringFa } from '../../../../../assets/strings/stringFaCollection';
import Button from "../../../../../components/UI/Button/Button";
import './PlayerModal.scss'
import { AiFillCamera } from 'react-icons/ai'
import { elementTypes } from '../../../../../components/UI/CustomInput/CustomInput';
import { setUpSinglePage } from '../../../../../utils/homeFunction';
import { createPlayer, createPlayerWithImage, updatePlayer, updatePlayerWithImage } from '../../../../../api/home';
import { useDispatch, useSelector } from 'react-redux';
import * as homeActions from "../../../../../store/actions/home";
import { baseUrl } from '../../../../../constants/Config';
import ErrorDialog from '../../../../../components/UI/Error/ErrorDialog';

const PlayerModal = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageSrc, setImageSrc] = useState('')
    const [imagePath, setImagePath] = useState('')

    const [body, setBody] = useState([])
    const [order, setOrder] = useState({
        nameFamily: {
            value: '',
            title: stringFa.name_family,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.name_family_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 3,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: false
        },
        teamName: {
            value: '',
            title: stringFa.team_name,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.team_name_error,
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
        nationalNumber: {
            value: '',
            title: stringFa.national_number,
            elementConfig: {
                type: 'text',
                maxLength: 10
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.national_number_player_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 10,
                maxLength: 10,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        birthDate: {
            value: null,
            title: stringFa.birth_data,
            elementType: elementTypes.datePicker,
            validationMessage: '',
            invalid: true,
            validation: {
                bdRequired: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true

        },


    })
    const [dialog, setDialog] = useState(null)
    const selectedTournament = useSelector(state => state.home.selectedTournament)
    const selectedContent = useSelector(state => state.home.selectedContent)
    const contents = useSelector(state => state.home.contents)
    const token = useSelector(state => state.auth.token)
    const editMode = useSelector(state => state.home.editMode)
    const imageRef = useRef(null)
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
    const onChangeImage = (event) => {
        if (event.target.files[0]) {
            setImagePath(event.target.files[0]);
            setImageSrc(URL.createObjectURL(event.target.files[0]));
        }
        else {
            setImageSrc('')
            setImagePath('')
        }
    }
    const uploadButtonClickHandler = useCallback(() => {
        imageRef.current.click();
    }, [])
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
            username: order.nameFamily.value,
            teamName: order.teamName.value,
            nationalNumber: order.nationalNumber.value,
            birthDate: order.birthDate.value,
            tournamentId: selectedTournament,
        }
        let result;
        if (imagePath !== '') {
            payload = { image: imagePath, ...payload }
            result = await createPlayerWithImage(payload, token)
        } else {
            result = await createPlayer(payload, token)
        }
        if (!result.success) {
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        } else {
            setDialog(<ErrorDialog type="success">با موفقیت ساخته شد</ErrorDialog>)
            addContent(result.player, 'player')
        }
        setLoading(false)
        setShowModal(false)

    }
    const onUpdateClickHandler = async () => {
        setLoading(true)
        let payload = {
            username: order.nameFamily.value,
            teamName: order.teamName.value,
            nationalNumber: order.nationalNumber.value,
            birthDate: order.birthDate.value,
            playerId: selectedContent,
        }
        let result;
        if (imagePath !== '') {
            payload = { image: imagePath, ...payload }
            result = await updatePlayerWithImage(payload, token)
        } else {
            result = await updatePlayer(payload, token)
        }
        if (!result.success) {
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        } else {
            setDialog(<ErrorDialog type="success">با موفقیت به روز رسانی شد</ErrorDialog>)
            editContent(result.player, 'player')
        }
        setLoading(false)
        setShowModal(false)

    }
    useEffect(() => {
        setUpSinglePage(order, setFormIsValid, setOrder, setBody)
    }, [order])
    useEffect(() => {
        if (editMode) {
            let findedPlayer = contents.find(item => item.player._id === selectedContent).player
            let updatedOrder = { ...order }
            updatedOrder.nameFamily.value = findedPlayer.username;
            updatedOrder.teamName.value = findedPlayer.team_name;
            updatedOrder.nationalNumber.value = findedPlayer.national_number;
            updatedOrder.birthDate.value = findedPlayer.birth_date;
            if (findedPlayer.image !== '')
                setImageSrc(`${baseUrl}uploads/players/${findedPlayer.image}`)
            setOrder(updatedOrder)
        }
    }, [editMode])
    return (
        <div className='player-modal-wrapper'>
            {dialog}
            <div className="image-wrapper">
                <div className="circle-div" onClick={uploadButtonClickHandler}>
                    <input type="file"
                        style={{ display: 'none' }}
                        ref={imageRef}
                        onChange={onChangeImage} />

                    <img src={imageSrc === '' ? IMAGE : imageSrc} alt="avatar" />
                    <div className="upload-image-wrapper" >
                        <AiFillCamera className='camera' />
                    </div>
                </div>
            </div>
            <div className="input-wrapper">
                {
                    body
                }
            </div>
            <div className="action-wrapper">
                <Button
                    buttonClass={'back-button'}
                    onClick={() => setShowModal(false)}>
                    {stringFa.back}
                </Button>
                <Button
                    loading={loading}
                    onClick={() => editMode ? onUpdateClickHandler() : onSaveClickHandler()}>
                    {editMode ? stringFa.save_change : stringFa.save}
                </Button>


            </div>
        </div>
    )
}

export default PlayerModal
