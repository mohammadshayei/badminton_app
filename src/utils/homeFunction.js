import CustomInput, { elementTypes } from "../components/UI/CustomInput/CustomInput";
import { checkValidaty } from "./authFunction";

export const onChangeMultiPage = (e, page, key, elementType, order, setFormIsValid, setOrder) => {
    let updatedOrder = { ...order };
    let updatedPage = { ...updatedOrder[page] }
    let upadtedElement = updatedPage[key];
    if (elementType === elementTypes.datePicker) {
        upadtedElement.value = new Date(e)
    }
    else if (elementType === elementTypes.switchInput) {
        upadtedElement.value = !upadtedElement.value;
    }
    else {
        upadtedElement.value = e.target.value;
        upadtedElement.invalid = !checkValidaty(
            e.target.value,
            upadtedElement.validation
        );
    }
    upadtedElement.touched = true;
    if (upadtedElement.shouldValidate) {
        let formIsValid = true;
        for (let inputIdentifier in updatedPage) {
            formIsValid = !updatedPage[inputIdentifier].invalid && formIsValid;
        }
        setFormIsValid(formIsValid)
    }
    updatedPage[key] = upadtedElement;
    updatedOrder[page] = updatedPage;
    setOrder(updatedOrder)
}
export const setUpMultiPage = (order, page, setFormIsValid, setOrder, setBody) => {
    let index = 0;
    let elems = []
    while (index < Object.entries(order[page]).length) {
        let secondExist = index + 2 <= Object.entries(order[page]).length
        let element;
        const [key1, value1] = Object.entries(order[page])[index]
        if (!value1.isHalf || !secondExist) {
            element = (
                <div key={key1} className={`pair-item-container ${value1.isHalf && 'pair-half-item-container'}`}>
                    <CustomInput
                        {...value1}
                        onChange={(e) => onChangeMultiPage(e, page, key1, value1.elementType, order, setFormIsValid, setOrder)}
                        inputContainer={{ marginBottom: '1.4rem' }}
                        errorStyle={{ top: "4.5rem", left: "8%" }}
                    />
                </div>)
            index += 1;
        } else {
            const [key2, value2] = Object.entries(order[page])[index + 1];
            if (value1.isHalf && !value2.isHalf) {
                element = (
                    <div key={key2}>
                        <div className={`pair-item-container pair-half-item-container`}>
                            <CustomInput
                                {...value1}
                                onChange={(e) => onChangeMultiPage(e, page, key1, value1.elementType, order, setFormIsValid, setOrder)}
                                inputContainer={{ marginBottom: '1.4rem' }}
                                errorStyle={{ top: "4.5rem", left: "5%" }}
                            />
                        </div>
                        <div className={`pair-item-container`}>

                            <CustomInput
                                {...value2}
                                onChange={(e) => onChangeMultiPage(e, page, key2, value2.elementType, order, setFormIsValid, setOrder)}
                                inputContainer={{ marginBottom: '1.4rem' }}
                                errorStyle={{ top: "4.5rem", left: "5%" }}


                            />
                        </div>
                    </div>
                )
            } else {
                element = (
                    <div key={key2} className={`pair-item-container ${value1.isHalf && value2.isHalf && 'pair-half-item-container'}`}>
                        <CustomInput
                            {...value1}
                            onChange={(e) => onChangeMultiPage(e, page, key1, value1.elementType, order, setFormIsValid, setOrder)}
                            inputContainer={{ marginBottom: '1.4rem' }}
                            errorStyle={{ top: "4.5rem", left: "5%" }}


                        />
                        <CustomInput
                            {...value2}
                            onChange={(e) => onChangeMultiPage(e, page, key2, value2.elementType, order, setFormIsValid, setOrder)}
                            inputContainer={{ marginBottom: '1.4rem' }}
                            errorStyle={{ top: "4.5rem", left: "5%" }}


                        />
                    </div>)
            }

            index += 2;
        }

        elems = [...elems, element]
        setBody(elems)
    }
}
export const onChangeSinglePage = (e, key, elementType, order, setFormIsValid, setOrder, index) => {
    let updatedOrder = { ...order };
    let upadtedElement = updatedOrder[key];
    if (elementType === elementTypes.datePicker) {
        upadtedElement.value = new Date(e)
        upadtedElement.invalid = false;
    }
    else if (elementType === elementTypes.multiInputTitle) {
        upadtedElement.value[index] = e.target.value
        let findError = upadtedElement.value.findIndex(item => item === '')
        upadtedElement.invalid = findError < 0 ? false : true;
    }
    else if (elementType === elementTypes.dropDown) {
        upadtedElement.value = e.text
        upadtedElement.id = e.id
        upadtedElement.invalid = e.text.length > 0 ? false : true;
    }
    else if (elementType === elementTypes.radioImageButton) {
        upadtedElement.double = e
    }
    else {
        upadtedElement.value = e.target.value;
        upadtedElement.invalid = !checkValidaty(
            e.target.value,
            upadtedElement.validation
        );
        if (key === 'landCount') {
            if (!upadtedElement.invalid) {
                order.landNumbers.count = e.target.value;
                order.landNumbers.value = Array(parseInt(e.target.value)).fill('');
            }
            else
                order.landNumbers.count = 0

        }
    }
    upadtedElement.touched = true;
    if (upadtedElement.shouldValidate) {
        let formIsValid = true;
        for (let inputIdentifier in updatedOrder) {
            if (updatedOrder[inputIdentifier].shouldValidate)
                formIsValid = !updatedOrder[inputIdentifier].invalid && formIsValid;
        }
        setFormIsValid(formIsValid)
    }
    updatedOrder[key] = upadtedElement;
    setOrder(updatedOrder)
}
export const setUpSinglePage =
    (order, setFormIsValid, setOrder, setBody) => {
        let index = 0;
        let elems = []
        while (index < Object.entries(order).length) {
            let secondExist = index + 2 <= Object.entries(order).length
            let element;
            const [key1, value1] = Object.entries(order)[index]
            if (!value1.isHalf || !secondExist) {
                element = (
                    <div key={key1} className={`pair-item-container ${value1.isHalf && 'pair-half-item-container'}`}>
                        <CustomInput
                            {...value1}
                            onChange={(e, indexArray) => onChangeSinglePage(e, key1, value1.elementType, order, setFormIsValid, setOrder, indexArray)}
                            inputContainer={{ marginBottom: '1.4rem' }}
                            errorStyle={{
                                top: value1.elementType === elementTypes.titleTextarea ? "7rem" : "4.5rem",
                                left: "8%"
                            }}
                        />
                    </div>)
                index += 1;
            } else {
                const [key2, value2] = Object.entries(order)[index + 1];
                if (value1.isHalf && !value2.isHalf) {
                    element = (
                        <div key={key2}>
                            <div className={`pair-item-container pair-half-item-container`}>
                                <CustomInput
                                    {...value1}
                                    onChange={(e, indexArray) => onChangeSinglePage(e, key1, value1.elementType, order, setFormIsValid, setOrder, indexArray)}
                                    inputContainer={{ marginBottom: '1.4rem' }}
                                    errorStyle={{
                                        top: value1.elementType === elementTypes.titleTextarea ? "7rem" : "4.5rem",
                                        left: "8%"
                                    }}
                                />
                            </div>
                            <div className={`pair-item-container`}>

                                <CustomInput
                                    {...value2}
                                    onChange={(e, indexArray) => onChangeSinglePage(e, key2, value2.elementType, order, setFormIsValid, setOrder, indexArray)}
                                    inputContainer={{ marginBottom: '1.4rem' }}
                                    errorStyle={{
                                        top: value1.elementType === elementTypes.titleTextarea ? "7rem" : "4.5rem",
                                        left: "8%"
                                    }}


                                />
                            </div>
                        </div>
                    )
                } else {
                    element = (
                        <div key={key2} className={`pair-item-container ${value1.isHalf && value2.isHalf && 'pair-half-item-container'}`}>
                            <CustomInput
                                {...value1}
                                onChange={(e, indexArray) => onChangeSinglePage(e, key1, value1.elementType, order, setFormIsValid, setOrder, indexArray)}
                                inputContainer={{ marginBottom: '1.4rem' }}
                                errorStyle={{
                                    top: value1.elementType === elementTypes.titleTextarea ? "7rem" : "4.5rem",
                                    left: "8%"
                                }}


                            />
                            <CustomInput
                                {...value2}
                                onChange={(e, indexArray) => onChangeSinglePage(e, key2, value2.elementType, order, setFormIsValid, setOrder, indexArray)}
                                inputContainer={{ marginBottom: '1.4rem' }}
                                errorStyle={{
                                    top: value1.elementType === elementTypes.titleTextarea ? "7rem" : "4.5rem",
                                    left: "8%"
                                }}


                            />
                        </div>)
                }

                index += 2;
            }

            elems = [...elems, element]
            setBody(elems)
        }
    }