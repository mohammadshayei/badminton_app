import React, { useState } from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import "./Button.scss";

const Button = (props) => {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const newStyle = {
    color: theme.on_background,
    backgroundColor: isHover
      ? themeState.isDark
        ? theme.surface_12dp
        : theme.hover
      : theme.background_color,
  };
  return (
    <button
      className={`button-component`}
      style={{ ...newStyle, ...props.ButtonStyle }}
      onClick={(e) => {
        if (props.onClick) props.onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {props.children}
    </button>
  );
};

export default Button;
