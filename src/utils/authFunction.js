export const checkValidaty = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
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
export const onChange = (value, key, order, setOrder, setFormIsValid) => {
  let updatedOrder = { ...order };
  let upadtedElement = updatedOrder[key];
  upadtedElement.value = value;
  upadtedElement.invalid = !checkValidaty(value, upadtedElement.validation);
  // upadtedElement.touched = true;
  updatedOrder[key] = upadtedElement;

  let formIsValid = true;
  for (let inputIdentifier in updatedOrder) {
    formIsValid = !updatedOrder[inputIdentifier].invalid && formIsValid;
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
