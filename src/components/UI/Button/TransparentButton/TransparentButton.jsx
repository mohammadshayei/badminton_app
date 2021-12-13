import './TransparentButton.scss'
const TransparentButton = (props) => {
    return (
        <button
            className={`transparent-button-component ${props.buttonClass}`}
            style={{ ...props.ButtonStyle }}
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
