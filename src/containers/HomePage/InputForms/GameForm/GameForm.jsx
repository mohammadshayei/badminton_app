import { useState } from "react";
import "./GameForm.scss"
import InputForm from "../../../../components/UI/InputForm/InputForm";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";

const GameForm = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        gym: {
            value: '',
            id: '',
            title: stringFa.gym,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.gym_title_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        landNumber: {
            value: '',
            title: stringFa.land_numbers,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.land_number_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        date: {
            value: null,
            title: stringFa.date,
            elementType: elementTypes.datePicker,
            validationMessage: stringFa.date_error,
            invalid: true,
            validation: {
                bdRequired: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true

        },
        gameNumber: {
            value: '',
            title: stringFa.number_of_game,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.number_of_game_error,
            invalid: true,
            validation: {
                required: true,
                isNumeric: true
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        competitionType: {
            value: '',
            title: stringFa.competition_type,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.competition_type_error,
            invalid: true,
            validation: {
                required: true,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        type: {
            value: '',
            title: stringFa.game_type,
            elementType: elementTypes.radioImageButton,
            double: false,
            validationMessage: '',
            invalid: true,
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        player1: {
            value: '',
            id: '',
            title: stringFa.player1_teamA,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.player1_teamA_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 1,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        player2: {
            value: '',
            id: '',
            title: stringFa.player1_teamB,
            elementType: elementTypes.dropDown,
            items: [],
            validationMessage: stringFa.player1_teamB_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 1,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        player3: {
            value: '',
            id: '',
            title: stringFa.player2_teamA,
            elementType: elementTypes.dropDown,
            elementConfig: {
                disabled: false
            },
            dropUp: true,
            items: [],
            validationMessage: stringFa.player2_teamA_error,
            invalid: true,
            validation: {
                required: false,
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: true
        },
        player4: {
            value: '',
            id: '',
            title: stringFa.player2_teamB,
            elementType: elementTypes.dropDown,
            elementConfig: {
                disabled: false
            },
            dropUp: true,
            items: [],
            validationMessage: stringFa.player2_teamB_error,
            invalid: true,
            validation: {
                required: false,
            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: true
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

export default GameForm;
