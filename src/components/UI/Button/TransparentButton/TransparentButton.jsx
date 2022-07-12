import { useTheme } from '../../../../styles/ThemeProvider';
import './TransparentButton.scss'
import { Icon } from '@iconify/react';

const TransparentButton = ({ buttonClass, ButtonStyle, onClick, config, loading, children }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <button
            className={`transparent-button-component ${!loading ? 'transparent-button-click' : ''} ${buttonClass}`}
            style={{
                fontSize: `${Math.min(window.innerWidth * 0.15, 18)}px`,
                color: theme.on_background,
                ...ButtonStyle
            }}
            onClick={(e) => {
                if (onClick && !loading) onClick();
            }}
            {...config}
        >
            {
                loading ?
                    <Icon icon="eos-icons:three-dots-loading"
                        fontSize={35}
                        color={theme.secondary}
                    /> :
                    children
            }
        </button>
    )
}

export default TransparentButton
