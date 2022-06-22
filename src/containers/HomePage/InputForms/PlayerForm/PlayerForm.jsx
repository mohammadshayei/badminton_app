import { useState } from "react";
import "./PlayerForm.scss"
import InputForm from "../../../../components/UI/InputForm/InputForm";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";

const PlayerForm = () => {
    const [formIsValid, setFormIsValid] = useState(false)
    const [order, setOrder] = useState({
        nameFamily: {
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
            isHalf: false,
            hidden: true,
        },
        teamName: {
            value: '',
            title: stringFa.team_name,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.team_name_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 2,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: true,
            hidden: true,
        },
        nationalNumber: {
            value: '',
            title: stringFa.national_number,
            elementConfig: {
                type: 'text',
                maxLength: 10
            },
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.national_number_player_error,
            invalid: true,
            validation: {
                required: true,
                minLength: 10,
                maxLength: 10,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: false,
            hidden: false,

        },
        birthDate: {
            value: null,
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
            isHalf: true,
            hidden: true,
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

export default PlayerForm;
