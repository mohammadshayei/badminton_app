import { useState } from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import "./Button.scss";

const Button = (props) => {
  const [isHover, setIsHover] = useState(false);

  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const newStyle = {
    color: theme.on_primary,
    backgroundColor: props.disabled ? "gray" : isHover
      ? props.hover
        ? props.hover
        : themeState.isDark
          ? theme.surface_12dp
          : theme.secondary
      : props.back
        ? props.back
        : theme.primary,
  };

  const onMouseEnter = () => {
    setIsHover(true);
  };
  const onMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <button
      className={`button-component small-gap ${props.buttonClass}`}
      disabled={props.loading ? true : props.disabled}
      style={{
        ...newStyle,
        fontSize: `${Math.min(window.innerWidth * 0.15, 18)}px`,
        color: props.loading ? newStyle.backgroundColor : newStyle.color,
        ...props.ButtonStyle
      }}
      onClick={(e) => {
        if (props.onClick) props.onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props.config}
    >
      {props.children}
      {props.loading && <div className="dot-collision"></div>}
    </button>
  );
};

export default Button;
