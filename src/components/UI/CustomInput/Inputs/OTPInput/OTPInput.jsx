/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../../../../styles/ThemeProvider";
import "./OTPInput.scss"

const OTPInput = (props) => {
    const [otp, setOtp] = useState(new Array(props.boxes).fill(""));
    const [focus, setFocus] = useState(new Array(props.boxes).fill(false));

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const focusDiv = useRef();
    const focusDiv2 = useRef();

    const onFocusHandler = (e, i) => {
        let updatedFocus = [...focus]
        updatedFocus[i] = true
        setFocus(updatedFocus);
        if (e.target.value)
            e.target.select()
    };
    const onBlurHandler = (i) => {
        let updatedFocus = [...focus]
        updatedFocus[i] = false
        setFocus(updatedFocus);
    };

    const handleChange = (e, index) => {
        if (isNaN(e.target.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index) ? e.target.value : d)])

        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus();
            let updatedFocus = [...focus]
            updatedFocus[index] = false
            updatedFocus[index + 1] = true
            setFocus(updatedFocus);
        }
    }

    const handleKey = (e, index) => {
        if (isNaN(e.target.value)) return false;

        if (e.key === "Backspace" && e.target.value.length === 0 && e.target.previousSibling) {
            e.target.previousSibling.focus();
            let updatedFocus = [...focus]
            updatedFocus[index] = false
            updatedFocus[index - 1] = true
            setFocus(updatedFocus);
        }
    }

    useEffect(() => {
        props.onChange(otp.join(""))
    }, [otp]);


    useEffect(() => {
        if (focusDiv.current) focusDiv.current.focus();
    }, [focusDiv]);


    return <div className="otp-input-container">
        {otp.map((data, index) => {
            return (
                <input
                    className={`otp-input-element ${props.invalid && props.shouldValidate && props.touched
                        ? "invalid"
                        : ""
                        }`}
                    inputMode="numeric"
                    key={index}
                    ref={index === 0 ? focusDiv : focusDiv2}
                    maxLength={1}
                    value={data}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e => handleKey(e, index)}
                    style={{
                        backgroundColor: theme.border_color,
                        color: theme.on_background,
                        borderColor: props.isOk ?
                            (focus[index] ? theme.primary : theme.border_color)
                            :
                            (theme.error),
                        ...props.style,
                    }}
                    {...props.config}
                    onFocus={e => onFocusHandler(e, index)}
                    onBlur={() => onBlurHandler(index)}
                />
            )
        })}
    </div>;
};

export default OTPInput;
