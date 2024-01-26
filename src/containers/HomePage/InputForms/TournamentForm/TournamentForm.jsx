/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useCallback } from "react";
import "./TournamentForm.scss"
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import InputForm from "../../../../components/UI/InputForm/InputForm";
import Button from "../../../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton";
import { dynamicApi, formDataDynamic } from "../../../../api/home";
import { useSelector } from "react-redux";
import ErrorDialog from "../../../../components/UI/Error/ErrorDialog";
import { useLocation } from 'react-router-dom'
import { GiTrophyCup } from "react-icons/gi";
import { AiFillCamera } from 'react-icons/ai'
import { useTheme } from "../../../../styles/ThemeProvider";
import { baseUrl } from "../../../../constants/Config";

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
                inputMode: "numeric",
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
    const [imagePath, setImagePath] = useState('')
    const [changed, setChanged] = useState(false)
    const [createAccess, setCreateAccess] = useState(false)
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const { token, user } = useSelector(state => state.auth)

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
            setImagePath(event.target.files[0])
            setChanged(true)
        }
    }

    const onSaveClick = async () => {
        setDialog(null)
        setLoading(true)
        try {
            let payload = {
                title: order.title.value,
                period: order.periodNumber.value,
                ageCategory: order.ageRange.value,
                freeRanking: order.freeRanking.value,
                dayCount: order.dayCount.value,
                gameType: order.gamesType.value,
                gameDateStart: new Date(order.startDate.value),
                gameDateEnd: new Date(order.endDate.value),
                supervisor: order.supervisor.value,
                grade: order.grade.value,
                rewardType: order.rewardType.value,
                certificate: order.certificate.value,
                country: order.country.value,
                province: order.province.value,
                city: order.city.value,
                town: order.town.value,
                options: order.serviceOptions.value,
                transportation: order.tranportation.value,
                catering: order.catering.value,
                hotel: order.hotel.value,
            }
            let path = 'create_tournament';
            if (id) {
                path = 'edit_tournament'
                payload = { ...payload, tournamentId: id }
            }
            console.log(payload)
            const result = await formDataDynamic(imagePath, payload, token, path)
            if (!result.success) {
                setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)
                return;
            }
            setDialog(<ErrorDialog type="success">با موفقیت ساخته شد</ErrorDialog>)
            setLoading(false)
            if (order.freeRanking.value)
                navigate(`/tournaments/${result.data.tournament}?part=player`)
            else
                navigate(`/tournaments/${result.data.tournament}?part=team`)


        } catch (error) {
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            setLoading(false)

        }
        setChanged(false)
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

    useEffect(() => {
        if (!user) return;
        if (!id) {
            setFormIsValid(false)
            let updatedOrder = { ...order }
            updatedOrder.title.value = ''
            updatedOrder.title.invalid = true;
            updatedOrder.periodNumber.value = ''
            updatedOrder.ageRange.value = ''
            updatedOrder.ageRange.invalid = true;
            updatedOrder.freeRanking.value = ''
            updatedOrder.dayCount.value = ''
            updatedOrder.dayCount.invalid = true;
            updatedOrder.gamesType.value = ''
            updatedOrder.startDate.value = ''
            updatedOrder.startDate.invalid = true;
            updatedOrder.endDate.value = ''
            updatedOrder.endDate.invalid = true;
            updatedOrder.supervisor.value = ''
            updatedOrder.grade.value = ''
            updatedOrder.rewardType.value = ''
            updatedOrder.certificate.value = ''
            updatedOrder.country.value = ''
            updatedOrder.province.value = ''
            updatedOrder.city.value = ''
            updatedOrder.town.value = ''
            updatedOrder.serviceOptions.value = ''
            updatedOrder.tranportation.value = ''
            updatedOrder.catering.value = ''
            updatedOrder.hotel.value = ''
            setOrder(updatedOrder)
            setCreateAccess(true)
            return;
        }
        (async () => {
            setLoading(true)
            try {
                let result = await dynamicApi({ id }, token, 'get_full_info_tournament')
                if (!result.success) {
                    setDialog(<ErrorDialog type="error">{result.data.message}</ErrorDialog>)
                    setLoading(false)
                    return;
                }

                if (user._id !== result.data.tournament.chief)
                    setCreateAccess(false)
                else
                    setCreateAccess(true)
                if (result.data.tournament.image)
                    setImageSrc(`${baseUrl}uploads/tournaments/${result.data.tournament.image}`)
                setFormIsValid(true)
                let updatedOrder = { ...order }
                updatedOrder.title.value = result.data.tournament.title;
                updatedOrder.title.invalid = false;
                updatedOrder.periodNumber.value = result.data.tournament.period;
                updatedOrder.ageRange.value = result.data.tournament.age_category;
                updatedOrder.ageRange.invalid = false;
                updatedOrder.freeRanking.value = result.data.tournament.free_ranking;
                updatedOrder.dayCount.value = result.data.tournament.day_count;
                updatedOrder.dayCount.invalid = false;
                updatedOrder.gamesType.value = result.data.tournament.game_type
                updatedOrder.startDate.value = result.data.tournament.game_date.start
                updatedOrder.startDate.invalid = false;
                updatedOrder.endDate.value = result.data.tournament.game_date.end
                updatedOrder.endDate.invalid = false;
                updatedOrder.supervisor.value = result.data.tournament.supervisor
                updatedOrder.grade.value = result.data.tournament.grade
                updatedOrder.rewardType.value = result.data.tournament.reward_type
                updatedOrder.certificate.value = result.data.tournament.certificate
                updatedOrder.country.value = result.data.tournament.place_info.country;
                updatedOrder.province.value = result.data.tournament.place_info.province
                updatedOrder.city.value = result.data.tournament.place_info.city
                updatedOrder.town.value = result.data.tournament.place_info.town
                updatedOrder.serviceOptions.value = result.data.tournament.options
                updatedOrder.tranportation.value = result.data.tournament.transportation
                updatedOrder.catering.value = result.data.tournament.catering
                updatedOrder.hotel.value = result.data.tournament.hotel
                setOrder(updatedOrder)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setLoading(false)
        })()
    }, [user, id])

    return <div className="tournaments-form-wrapper">
        {dialog}
        <div className="tournament-avatar" onClick={uploadButtonClickHandler}>
            <input type="file"
                style={{ display: 'none' }}
                ref={imageRef}
                onChange={onChangeImage} />
            {imageSrc ? <img
                src={imageSrc}
                alt="avatar" loading="lazy" /> :
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
            createAccess={createAccess}
            setChanged={setChanged}
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
                config={{ disabled: !formIsValid || !changed }}
            >
                {stringFa.save}
            </Button>
        </div>
    </div>;
};

export default TournamentForm;
