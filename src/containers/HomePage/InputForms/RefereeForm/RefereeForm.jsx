/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useLayoutEffect } from "react";
import InputForm from "../../../../components/UI/InputForm/InputForm";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import { RiArrowLeftSLine } from 'react-icons/ri'
import PROFILE_IMAGE from "../../../../assets/images/user_avatar.svg";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import { baseUrl } from "../../../../constants/Config";
import { useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";

const RefereeForm = ({ itemLoading, creator, createAccess, content, onBack, removeLoading, onRemoveItemFromTournament }) => {
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
    const { user } = useSelector(state => state.auth)

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
        <div className="input-wrapper">
            <div
                className="back-section"
                onClick={onBack}
            >
                {window.innerWidth > 780 ? <IoCloseOutline /> : <RiArrowLeftSLine />}
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
                itemLoading={itemLoading}
                createAccess={false}
            />
            {creator === user?._id && content &&
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
