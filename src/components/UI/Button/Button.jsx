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
    color: theme.on_primary,
    background: isHover
      ? props.hover
        ? props.hover
        : themeState.isDark
          ? theme.surface_12dp
          : theme.primary_variant
      : props.back
        ? props.back
        : `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
  };
  return (
    <button
      className={`button-component ${props.buttonClass}`}
      style={{ ...newStyle, ...props.ButtonStyle }}
      onClick={(e) => {
        if (props.onClick) props.onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props.config}
    >
      {props.children}
    </button>
  );
};

export default Button;
