import { useState } from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import loading_icon from "../../../assets/images/btn_loading.gif"
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
    backgroundColor: props.disabled ? "gray" : isHover
      ? props.hover
        ? props.hover
        : themeState.isDark
          ? theme.surface_12dp
          : "#98bb9c"
      : props.back
        ? props.back
        : `#8eb6ca`,
  };
  return (
    <button
      className={`button-component ${props.buttonClass}`}
      disabled={props.loading ? true : props.disabled}
      style={{ ...newStyle, ...props.ButtonStyle }}
      onClick={(e) => {
        if (props.onClick) props.onClick();
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props.config}
    >
      {props.loading ?
        <div className="loading-spinner">
          <img src={loading_icon} alt="" />
        </div>
        : props.children}
    </button>
  );
};

export default Button;
