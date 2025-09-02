/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./ErrorDialog.scss";
import ReactDom from "react-dom";
import { useTheme } from "../../../styles/ThemeProvider.jsx";
// import Button from "./../Button/Button";
import { IoWarning } from "react-icons/io5";
import { useAnimatePresence } from "use-animate-presence";
// import { stringFa } from "./../../../assets/strings/stringFaCollection";
import { MdError, MdInfo, MdCheckCircle } from "react-icons/md";

const popupVariants = {
  y: {
    from: 0,
    to: 250,
  },
};

const ErrorDialog = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;
  const [icon, setIcon] = useState(null);
  const [back, setBack] = useState(theme.info);

  const popup = useAnimatePresence({
    variants: popupVariants,
    initial: "visible",
    options: {
      stiffness: 1000,
      mass: 2,
      damping: 50,
    },
  });

  useEffect(() => {
    switch (props.type) {
      case "error":
        setIcon(<MdError style={{ fontSize: "1.7rem", marginLeft: "1rem" }} />)
        setBack(theme.error);
        break;
      case "warning":
        setIcon(<IoWarning style={{ fontSize: "1.7rem", marginLeft: "1rem" }} />)
        setBack(theme.warning);
        break;
      case "info":
        setIcon(<MdInfo style={{ fontSize: "1.7rem", marginLeft: "1rem" }} />)
        setBack(theme.info);
        break;
      case "success":
        setIcon(<MdCheckCircle style={{ fontSize: "1.7rem", marginLeft: "1rem" }} />)
        setBack(theme.success);
        break;

      default:
        break;
    }
    let exitTime = setTimeout(() => {
      popup.togglePresence();
    }, 9000);

    return () => {
      clearTimeout(exitTime)
    };
  }, []);


  if (!popup.isRendered) return null;

  // const closeHandler = () => {
  //   props.onClose(null);
  // };

  // const handleUndo = () => {
  //   props.onClose(null);
  //   props.undoClick && props.undoClick();
  // };

  return ReactDom.createPortal(
    <div
      ref={popup.ref}
      className="error-box"
      style={{
        backgroundColor: back,
        color: theme.on_error,
      }}
    >
      {/* <div className="exit-icon" onClick={closeHandler}>
        <IoClose style={{ color: theme.on_error }} />
      </div> 
       {props.undoNeeded && props.success && (
        <div className="undo-button" onClick={() => handleUndo()}>
          {stringFa.undo}
        </div> 
      )}*/}
      {props.children}
      {icon && icon}
    </div>,
    document.getElementById("portal")
  );
};

export default ErrorDialog;
