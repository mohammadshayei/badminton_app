import { useState } from "react";
import "./TournamentForm.scss"
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import InputForm from "../../../../components/UI/InputForm/InputForm";

const TournamentForm = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        title: {
            value: '',
            title: stringFa.tournament_title,
            elementConfig: {
                type: 'text',
            },
            style: {
                gridColumn: "1 / -1"
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.tournament_title_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 2,
            },
            shouldValidate: true,
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
            invalid: true,
            validation: {
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
            invalid: false,
            validation: {
            },
            shouldValidate: false,
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

    return <div>
        <InputForm
            order={order}
            setOrder={setOrder}
            setFormIsValid={setFormIsValid}
        />
    </div>;
};

export default TournamentForm;
