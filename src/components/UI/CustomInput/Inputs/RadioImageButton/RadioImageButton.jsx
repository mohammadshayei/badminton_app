import "./RadioImageButton.scss"
// import { animated, useSpring } from "react-spring";
import { useTheme } from "../../../../../styles/ThemeProvider";
import rocket from "../../../../../assets/images/rocket.png";
import rockets from "../../../../../assets/images/rockets.png";

const RadioImageButton = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    // const styles = useSpring({
    //     from: { left: props.double ? "50%" : "0" },
    //     to: { left: props.double ? "0" : "50%" },
    //     config: { mass: 0.5, tension: 500, friction: 20 },
    // });

    return (
        <div className="radio-btn-container">
            <p className="title-class-name">{props.title}</p>
            <div className="width-fixer">
                <div
                    className="selector"
                    style={{
                        // ...styles,
                        background: theme.primary,
                    }}
                ></div>
                <img src={rocket} alt="rocket" onClick={() => props.onChange(false)} />
                <img src={rockets} alt="rocket" onClick={() => props.onChange(true)} />
            </div>
        </div>
    )
}

export default RadioImageButton
