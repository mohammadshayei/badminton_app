/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import "./RefereeForm.scss"
import InputForm from "../../../../components/UI/InputForm/InputForm";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { RiArrowLeftSLine } from 'react-icons/ri'
import { AiFillCamera } from 'react-icons/ai'
import PROFILE_IMAGE from "../../../../assets/images/avatars/default-avatar.png";
import { useSelector } from "react-redux";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton";
import ErrorDialog from "../../../../components/UI/Error/ErrorDialog";
import { dynamicApi, formDataDynamic } from "../../../../api/home";
import { baseUrl } from "../../../../constants/Config";


const RefereeForm = ({ content, onBack, removeLoading, onRemoveItemFromTournament }) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        username: {
            value: '',
            title: stringFa.name_family,
            elementConfig: {
                type: 'text',
                disabled: true
            },
            elementType: elementTypes.titleInput,
            invalid: false,
            validation: {
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,
        },
        id: {
            value: '',
            title: stringFa.national_number,
            elementConfig: {
                type: 'text',
                disabled: true
            },
            elementType: elementTypes.titleInput,
            invalid: false,
            validation: {
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,
        },
        phone: {
            value: '',
            title: stringFa.phone,
            elementConfig: {
                type: 'text',
                disabled: true
            },
            elementType: elementTypes.titleInput,
            invalid: false,
            validation: {
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,
        },

    })
    const [imageSrc, setImageSrc] = useState('')
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    useLayoutEffect(() => {
        setImageSrc('')
        if (content) {
            setFormIsValid(true)
            if (content.image)
                setImageSrc(`${baseUrl}uploads/users/${content.image}`)
            let updatedOrder = { ...order }
            updatedOrder.id.value = content.national_number;
            updatedOrder.username.value = content.username;
            updatedOrder.phone.value = content.phone;
            setOrder(updatedOrder)
        }
    }, [content])

    return (
        <div className="player-wrapper">
            <div
                className="back-section"
                onClick={onBack}
            >
                <RiArrowLeftSLine />
            </div>
            <div className="profile-avatar" >
                <img
                    src={imageSrc ? imageSrc : PROFILE_IMAGE}
                    alt="avatar" />
            </div>
            <InputForm
                order={order}
                setOrder={setOrder}
                setFormIsValid={setFormIsValid}
            />
            {content &&
                <div className="buttons-wrapper">
                    <Button
                        back={theme.error}
                        hover={theme.error_variant}
                        onClick={() => onRemoveItemFromTournament(content._id)}
                        loading={removeLoading}
                    >
                        {stringFa.remove_from_tournament}
                    </Button>

                </div>
            }
        </div>
    )
};

export default RefereeForm;
