import "./GymForm.scss"
import InputForm from "../../../../components/UI/InputForm/InputForm";
import { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
import { useState } from "react";

const GymForm = () => {
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
            invalid: true,
            validation: {
                required: true,
                minLength: 2,
            },
            shouldValidate: true,
            isFocused: false,
            touched: false,
            isHalf: false
        },
        capacity: {
            value: '',
            title: stringFa.capacity,
            elementConfig: {
                type: 'text',
            },
            elementType: elementTypes.titleInput,
            validationMessage: '',
            invalid: true,
            validation: {

            },
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: true
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
            isHalf: true
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
            isHalf: false
        },
        optionsSituation: {
            value: '',
            title: stringFa.options_situation,
            elementType: elementTypes.titleInput,
            validationMessage: stringFa.land_numbers_error,
            invalid: true,
            validation: null,
            shouldValidate: false,
            isFocused: false,
            touched: false,
            isHalf: false
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
            isHalf: false
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

export default GymForm;
