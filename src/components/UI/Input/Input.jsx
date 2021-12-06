import React, { useState } from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import "./Input.scss";

const Input = (props) => {
  const [focus, setFocus] = useState(false);
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  const inputStyles = {
    background: themeState.isDark ? theme.surface_1dp : theme.surface,
    color: theme.on_background,
    border: focus ? `1px solid ${!props.isValid ? theme.error : theme.primary}` : "none",
  };

  return (
    <div className='input-container'>
      <input
        className="input-class"
        style={{
          ...inputStyles,
          ...props.styles,
        }}
        type="text"
        pattern={props.pattern}
        dir="rtl"
        value={props.value}
        // onInput={handleInput}
        onChange={props.onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {
        props.error &&
        <p style={{ color: theme.error }}>
          {props.error}
        </p>
      }
    </div>
  );
};

export default Input;
