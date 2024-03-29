
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


const PlayerForm = ({ teamMode, itemLoading, createAccess, onUpdateItem, onAddItem, content, tournamentId, onBack, setShowInputForm, removeLoading, onRemoveItemFromTournament }) => {
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
            hidden: true,
        },
        firstName: {
            value: '',
            title: stringFa.first_name,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.frist_name_error,
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
        lastName: {
            value: '',
            title: stringFa.last_name,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.last_name_error,
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
        nationality: {
            value: '',
            title: stringFa.nationality,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.nationality_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 1,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            hidden: false,
        },
        sex: {
            value: 'مرد',
            title: stringFa.sex,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.sex_error,
            invalid: false,
            validation: {
                required: true,
                minLength: 2,
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
        team: {
            value: '',
            title: stringFa.team,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.dropDown,
            invalid: true,
            validation: {
                required: true
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            hidden: false,
            id: '',
            items: [],


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
    const [filteredOrder, setFilteredOrder] = useState({});
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
                username: `${order.firstName.value} ${order.lastName.value}`,
                firstName: order.firstName.value,
                lastName: order.lastName.value,
                nationality: order.nationality.value,
                sex: order.sex.value,
                playerId: content._id,
                teamId: order.team.id,
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
                onUpdateItem({ _id: content._id, username: `${order.firstName.value} ${order.lastName.value}`, selected: true })
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
                username: `${order.firstName.value} ${order.lastName.value}`,
                firstName: order.firstName.value,
                lastName: order.lastName.value,
                sex: order.sex.value,
                nationality: order.nationality.value,
                teamId: order.team.id,
                nationalNumber: order.id.value,
                birthDate: new Date(order.birthDate.value),
                tournamentId,
            }
            let created = await
                formDataDynamic(imagePath, payload, token, 'create_player')
            setDialog(
                <ErrorDialog
                    type={created.success ? 'success' : "error"}
                >{created.data.message}</ErrorDialog>)
            if (created.success) {
                onAddItem({
                    _id: created.data.player,
                    username: `${order.firstName.value} ${order.lastName.value}`,
                    selected: true
                })
                if (window.innerWidth < 780)
                    setShowInputForm(false)
                clear()
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

        updatedOrder.firstName.invalid = true;
        updatedOrder.firstName.value = '';

        updatedOrder.lastName.invalid = true;
        updatedOrder.lastName.value = '';

        updatedOrder.sex.invalid = false;
        updatedOrder.sex.value = 'مرد';

        updatedOrder.nationality.invalid = true;
        updatedOrder.nationality.value = '';

        updatedOrder.birthDate.value = '';
        updatedOrder.birthDate.invalid = true;

        updatedOrder.team.invalid = true;
        if (teamMode) {
            updatedOrder.team.value = '';
            updatedOrder.team.id = '';
            updatedOrder.team.hidden = false;
        } else {
            updatedOrder.team.hidden = true;
        }

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

            updatedOrder.firstName.invalid = false;
            updatedOrder.firstName.value = content.firstName;

            updatedOrder.lastName.invalid = false;
            updatedOrder.lastName.value = content.lastName;

            updatedOrder.nationality.invalid = false;
            updatedOrder.nationality.value = content.nationality;

            updatedOrder.sex.invalid = false;
            updatedOrder.sex.value = content.sex;

            updatedOrder.birthDate.value = content.birth_date;
            updatedOrder.birthDate.invalid = false;

            updatedOrder.team.invalid = false;
            if (teamMode && content.team) {
                updatedOrder.team.value = content.team.name;
                updatedOrder.team.id = content.team._id;
                updatedOrder.team.hidden = false;
            } else {
                updatedOrder.team.hidden = true;
            }
            setOrder(updatedOrder)
        } else {
            clear()
        }
    }, [content, teamMode])

    useEffect(() => {
        if (!tournamentId) return;
        (async () => {
            try {
                setTeamLoading(true)
                let fetchedItems = await dynamicApi({ id: tournamentId }, token, 'get_teams')
                if (!fetchedItems.success) {
                    setDialog(<ErrorDialog type="error">{fetchedItems.data.message}</ErrorDialog>)
                    return;
                }
                let updatedOrder = { ...order }
                updatedOrder.team.items = [...fetchedItems.data.teams.map(item => {
                    return {
                        text: item.team.name, id: item.team._id
                    }
                })]
                setOrder(updatedOrder)
            } catch (error) {
                setTeamLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setTeamLoading(false)
        })()
    }, [tournamentId])

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

    useEffect(() => {
        let updatedFilteredOrder = {}
        for (const key in order) {
            if (!order[key].hidden) updatedFilteredOrder = { ...updatedFilteredOrder, [key]: order[key] }
        }
        setFilteredOrder(updatedFilteredOrder)
    }, [order]);

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
                order={filteredOrder}
                setOrder={setFilteredOrder}
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
                                onClick={() => onRemoveItemFromTournament(content._id)}
                                loading={removeLoading}
                            >
                                {stringFa.remove_from_tournament}
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

export default PlayerForm;
