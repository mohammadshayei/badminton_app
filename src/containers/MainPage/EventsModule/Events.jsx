import "./Events.scss"
import { useTheme } from '../../../styles/ThemeProvider';
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../store/actions/setInfo"

const Events = (props) => {
    // const info = useSelector((state) => state.info);
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const events = [
        { className: "yellow card", style: {}, content: "", text: "Warning" },
        { className: "red card", style: {}, content: "", text: "Fault" },
        { className: "letter-icon", style: { color: theme.primary, ...props.letterStyle }, content: "R", text: "Referee Called" },
        { className: "letter-icon", style: { color: theme.primary, ...props.letterStyle }, content: "S", text: "Susdivension" },
        { className: "letter-icon", style: { color: theme.primary, ...props.letterStyle }, content: "O", text: "Overrule" },
        { className: "letter-icon", style: { color: theme.primary, ...props.letterStyle }, content: "I", text: "Injury" },
        { className: "black card", style: {}, content: "", text: "Disqualified" },
        { className: "letter-icon sp", style: { color: theme.primary, ...props.letterStyle }, content: "RET", text: "Retired" },
        { className: "letter-icon", style: { color: theme.primary, ...props.letterStyle }, content: "C", text: "Service Court Error" },
    ];

    const dispatch = useDispatch();
    const setAwait = (waiting) => {
        dispatch(infoActions.setAwait(waiting));
    };

    const eventClick = () => {
        props.setClose && props.setClose(false);
        setAwait({ waiting: true });
    }

    return (
        <div className="events-container" style={props.style}>
            {
                events.map((item, index) => (
                    <div className="event" style={props.eventStyle} key={index} onClick={() => eventClick()}>
                        <div className={`${item.className}`} style={item.style}>
                            {item.content}
                        </div>
                        {!props.hide && item.text}
                    </div>
                ))
            }

        </div>
    )
}

export default Events
