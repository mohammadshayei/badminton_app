import React, { useState } from "react";
import "./Page1.scss";
import Button from "../../../components/UI/Button/Button";
import rocket from "../../../assets/images/rocket.png";
import rockets from "../../../assets/images/rockets.png";
import { animated, useSpring, useTransition } from "react-spring";
import { useTheme } from "../../../styles/ThemeProvider";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import CustomInput from "./CustomInput/CustomInput";

const Page1 = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [double, setDouble] = useState(false);
  const [order, setOrder] = useState({
    refereee: {
      value: '',
      title: stringFa.refereee,
      error: stringFa.refereee_error,
      withImage: true,
      imagePath: "",
      isValid: true,
      validation: {
        isRequired: true,
        minLength: 3,
      },
      isFocused: false,
    },
    serviceReferee: {
      value: '',
      title: stringFa.refereee,
      error: stringFa.refereee_error,
      withImage: true,
      imagePath: "",
      isValid: true,
      validation: {
        isRequired: true,
        minLength: 3,
      },
      isFocused: false,
    },
    competitionNumber: {
      value: '',
      title: stringFa.competition_number,
      error: stringFa.competition_number_error,
      withImage: false,
      imagePath: "",
      isValid: true,
      validation: {
        isRequired: true,
        isNumeric: true,
      },
      isFocused: false,
    },
    landNumber: {
      value: '',
      title: stringFa.land_number,
      error: stringFa.land_number_error,
      withImage: false,
      imagePath: "",
      isValid: true,
      validation: {
        isRequired: true,
        isNumeric: true,
      },
      isFocused: false,
    },
  })
  const [formIsValid, setFormIsValid] = useState(false)
  const styles = useSpring({
    from: { left: double ? "0" : "51px" },
    to: { left: double ? "51px" : "0" },
    config: { mass: 0.5, tension: 500, friction: 20 },
  });
  const transition = useTransition(true, {
    from: { transform: "translateX(20%)" },
    enter: { transform: "translateX(0)" },
    leave: { transform: "translateX(-20%)" },
  });

  const checkValidaty = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
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
  const onChange = (e, key) => {
    let updatedOrder = { ...order };
    let upadtedElement = updatedOrder[key];
    upadtedElement.value = e.target.value;
    upadtedElement.isValid = checkValidaty(
      e.target.value,
      upadtedElement.validation
    );
    updatedOrder[key] = upadtedElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrder) {
      formIsValid = updatedOrder[inputIdentifier].isValid && formIsValid;
    }
    setFormIsValid(formIsValid)
    setOrder(updatedOrder)
  };

  return transition((tranStyles, item) => (
    <animated.div className="page-container page-1" style={tranStyles}>
      {
        Object.entries(order).map(([k, v]) =>
          <CustomInput
            key={k}
            info={v}
            onChange={(e) => onChange(e, k)}
          />)
      }
      <div className="input-line full-row">
        <div className="width-fixer">
          <animated.div
            className="selector"
            style={{
              ...styles,
              background: theme.primary,
            }}
          ></animated.div>
          <img src={rocket} alt="rocket" onClick={() => setDouble(false)} />
          <img src={rockets} alt="rocket" onClick={() => setDouble(true)} />
        </div>
        <p>{stringFa.game_type}</p>
      </div>
      <Button
        className="next-btn"
        onClick={() => {
          props.pageSelector(1);
        }}
      >
        {stringFa.next}
      </Button>
    </animated.div>
  ));
};

export default Page1;
