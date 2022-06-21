import { useCallback, useEffect, useRef, useState } from "react";
import "./ProfilePage.scss";
import { useTheme } from "../../styles/ThemeProvider";
import AppBar from "../HomePage/AppBar/AppBar";
import Modal from "../../components/UI/Modal/Modal";
import * as detailActions from "../../store/actions/detail";
import * as authActions from "../../store/actions/auth";

import { useDispatch, useSelector } from "react-redux";
import Menu from '../Menu/Menu';
import CreateTournament from "../HomePage/CreateTournament/CreateTournament";
import PROFILE_IMAGE from "../../assets/images/avatars/default-avatar.png";
import { stringFa } from "../../assets/strings/stringFaCollection";
import { setUpSinglePage } from "../../utils/homeFunction";
import { baseUrl } from "../../constants/Config";
import { AiFillCamera } from 'react-icons/ai'
import Button from "../../components/UI/Button/Button";
import { elementTypes } from "../../components/UI/CustomInput/CustomInput";
import { changeRefereePassword, editReferee, uploadRefereeImage } from "../../api/home";
import ErrorDialog from "../../components/UI/Error/ErrorDialog";

const HomePage = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [body, setBody] = useState([])
    const [loading, setLoading] = useState(false)
    const [imageSrc, setImageSrc] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [dialog, setDialog] = useState(null);
    const [changePassword, setChangePassword] = useState(false);

    const auth = useSelector(state => state.auth);
    const [order, setOrder] = useState({
        userName: {
            value: '',
            title: stringFa.username,
            elementConfig: {
                placeholder: stringFa.username,
                type: 'text',
                disabled: !auth.referee && true
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.username_error,
            invalid: true,
            shouldValidate: true,
            validation: {
                required: true,
                minLength: 3,
            },
            isFocused: false,
            touched: false,
            hidden: false,
        },
        phone: {
            value: '',
            title: stringFa.phone,
            elementType: elementTypes.titleInput,
            elementConfig: {
                placeholder: stringFa.phone,
                type: 'text',
                pattern: "\d*",
                maxLength: 11,
                disabled: true
            },
            validationMessage: stringFa.phone_error,
            invalid: false,
            validation: null,
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,
        },
        nationalId: {
            value: '',
            title: stringFa.national_number,
            elementConfig: {
                placeholder: stringFa.national_number,
                type: 'text',
                maxLength: 10,
                disabled: true
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.national_number_error,
            invalid: true,
            shouldValidate: false,
            validation: null,
            isFocused: false,
            touched: false,
            hidden: false,
        },
        password: {
            value: '',
            title: stringFa.password,
            elementConfig: {
                placeholder: stringFa.password,
                type: 'password',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.password_error,
            invalid: true,
            shouldValidate: true,
            validation: {
                required: true,
                minLength: 6,
            },
            isFocused: false,
            touched: false,
            hidden: true,
        },
    })
    const [filteredOrder, setFilteredOrder] = useState({});

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const imageRef = useRef(null)
    const dispatch = useDispatch();
    const setMenuStatus = (status) => {
        dispatch(detailActions.setMenuStatus(status));
    };
    const changeUserInfo = (payload) => {
        dispatch(authActions.changeUserInfo(payload));
    };

    const uploadButtonClickHandler = useCallback(() => {
        imageRef.current.click();
    }, [])

    const onChangeImage = async (event) => {
        if (event.target.files[0]) {
            setImageSrc(URL.createObjectURL(event.target.files[0]));
            let payload = { image: event.target.files[0], id: auth.refereeId }
            let result = await uploadRefereeImage(payload, auth.token)
            setDialog(<ErrorDialog type={result.success ? "success" : "error"}>{result.result.message}</ErrorDialog>)
            if (result.success)
                changeUserInfo({ key: 'image', value: result.result.path })

        }
        // else {
        //     setImageSrc('')
        //     setImagePath('')
        // }
    }

    const onUpdateClickHandler = async () => {
        try {
            setDialog(null)
            setLoading(true)
            if (changePassword) {
                let payload = {
                    password: order.password.value,
                    refereeId: auth.refereeId,
                }
                let result = await changeRefereePassword(payload, auth.token);
                setDialog(<ErrorDialog type={result.success ? 'success' : "error"}>{result.message}</ErrorDialog>)
                setChangePassword(false)
            } else {
                let payload = {
                    username: order.userName.value,
                    refereeId: auth.refereeId,
                }
                let result = await editReferee(payload, auth.token);
                setDialog(<ErrorDialog type={result.success ? 'success' : "error"}>{result.data.message}</ErrorDialog>)

                if (result.success)
                    changeUserInfo({ key: 'username', value: order.userName.value })


            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setDialog(<ErrorDialog type={"error"}>{stringFa.error_occured}</ErrorDialog>)
        }
    }

    useEffect(() => {
        setUpSinglePage(filteredOrder, setFormIsValid, setFilteredOrder, setBody)
    }, [filteredOrder])

    useEffect(() => {
        if (auth.referee) {
            let updatedOrder = { ...order }
            updatedOrder.userName.value = auth.referee.username;
            updatedOrder.userName.elementConfig.disabled = false;
            updatedOrder.phone.value = auth.referee.phone;
            updatedOrder.nationalId.value = auth.referee.national_number;
            if (auth.referee.image !== '')
                setImageSrc(`${baseUrl}uploads/referees/${auth.referee.image}`)
            setOrder(updatedOrder)
        }
    }, [auth.referee])

    useEffect(() => {
        let updatedOrder = { ...order }
        updatedOrder.password.hidden = !changePassword;
        updatedOrder.userName.hidden = changePassword;
        updatedOrder.phone.hidden = changePassword;
        updatedOrder.nationalId.hidden = changePassword;
        setOrder(updatedOrder)
    }, [changePassword])

    useEffect(() => {
        let updatedFilteredOrder = {}
        for (const key in order) {
            if (!order[key].hidden) updatedFilteredOrder = { ...updatedFilteredOrder, [key]: order[key] }
        }
        setFilteredOrder(updatedFilteredOrder)
    }, [order]);

    return (
        <div
            className="profile-page-wrapper"
            style={{
                background: `linear-gradient(210deg,${theme.primary},${theme.primary_variant})`,
                color: theme.on_primary,
            }}
        >
            {dialog}
            <div className="menu-icon" onClick={() => setMenuStatus(true)}>
                <i
                    style={{ color: theme.on_primary }}
                    className="fas fa-bars"
                />
            </div>
            <Menu
                setShowModal={setShowModal}
            />
            <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                <CreateTournament modalClosed={() => setShowModal(false)} />
            </Modal>
            <AppBar
                setShowModal={setShowModal}
            />
            <div className="profile-card"
                style={{
                    backgroundColor: theme.background_color,
                    color: theme.on_background
                }}
            >
                <div disabled={!auth.referee && true} className="profile-avatar" onClick={uploadButtonClickHandler}>
                    <input type="file"
                        style={{ display: 'none' }}
                        ref={imageRef}
                        onChange={onChangeImage} />
                    <img
                        className={`${!auth.referee && "loading"}`}
                        src={imageSrc === '' ? PROFILE_IMAGE : imageSrc}
                        alt="avatar" />
                    <div className="upload-image-wrapper" >
                        <AiFillCamera className='camera' />
                    </div>
                </div>
                <div className={`input-wrapper ${!auth.referee && "loading"}`}>
                    {body}
                </div>
                <div className="buttons-wrapper">
                    <Button
                        onClick={() => setChangePassword(!changePassword)}
                        config={{ disabled: !auth.referee && true }}
                    >
                        {changePassword ? stringFa.cancel : stringFa.change_password}
                    </Button>
                    <Button
                        loading={loading}
                        onClick={() => onUpdateClickHandler()}
                        config={{ disabled: !formIsValid }}
                    >
                        {stringFa.save_change}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
