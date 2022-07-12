/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useCallback, useEffect, useLayoutEffect } from "react";
import InputForm from "../../../../components/UI/InputForm/InputForm";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import TEAM_IMAGE from '../../../../assets/images/team_avatar.png';
import { AiFillCamera } from 'react-icons/ai'
import { baseUrl } from "../../../../constants/Config";
import { dynamicApi, formDataDynamic } from "../../../../api/home";
import { useSelector } from "react-redux";
import ErrorDialog from "../../../../components/UI/Error/ErrorDialog";
import Button from "../../../../components/UI/Button/Button";
import { useTheme } from "../../../../styles/ThemeProvider";
import { RiArrowLeftSLine } from 'react-icons/ri'
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton";
import { IoCloseOutline } from "react-icons/io5";

const TeamForm = ({ itemLoading, createAccess, onUpdateItem, onBack, content, removeLoading, tournamentId, setShowInputForm, onAddItem, onRemoveItemFromTournament }) => {
    const [formIsValid, setFormIsValid] = useState(true)
    const [order, setOrder] = useState({
        ownerName: {
            value: '',
            title: stringFa.owner_name,
            elementConfig: {
                type: 'text',
                disabled: true
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.name_family_error,
            invalid: false,
            validation: {
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,
        },
        ownerPhoneId: {
            value: '',
            title: stringFa.owner_phone_id,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.name_family_error,
            invalid: false,
            validation: {
                required: true,
                isNumeric: true,
                minLength: 10
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            hidden: false,
            changed: false,
            url: "search_by_nationalnumber_phone",
            payloadKey: "input",
            minLen: 10,
            checkNeeded: false,
            status: 0,
        },
        ownerPhone: {
            value: '',
            title: stringFa.owner_phone,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.name_family_error,
            invalid: false,
            validation: {
                isNumeric: true,
                required: true,
                minLength: 11
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,

            changed: false,
            url: "search_by_nationalnumber_phone",
            payloadKey: "input",
            checkNeeded: false,
            minLen: 11,
            status: 0,

        },
        ownerId: {
            value: '',
            title: stringFa.owner_nm,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.name_family_error,
            invalid: false,
            validation: {
                required: true,
                isNumeric: true,
                minLength: 10
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,
            changed: false,
            url: "search_by_nationalnumber_phone",
            payloadKey: "input",
            checkNeeded: false,
            minLen: 10,
            status: 0,
        },
        teamName: {
            value: '',
            title: stringFa.team_name,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.name_family_error,
            invalid: false,
            validation: {
                required: true,
                minLength: 2,
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,
            changed: false,
            url: "search_team_name",
            payloadKey: "name",
            checkNeeded: false,
            status: 0,
            minLen: 2,
        },
        teamCode: {
            value: '',
            title: stringFa.team_code,
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
        legalOwnerName: {
            value: '',
            title: stringFa.legal_owner_name,
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
        legalOwnerPhone: {
            value: '',
            title: stringFa.legal_owner_phone,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            invalid: false,
            validation: {
                isNumeric: true,
                minLength: 11
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            hidden: false,
            changed: false,
            url: "search_by_nationalnumber_phone",
            payloadKey: "input",
            checkNeeded: false,
            minLen: 11,
            status: 0,
        },
        legalOwnerId: {
            value: '',
            title: stringFa.legal_owner_nm,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            invalid: false,
            validation: {
                isNumeric: true,
                minLength: 10
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            hidden: false,
            changed: false,
            url: "search_by_nationalnumber_phone",
            payloadKey: "input",
            checkNeeded: false,
            minLen: 10,
            status: 0,
        },
        legalOwnerPhoneId: {
            value: '',
            title: stringFa.legal_owner_phone_id,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.name_family_error,
            invalid: false,
            validation: {
                isNumeric: true,
                minLenght: 10,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            hidden: false,
            changed: false,
            url: "search_by_nationalnumber_phone",
            payloadKey: "input",
            minLength: 10,
            checkNeeded: false,
            status: 0,
        },
        address: {
            value: '',
            title: stringFa.address,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleTextarea,
            invalid: false,
            validation: {
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,
        },
        caption: {
            value: '',
            title: stringFa.caption,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleTextarea,
            invalid: false,
            validation: {
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            hidden: false,
        },
    })
    const [dialog, setDialog] = useState(null)
    const [filteredOrder, setFilteredOrder] = useState({});
    const [loading, setLoading] = useState(false)
    const [imageSrc, setImageSrc] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [changed, setChanged] = useState(false)

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const { token } = useSelector(state => state.auth)

    const imageRef = useRef(null)

    const uploadButtonClickHandler = useCallback(() => {
        imageRef.current.click();
    }, [])
    const onChangeImage = (event) => {
        if (event.target.files[0]) {
            setImageSrc(URL.createObjectURL(event.target.files[0]));
            setImagePath(event.target.files[0])
            setChanged(true)
        }
    }

    const onSaveChange = async () => {
        setLoading(true)
        setDialog(null);
        try {

            let payload = {
                name: order.teamName.value,
                teamId: content._id,
                legalOwnerInfo: order.legalOwnerId.value,
                address: order.address.value,
                caption: order.caption.value,
                ownerInfo: order.ownerId.value,
            }
            if (!order.legalOwnerPhoneId.hidden && order.legalOwnerPhoneId.value.length > 0)
                payload.legalOwnerInfo = order.legalOwnerPhoneId.value
            let result = await
                formDataDynamic(imagePath, payload, token, 'edit_team')
            setDialog(
                <ErrorDialog
                    type={result.success ? 'success' : "error"}
                >{result.data.message}</ErrorDialog>)
            if (result.success) {
                onUpdateItem({ _id: content._id, name: order.teamName.value, selected: true })
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
                ownerInfo: order.ownerPhoneId.value,
                name: order.teamName.value,
                tournamentId,
                legalOwnerInfo: order.legalOwnerPhoneId.value,
                address: order.address.value,
                caption: order.caption.value,
            }
            let created = await
                formDataDynamic(imagePath, payload, token, 'create_team')
            setDialog(
                <ErrorDialog
                    type={created.success ? 'success' : "error"}
                >{created.data.message}</ErrorDialog>)
            if (created.success) {
                onAddItem({
                    _id: created.data.team,
                    name: order.teamName.value,
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
        updatedOrder.ownerName.hidden = true;
        updatedOrder.ownerPhone.hidden = true;
        updatedOrder.ownerId.hidden = true;
        updatedOrder.teamCode.hidden = true;
        updatedOrder.legalOwnerName.hidden = true;
        updatedOrder.legalOwnerPhone.hidden = true;
        updatedOrder.legalOwnerId.hidden = true;


        updatedOrder.teamName.hidden = false;
        updatedOrder.teamName.value = '';
        updatedOrder.teamName.invalid = true;
        updatedOrder.ownerPhoneId.hidden = false;
        updatedOrder.ownerPhoneId.value = '';
        updatedOrder.ownerPhoneId.invalid = true;
        updatedOrder.caption.hidden = false;
        updatedOrder.caption.value = ''
        updatedOrder.address.hidden = false;
        updatedOrder.address.value = '';
        updatedOrder.legalOwnerPhoneId.hidden = false;
        updatedOrder.legalOwnerPhoneId.value = '';


        setOrder(updatedOrder)
    }
    // for (let inputIdentifier in order) {
    //     if (!order[inputIdentifier].hidden)
    //         if (order[inputIdentifier].invalid) console.log(inputIdentifier)
    // }


    useLayoutEffect(() => {
        setImageSrc('')
        if (content) {
            setFormIsValid(true)
            if (content.image)
                setImageSrc(`${baseUrl}uploads/teams/${content.image}`)
            let updatedOrder = { ...order }
            updatedOrder.ownerName.hidden = false;
            updatedOrder.ownerName.value = content.owner.username;
            updatedOrder.ownerPhone.hidden = false;
            updatedOrder.ownerPhone.value = content.owner.phone;
            updatedOrder.ownerId.hidden = false;
            updatedOrder.ownerId.value = content.owner.national_number;

            updatedOrder.teamName.hidden = false;
            updatedOrder.teamName.value = content.name;
            updatedOrder.teamName.invalid = false;

            updatedOrder.teamCode.hidden = false;
            updatedOrder.teamCode.value = content.code;

            if (content.legal_owner) {
                updatedOrder.legalOwnerName.hidden = false;
                updatedOrder.legalOwnerName.value = content.legal_owner.username;
                updatedOrder.legalOwnerPhone.hidden = false;
                updatedOrder.legalOwnerPhone.value = content.legal_owner.phone;
                updatedOrder.legalOwnerId.hidden = false;
                updatedOrder.legalOwnerId.value = content.legal_owner.national_number;
                updatedOrder.legalOwnerPhoneId.hidden = true;
                updatedOrder.legalOwnerPhoneId.value = '';

            } else {
                updatedOrder.legalOwnerName.hidden = true;
                updatedOrder.legalOwnerPhone.hidden = true;
                updatedOrder.legalOwnerId.hidden = true;
                updatedOrder.legalOwnerPhoneId.hidden = false;

            }
            updatedOrder.caption.hidden = false;
            if (content.caption)
                updatedOrder.caption.value = content.caption;
            updatedOrder.address.hidden = false;
            if (content.address)
                updatedOrder.address.value = content.address;

            updatedOrder.ownerPhoneId.hidden = true;

            setOrder(updatedOrder)
        } else {
            clear()
        }
    }, [content])

    useEffect(() => {
        let updatedFilteredOrder = {}
        for (const key in order) {
            if (!order[key].hidden) updatedFilteredOrder = { ...updatedFilteredOrder, [key]: order[key] }
        }
        setFilteredOrder(updatedFilteredOrder)
    }, [order]);

    //team name
    useEffect(() => {
        if (!order.teamName.checkNeeded) return;
        if (order.teamName.value.length < order.teamName.minLen) return;
        setDialog(null);
        let updatedOrder = { ...order };
        (async () => {
            try {
                let result = await dynamicApi({
                    name: order.teamName.value
                }, token, order.teamName.url)
                if (!result.success)
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)


                if (!result.data.team)
                    updatedOrder.teamName.status = 1;
                else {
                    if (result.data.team === content?._id)
                        updatedOrder.teamName.status = 1;
                    else {
                        updatedOrder.teamName.status = 2;
                        setFormIsValid(false)
                    }
                }

                updatedOrder.teamName.checkNeeded = false;
                updatedOrder.teamName.changed = false;

            } catch (error) {
                updatedOrder.teamName.checkNeeded = false;
                updatedOrder.teamName.changed = false;
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setOrder(updatedOrder)

        })()
    }, [order.teamName.checkNeeded])

    //phone owner
    useEffect(() => {
        if (!order.ownerPhone.checkNeeded) return;
        if (order.ownerPhone.value.length < order.ownerPhone.minLen) return;
        setDialog(null);
        let updatedOrder = { ...order };
        (async () => {
            try {
                let result = await dynamicApi({
                    input: order.ownerPhone.value
                }, token, order.ownerPhone.url)
                if (!result.success)
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)

                if (result.data.user) {
                    updatedOrder.ownerName.value = result.data.user.username
                    updatedOrder.ownerId.value = result.data.user.national_number
                    updatedOrder.ownerPhone.status = 1;
                } else {
                    updatedOrder.ownerName.value = ''
                    updatedOrder.ownerId.value = ''
                    updatedOrder.ownerPhone.status = 2;
                    setFormIsValid(false)
                }

                updatedOrder.ownerPhone.checkNeeded = false;
                updatedOrder.ownerPhone.changed = false;

            } catch (error) {
                updatedOrder.ownerPhone.checkNeeded = false;
                updatedOrder.ownerPhone.changed = false;
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setOrder(updatedOrder)

        })()
    }, [order.ownerPhone.checkNeeded])
    //id owner
    useEffect(() => {
        if (!order.ownerId.checkNeeded) return;
        if (order.ownerId.value.length < order.ownerId.minLen) return;
        setDialog(null);
        let updatedOrder = { ...order };
        (async () => {
            try {
                let result = await dynamicApi({
                    input: order.ownerId.value
                }, token, 'search_by_nationalnumber_phone')
                if (!result.success)
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)

                if (result.data.user) {
                    updatedOrder.ownerName.value = result.data.user.username
                    updatedOrder.ownerPhone.value = result.data.user.phone
                    updatedOrder.ownerId.status = 1;
                } else {
                    updatedOrder.ownerName.value = ''
                    updatedOrder.ownerPhone.value = ''
                    updatedOrder.ownerId.status = 2;
                    setFormIsValid(false)
                }

                updatedOrder.ownerId.checkNeeded = false;
                updatedOrder.ownerId.changed = false;

            } catch (error) {
                updatedOrder.ownerId.checkNeeded = false;
                updatedOrder.ownerId.changed = false;
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setOrder(updatedOrder)

        })()
    }, [order.ownerId.checkNeeded])

    //legal owner phone
    useEffect(() => {
        if (!order.legalOwnerPhone.checkNeeded) return;
        if (order.legalOwnerPhone.value.length < order.legalOwnerPhone.minLen) return;
        setDialog(null);
        let updatedOrder = { ...order };
        (async () => {
            try {
                let result = await dynamicApi({ input: order.legalOwnerPhone.value }, token, 'search_by_nationalnumber_phone')
                if (!result.success)
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)

                if (result.data.user) {
                    updatedOrder.legalOwnerName.value = result.data.user.username
                    updatedOrder.legalOwnerId.value = result.data.user.national_number
                    updatedOrder.legalOwnerPhone.status = 1;
                } else {
                    updatedOrder.legalOwnerName.value = ''
                    updatedOrder.legalOwnerId.value = ''
                    updatedOrder.legalOwnerPhone.status = 2;
                    setFormIsValid(false)
                }

                updatedOrder.legalOwnerPhone.checkNeeded = false;
                updatedOrder.legalOwnerPhone.changed = false;

            } catch (error) {
                updatedOrder.legalOwnerPhone.checkNeeded = false;
                updatedOrder.legalOwnerPhone.changed = false;
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setOrder(updatedOrder)

        })()
    }, [order.legalOwnerPhone.checkNeeded])

    //legal owner id
    useEffect(() => {
        if (!order.legalOwnerId.checkNeeded) return;
        if (order.legalOwnerId.value.length < order.legalOwnerId.minLen) return;
        setDialog(null);
        let updatedOrder = { ...order };
        (async () => {
            try {
                let result = await dynamicApi({ input: order.legalOwnerId.value }, token, 'search_by_nationalnumber_phone')
                if (!result.success)
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)

                if (result.data.user) {
                    updatedOrder.legalOwnerName.value = result.data.user.username
                    updatedOrder.legalOwnerPhone.value = result.data.user.phone
                    updatedOrder.legalOwnerId.status = 1;
                } else {
                    updatedOrder.legalOwnerName.value = ''
                    updatedOrder.legalOwnerPhone.value = ''
                    updatedOrder.legalOwnerId.status = 2;
                    setFormIsValid(false)
                }

                updatedOrder.legalOwnerId.checkNeeded = false;
                updatedOrder.legalOwnerId.changed = false;

            } catch (error) {
                updatedOrder.legalOwnerId.checkNeeded = false;
                updatedOrder.legalOwnerId.changed = false;
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setOrder(updatedOrder)

        })()
    }, [order.legalOwnerId.checkNeeded])

    // OWNER PHONE OR ID
    useEffect(() => {
        if (!order.ownerPhoneId.checkNeeded) return;
        if (order.ownerPhoneId.value.length < order.ownerPhoneId.minLen) return;
        setDialog(null);
        let updatedOrder = { ...order };
        (async () => {
            try {
                let result = await dynamicApi({
                    input: order.ownerPhoneId.value
                }, token, 'search_by_nationalnumber_phone')
                if (!result.success)
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)

                if (result.data.user)
                    updatedOrder.ownerPhoneId.status = 1;
                else {
                    updatedOrder.ownerPhoneId.status = 2;
                    setFormIsValid(false)
                }

                updatedOrder.ownerPhoneId.checkNeeded = false;
                updatedOrder.ownerPhoneId.changed = false;

            } catch (error) {
                updatedOrder.ownerPhoneId.checkNeeded = false;
                updatedOrder.ownerPhoneId.changed = false;
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setOrder(updatedOrder)

        })()
    }, [order.ownerPhoneId.checkNeeded])

    // LEGAL OWNER PHONE OR ID
    useEffect(() => {
        if (!order.legalOwnerPhoneId.checkNeeded) return;
        if (order.legalOwnerPhoneId.value.length < order.legalOwnerPhoneId.minLen) return;
        setDialog(null);
        let updatedOrder = { ...order };
        (async () => {
            try {
                let result = await dynamicApi({
                    input: order.legalOwnerPhoneId.value
                }, token, 'search_by_nationalnumber_phone')
                if (!result.success)
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)

                if (result.data.user)
                    updatedOrder.legalOwnerPhoneId.status = 1;
                else {
                    updatedOrder.legalOwnerPhoneId.status = 2;
                    setFormIsValid(false)
                }

                updatedOrder.legalOwnerPhoneId.checkNeeded = false;
                updatedOrder.legalOwnerPhoneId.changed = false;

            } catch (error) {
                updatedOrder.legalOwnerPhoneId.checkNeeded = false;
                updatedOrder.legalOwnerPhoneId.changed = false;
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setOrder(updatedOrder)

        })()
    }, [order.legalOwnerPhoneId.checkNeeded])

    return (
        <div className="input-wrapper">
            {dialog}
            <div
                className="back-section"
                onClick={onBack}
                style={{ color: theme.on_background }}
            >
                {window.innerWidth > 780 ? <IoCloseOutline /> : <RiArrowLeftSLine />}
            </div>
            <div
                className="profile-avatar"
                disabled={!createAccess}
                onClick={uploadButtonClickHandler}>
                <input type="file"
                    style={{ display: 'none' }}
                    ref={imageRef}
                    onChange={onChangeImage} />
                <img
                    src={imageSrc ? imageSrc : TEAM_IMAGE}
                    alt="avatar" />
                {createAccess &&
                    <div className="upload-image-wrapper" >
                        <AiFillCamera className='camera' />
                    </div>
                }
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

export default TeamForm;
