import { useTheme } from "../../../styles/ThemeProvider";
import "./RoundSelector.scss";

const RoundSelector = ({ text, style, selected, onClick, type = 1 }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    //type =1 white back ground and type =2 on primary color
    return <div
        className="round-selector-component"
        style={{
            backgroundColor: selected ? type === 1 ? theme.primary : theme.on_primary : "transparent",
            borderColor: selected ? type === 1 ? theme.primary : theme.on_primary : type === 1 ? theme.border_color : theme.on_primary,
            color: selected ? type === 1 ? theme.on_primary : theme.on_background : type === 1 ? theme.on_background : theme.on_primary,
            ...style
        }}
        onClick={onClick}
    >
        {text}
    </div>;
};

export default RoundSelector;
