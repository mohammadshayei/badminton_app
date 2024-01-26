/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import InputForm from "../../../../components/UI/InputForm/InputForm";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import { RiArrowLeftSLine } from 'react-icons/ri'
import { AiFillCamera } from 'react-icons/ai'
import PROFILE_IMAGE from "../../../../assets/images/user_avatar.svg";
import { useSelector } from "react-redux";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton";
import ErrorDialog from "../../../../components/UI/Error/ErrorDialog";
import { dynamicApi, formDataDynamic } from "../../../../api/home";
import { baseUrl } from "../../../../constants/Config";


const TeamPlayerForm = ({ teamId, itemLoading, createAccess,
    onUpdateItem, onAddItem,
    content, onBack, setShowInputForm,
    removeLoading, onPlayerItemFromTeam }) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        username: {
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
            hidden: false,
        },
        id: {
            value: '',
            title: stringFa.national_number,
            elementConfig: {
                type: 'text',
                maxLength: 10,
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.national_number_error,
            invalid: true,
            validation: {
                required: true,
                isNumeric: true,
                minLength: 10,
                maxLength: 10,

            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            hidden: false,
            changed: false,
            url: "search_player_national_number",
            payloadKey: "nationalNumber",
            minLen: 10,
            checkNeeded: false,
            status: 0,
        },
        birthDate: {
            value: '',
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
        },
    })
    const [imageSrc, setImageSrc] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [teamLoading, setTeamLoading] = useState(false)
    const [changed, setChanged] = useState(false)


    const { token, user } = useSelector(state => state.auth)

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const imageRef = useRef(null)

    const uploadButtonClickHandler = useCallback(() => {
        imageRef.current.click();
    }, [])

    const onChangeImage = (event) => {
        if (event.target.files[0]) {
            setImageSrc(URL.createObjectURL(event.target.files[0]));
            setImagePath(event.target.files[0])
        }
    }

    const onSaveChange = async () => {
        setLoading(true)
        setDialog(null);
        try {
            let payload = {
                username: order.username.value,
                playerId: content._id,
                teamId: teamId,
                nationalNumber: order.id.value,
                birthDate: new Date(order.birthDate.value),
            }
            let result = await
                formDataDynamic(imagePath, payload, token, 'edit_player')
            setDialog(
                <ErrorDialog
                    type={result.success ? 'success' : "error"}
                >{result.data.message}</ErrorDialog>)
            if (result.success) {
                onUpdateItem({ _id: content._id, username: order.username.value, selected: true })
                if (window.innerWidth < 780)
                    onBack()
            }

        } catch (error) {
            setLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setLoading(false)
        setChanged(false)
    }
    const onSave = async () => {
        setLoading(true)
        setDialog(null);
        try {
            let payload = {
                username: order.username.value,
                teamId,
                nationalNumber: order.id.value,
                birthDate: new Date(order.birthDate.value),
            }
            let created = await
                formDataDynamic(imagePath, payload, token, 'create_team_player')
            setDialog(
                <ErrorDialog
                    type={created.success ? 'success' : "error"}
                >{created.data.message}</ErrorDialog>)
            if (created.success) {
                onAddItem({
                    _id: created.data.player,
                    username: order.username.value,
                    selected: true
                })
                if (window.innerWidth < 780)
                    setShowInputForm(false)
                // clear()
            }
        } catch (error) {
            setLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setLoading(false)
        setChanged(false)

    }

    const clear = () => {
        setFormIsValid(false)
        setImageSrc('')
        let updatedOrder = { ...order }
        updatedOrder.id.invalid = true;
        updatedOrder.id.value = '';

        updatedOrder.username.invalid = true;
        updatedOrder.username.value = '';

        updatedOrder.birthDate.value = '';
        updatedOrder.birthDate.invalid = true;

        setOrder(updatedOrder)
    }

    useLayoutEffect(() => {
        setImageSrc('')
        if (content) {
            setFormIsValid(true)
            if (content.image)
                setImageSrc(`${baseUrl}uploads/players/${content.image}`)
            let updatedOrder = { ...order }
            updatedOrder.id.value = content.national_number;
            updatedOrder.id.invalid = false;

            updatedOrder.username.value = content.username;
            updatedOrder.username.invalid = false;

            updatedOrder.birthDate.value = content.birth_date;
            updatedOrder.birthDate.invalid = false;

            setOrder(updatedOrder)
        } else {
            clear()
        }
    }, [content])

    useEffect(() => {
        if (!order.id.checkNeeded) return;
        if (order.id.value.length < order.id.minLen) return;
        setDialog(null);
        let updatedOrder = { ...order };
        (async () => {
            try {
                let result = await dynamicApi({
                    [order.id.payloadKey]: order.id.value
                }, token, order.id.url)
                if (!result.success)
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)

                if (result.data.exist) {
                    updatedOrder.id.status = 2;
                    setFormIsValid(false)
                }
                else
                    updatedOrder.id.status = 1;

                updatedOrder.id.checkNeeded = false;
                updatedOrder.id.changed = false;

            } catch (error) {
                updatedOrder.id.checkNeeded = false;
                updatedOrder.id.changed = false;
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setOrder(updatedOrder)

        })()
    }, [order.id.checkNeeded])


    return (
        <div className="input-wrapper">
            {dialog}
            <div
                className="back-section"
                onClick={onBack}
            >
                <RiArrowLeftSLine />
            </div>
            <div className="profile-avatar" onClick={uploadButtonClickHandler}>
                <input type="file"
                    style={{ display: 'none' }}
                    ref={imageRef}
                    onChange={onChangeImage} />
                <img
                    src={imageSrc ? imageSrc : PROFILE_IMAGE}
                    alt="avatar" loading="lazy" />
                <div className="upload-image-wrapper" >
                    <AiFillCamera className='camera' />
                </div>
            </div>
            <InputForm
                order={order}
                setOrder={setOrder}
                setFormIsValid={setFormIsValid}
                itemLoading={itemLoading}
                createAccess={createAccess}
                setChanged={setChanged}
            />
            {
                createAccess &&
                <div className="buttons-wrapper">
                    <Button
                        loading={loading}
                        // onClick={onSaveClick}
                        onClick={() => {
                            if (content) onSaveChange()
                            else onSave()
                        }}
                        config={{ disabled: !formIsValid || !changed }}
                    >
                        {
                            content ? stringFa.save_change : stringFa.save
                        }
                    </Button>
                    {
                        content ?
                            <Button
                                back={theme.error}
                                hover={theme.error_variant}
                                onClick={() => onPlayerItemFromTeam(content._id)}
                                loading={removeLoading}
                            >
                                {stringFa.remove_player_from_team}
                            </Button> :
                            <TransparentButton
                                onClick={() => { setShowInputForm(false) }}
                            >
                                {stringFa.cancel}
                            </TransparentButton>
                    }

                </div>
            }
        </div>
    )
};

export default TeamPlayerForm;
