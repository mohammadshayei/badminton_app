import { baseUrl } from "../constants/Config";
import axios from "axios";
import { elementTypes } from "../components/UI/CustomInput/CustomInput";

export const checkValidaty = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim().length > 0 && isValid;
  }
  if (rules.bdRequired) {
    isValid = value && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  return isValid;
};
export const onChange = (
  value,
  key,
  order,
  setOrder,
  setFormIsValid,
  index
) => {
  let updatedOrder = { ...order };
  let upadtedElement = updatedOrder[key];
  if (upadtedElement.elementType === elementTypes.dropDown) {
    upadtedElement.value = value.text;
    upadtedElement.id = value.id;
    upadtedElement.invalid = !checkValidaty(
      value.text,
      upadtedElement.validation
    );
  } else if (upadtedElement.elementType === elementTypes.multiInputTitle) {
    upadtedElement.value[index] = value;
    let findError = upadtedElement.value.findIndex((item) => item === "");
    upadtedElement.invalid = findError < 0 ? false : true;
  } else {
    upadtedElement.value = value;
    upadtedElement.invalid = !checkValidaty(value, upadtedElement.validation);
  }
  // upadtedElement.touched = true;
  upadtedElement.changed = true;

  updatedOrder[key] = upadtedElement;

  let formIsValid = true;
  for (let inputIdentifier in updatedOrder) {
    if (!updatedOrder[inputIdentifier].hidden)
      formIsValid = !updatedOrder[inputIdentifier].invalid && formIsValid;
    if (updatedOrder[inputIdentifier].status)
      updatedOrder[inputIdentifier].status = 0;
  }
  setFormIsValid(formIsValid);
  setOrder(updatedOrder);
};
export const onChangeUnderline = (
  value,
  key,
  order,
  setOrder,
  setFormIsValid,
  setCount,
  maxLength
) => {
  let updatedOrder = { ...order };
  let upadtedElement = updatedOrder[key];
  upadtedElement.value = value;
  upadtedElement.invalid = checkValidaty(value, upadtedElement.validation);
  updatedOrder[key] = upadtedElement;
  setCount(maxLength - value.length);

  let formIsValid = true;
  for (let inputIdentifier in updatedOrder) {
    formIsValid = updatedOrder[inputIdentifier].invalid && formIsValid;
  }
  setFormIsValid(formIsValid);
  setOrder(updatedOrder);
};

export const onExit = async (key, order, setOrder) => {
  let updatedOrder = { ...order };
  let upadtedElement = updatedOrder[key];
  if (upadtedElement.url && upadtedElement.changed) {
    // && upadtedElement.value.length>=upadtedElement.minLen
    if (
      upadtedElement.minLen &&
      upadtedElement.value.length < upadtedElement.minLen
    )
      return;
    upadtedElement.checkNeeded = true;
    upadtedElement.changed = true;
  }
  updatedOrder[key] = upadtedElement;
  setOrder(updatedOrder);
};
