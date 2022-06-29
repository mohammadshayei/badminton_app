import InputForm from "../../../../components/UI/InputForm/InputForm";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { useCallback, useRef, useState, useEffect, useLayoutEffect } from "react";
import { useTheme } from "../../../../styles/ThemeProvider";
import { RiArrowLeftSLine } from 'react-icons/ri'
import { AiFillCamera } from 'react-icons/ai'
import IMAGE from "../../../../assets/images/default.png";
import Button from "../../../../components/UI/Button/Button";
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton";
import ErrorDialog from "../../../../components/UI/Error/ErrorDialog";
import { formDataDynamic } from "../../../../api/home";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../constants/Config";
import { IoCloseOutline } from "react-icons/io5";

const GymForm = ({ itemLoading, createAccess, onUpdateItem, onAddItem, content, tournamentId, onBack, setShowInputForm, removeLoading, onRemoveItemFromTournament }) => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        gymTitle: {
            value: '',
            title: stringFa.gym_title,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.gym_title_error,
            invalid: false,
            validation: {
                required: true,
                minLength: 3,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
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
        },
        landNumbers: {
            value: [],
            title: stringFa.land_numbers,
            count: 0,
            elementType: elementTypes.multiInputTitle,
            validationMessage: stringFa.land_numbers_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
        },
        address: {
            value: '',
            title: stringFa.address,
            elementType: elementTypes.titleTextarea,
            validationMessage: stringFa.address_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
        },
        capacity: {
            value: '',
            title: stringFa.capacity,
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
        },
        optionsSituation: {
            value: '',
            title: stringFa.options_situation,
            elementType: elementTypes.titleTextarea,
            validationMessage: stringFa.land_numbers_error,
            invalid: false,
            validation: null,
            shouldValidate: false,
            isFocused: false,
            touched: false,
        },
    })
    const [dialog, setDialog] = useState(null)
    const [imageSrc, setImageSrc] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [loading, setLoading] = useState(false)

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const { token, user } = useSelector(state => state.auth)

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
                title: order.gymTitle.value,
                landCount: parseInt(order.landCount.value),
                landNumbers: order.landNumbers.value,
                capacity: order.capacity.value && parseInt(order.capacity.value),
                options: order.optionsSituation.value,
                address: order.address.value,
                gymId: content._id,
            }
            let result = await
                formDataDynamic(imagePath, payload, token, 'edit_gym')
            setDialog(
                <ErrorDialog
                    type={result.success ? 'success' : "error"}
                >{result.data.message}</ErrorDialog>)
            if (result.success) {
                onUpdateItem({ _id: content._id, title: order.gymTitle.value, selected: true })
                onBack()
            }

        } catch (error) {
            setLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setLoading(false)

    }
    const onSave = async () => {
        setLoading(true)
        setDialog(null);
        try {
            let payload = {
                title: order.gymTitle.value,
                landCount: parseInt(order.landCount.value),
                landNumbers: order.landNumbers.value,
                capacity: order.capacity.value && parseInt(order.capacity.value),
                options: order.optionsSituation.value,
                address: order.address.value,
                tournamentId,
            }
            console.log(payload)
            let created = await
                formDataDynamic(imagePath, payload, token, 'create_gym')
            setDialog(
                <ErrorDialog
                    type={created.success ? 'success' : "error"}
                >{created.data.message}</ErrorDialog>)
            if (created.success) {
                onAddItem({
                    _id: created.data.gym,
                    title: order.gymTitle.value,
                    selected: true
                })
                setShowInputForm(false)
                clear()
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setLoading(false)

    }
    const clear = () => {
        setFormIsValid(false)
        setImageSrc('')
        let updatedOrder = { ...order }
        updatedOrder.gymTitle.value = '';
        updatedOrder.gymTitle.invalid = true;

        updatedOrder.landCount.value = '';
        updatedOrder.landCount.invalid = true;

        updatedOrder.landNumbers.value = [];
        updatedOrder.landNumbers.invalid = true;

        updatedOrder.address.value = '';
        updatedOrder.address.invalid = true;

        updatedOrder.capacity.value = '';
        updatedOrder.capacity.invalid = false;

        updatedOrder.optionsSituation.value = '';
        updatedOrder.optionsSituation.invalid = false;

        setOrder(updatedOrder)
    }
    useEffect(() => {
        const pattern = /^\d+$/;
        if (!order.landCount.value) {
            let updatedOrder = { ...order }
            updatedOrder.landNumbers.count = 0;
            setOrder(updatedOrder)
            return;
        }
        if (!pattern.test(order.landCount.value)) return;
        let updatedOrder = { ...order }
        updatedOrder.landNumbers.count = parseInt(order.landCount.value);
        setOrder(updatedOrder)
    }, [order.landCount.value])

    useLayoutEffect(() => {
        setImageSrc('')
        if (content) {
            setFormIsValid(true)
            if (content.image)
                setImageSrc(`${baseUrl}uploads/gyms/${content.image}`)
            let updatedOrder = { ...order }
            updatedOrder.gymTitle.value = content.title;
            updatedOrder.gymTitle.invalid = false;

            updatedOrder.landCount.value = content.land_count;
            updatedOrder.landCount.invalid = false;

            updatedOrder.landNumbers.value = content.land_numbers.map(item => item.number);
            updatedOrder.landNumbers.invalid = false;

            updatedOrder.address.value = content.address;
            updatedOrder.address.invalid = false;

            updatedOrder.capacity.value = content.capacity;
            updatedOrder.capacity.invalid = false;

            updatedOrder.optionsSituation.value = content.options;
            updatedOrder.optionsSituation.invalid = false;

            setOrder(updatedOrder)
        } else {
            clear()
        }
    }, [content])


    return <div className="input-wrapper">
        {dialog}
        <div
            className="back-section"
            style={{
                backgroundColor: theme.background_color
            }}
            onClick={onBack}
        >
            {window.innerWidth > 780 ? <IoCloseOutline /> : <RiArrowLeftSLine />}
        </div>
        <div className="default-image" onClick={uploadButtonClickHandler}>
            <input type="file"
                style={{ display: 'none' }}
                ref={imageRef}
                onChange={onChangeImage} />
            <img
                src={imageSrc ? imageSrc : IMAGE}
                alt="default" />
        </div>
        <InputForm
            order={order}
            setOrder={setOrder}
            setFormIsValid={setFormIsValid}
            itemLoading={itemLoading}
            createAccess={createAccess}
        />
        {createAccess &&
            <div className="buttons-wrapper">
                <Button
                    loading={loading}
                    // onClick={onSaveClick}
                    onClick={() => {
                        if (content) onSaveChange()
                        else onSave()
                    }}
                    config={{ disabled: !formIsValid }}
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
    </div>;
};

export default GymForm;
