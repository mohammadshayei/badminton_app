import { useTheme } from '../../../../styles/ThemeProvider';
import './TransparentButton.scss'

const TransparentButton = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    return (
        <button
            className={`transparent-button-component ${props.buttonClass}`}
            style={{
                color: theme.on_background,
                ...props.ButtonStyle
            }}
            onClick={(e) => {
                if (props.onClick) props.onClick();
            }}
            {...props.config}
        >
            {props.children}
        </button>
    )
}

export default TransparentButton
