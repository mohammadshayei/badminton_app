/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from "react";
import "./TournamentForm.scss"
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import InputForm from "../../../../components/UI/InputForm/InputForm";
import Button from "../../../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton";
import { createTournament } from "../../../../api/home";
import { useSelector } from "react-redux";
import ErrorDialog from "../../../../components/UI/Error/ErrorDialog";
import { GiTrophyCup } from "react-icons/gi";
import { AiFillCamera } from 'react-icons/ai'
import { useTheme } from "../../../../styles/ThemeProvider";

const TournamentForm = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        title: {
            value: '',
            title: stringFa.tournament_title,
            hint: stringFa.tournament_title_error,
            elementConfig: {
                type: 'text',
            },
            style: {
                gridColumn: "1 / -1"
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.tournament_title_error,
            invalid: false,
            validation: {
                required: true,
                minLength: 2,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
        },
        dayCount: {
            value: '',
            title: stringFa.day_count,
            hint: "تعداد روزها به عدد",
            elementConfig: {
                type: 'text',
                inputmode: "numeric",
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.day_count_error,
            invalid: true,
            validation: {
                isNumeric: true,
                required: true,
                minLength: 1,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
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
        },
        startDate: {
            value: '',
            title: stringFa.start_date,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.datePicker,
            validationMessage: '',
            invalid: true,
            validation: {
                bdRequired: true
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
        },
        endDate: {
            value: '',
            title: stringFa.end_date,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.datePicker,
            validationMessage: '',
            invalid: true,
            validation: {
                bdRequired: true
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
        },
        periodNumber: {
            value: '',
            title: stringFa.period_number,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.period_number_error,
            invalid: false,
            validation: {
                isNumeric: true,
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
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
        },
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
        },
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
        },
        hotel: {
            value: '',
            title: stringFa.hotel,
            elementConfig: {
                type: 'text',
            },
            style: {
                gridColumn: "1 / -1"
            },
            elementType: elementTypes.titleTextarea,
            validationMessage: '',
            invalid: false,
            validation: {
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
        },
    })
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [imageSrc, setImageSrc] = useState('')

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const { token } = useSelector(state => state.auth)

    let navigate = useNavigate()
    const onCancel = () => {
        navigate('/tournaments')
    }

    const imageRef = useRef(null)

    const uploadButtonClickHandler = useCallback(() => {
        imageRef.current.click();
    }, [])

    const onChangeImage = (event) => {
        if (event.target.files[0]) {
            setImageSrc(URL.createObjectURL(event.target.files[0]));
        }
    }

    const onSaveClick = async () => {
        setDialog(null)
        setLoading(true)
        try {
            const payload = {
                title: order.title.value,
                period: order.periodNumber.value && parseInt(order.periodNumber.value),
                ageCategory: order.ageRange.value,
                freeRanking: order.freeRanking.value,
                dayCount: order.dayCount.value,
                gameType: order.gamesType.value,
                gameDate: {
                    start: order.startDate.value,
                    end: order.endDate.value,
                },
                supervisor: order.supervisor.value,
                grade: order.grade.value,
                rewardType: order.rewardType.value,
                certificate: order.certificate.value,
                placeInfo: {
                    country: order.country.value,
                    province: order.province.value,
                    city: order.city.value,
                    town: order.town.value,
                },
                options: order.serviceOptions.value,
                transportation: order.tranportation.value,
                catering: order.catering.value,
                hotel: order.hotel.value,
            }
            const result = await createTournament(payload, token)
            if (!result.success) {
                setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)
                return;
            }
            setDialog(<ErrorDialog type="success">با موفقیت ساخته شد</ErrorDialog>)
            setLoading(false)
            navigate(`/tournaments/${result.data.tournament}?part=team`)

        } catch (error) {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            setLoading(false)

        }
    }

    useEffect(() => {
        if (!order.startDate.value) return;
        let updatedOrder = { ...order }
        updatedOrder.endDate.elementConfig = {
            ...updatedOrder.endDate.elementConfig,
            minDate: new Date(order.startDate.value)
        }
        setOrder(updatedOrder)
    }, [order.startDate.value])

    useEffect(() => {
        if (!order.endDate.value) return;
        let updatedOrder = { ...order }
        updatedOrder.startDate.elementConfig = {
            ...updatedOrder.endDate.elementConfig,
            maxDate: new Date(order.endDate.value)
        }
        setOrder(updatedOrder)
    }, [order.endDate.value])

    return <div className="tournaments-form-wrapper">
        {dialog}
        <div className="tournament-avatar" onClick={uploadButtonClickHandler}>
            <input type="file"
                style={{ display: 'none' }}
                ref={imageRef}
                onChange={onChangeImage} />
            {imageSrc ? <img
                src={imageSrc}
                alt="avatar" /> :
                <div className="profile-image"
                    style={{
                        backgroundColor: theme.surface,
                        color: theme.darken_border_color
                    }}
                >
                    <GiTrophyCup />
                </div>
            }
            <div className="upload-image-wrapper" >
                <AiFillCamera className='camera' />
            </div>
        </div>
        <InputForm
            order={order}
            setOrder={setOrder}
            setFormIsValid={setFormIsValid}
            createAccess={true}
        />
        <div className="buttons-wrapper">
            <TransparentButton
                onClick={onCancel}
            >
                {stringFa.cancel}
            </TransparentButton>
            <Button
                loading={loading}
                onClick={onSaveClick}
                config={{ disabled: !formIsValid }}
            >
                {stringFa.save}
            </Button>
        </div>
    </div>;
};

export default TournamentForm;
