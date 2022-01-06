import { useEffect, useState } from "react";
import "./Events.scss";
import { useTheme } from "../../../styles/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../store/actions/setInfo";

const Events = (props) => {
    const [disableEvent, setDisableEvent] = useState(false);
    const info = useSelector((state) => state.info);
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const events = [
        { className: "yellow card", style: {}, content: "", text: "Warning" },
        { className: "red card", style: {}, content: "", text: "Fault" },
        {
            className: "letter-icon",
            style: { color: theme.primary, ...props.letterStyle },
            content: "R",
            text: "Referee Called",
        },
        {
            className: "letter-icon",
            style: { color: theme.primary, ...props.letterStyle },
            content: "S",
            text: "Susdivension",
        },
        {
            className: "letter-icon",
            style: { color: theme.primary, ...props.letterStyle },
            content: "O",
            text: "Overrule",
        },
        {
            className: "letter-icon",
            style: { color: theme.primary, ...props.letterStyle },
            content: "I",
            text: "Injury",
        },
        { className: "black card", style: {}, content: "", text: "Disqualified" },
        {
            className: "letter-icon sp",
            style: { color: theme.primary, ...props.letterStyle },
            content: "RET",
            text: "Retired",
        },
        {
            className: "letter-icon",
            style: { color: theme.primary, ...props.letterStyle },
            content: "C",
            text: "Service Court Error",
        },
    ];

    const dispatch = useDispatch();
    const foulHappend = (type) => {
        dispatch(infoActions.foulHappend(type));
    };
    const addEvent = (event) => {
        dispatch(infoActions.addEvent(event));
    };

    const eventClick = (type) => {
        props.setClose && props.setClose(false);
        if (type === "Referee Called")
            for (let index = info.events.length - 1; index >= 0; index--) {
                if (info.events[index].type !== "increaseBall") {
                    if (info.events[index].type === "score")
                        foulHappend({ foulType: type });
                    else
                        addEvent({ type, time: "", by: "none", content: "R" });
                    break;
                }
            }
        else if (type === "Overrule")
            addEvent({ type, time: "", by: "none", content: "O" });
        else if (type === "Service Court Error")
            addEvent({ type, time: "", by: "none", content: "C" });
        else
            foulHappend({ foulType: type });
    };

    useEffect(() => {
        for (let index = info.events.length - 1; index >= 0; index--) {
            if (info.events[index].type !== "increaseBall") {
                if (info.events[index].by == "none")
                    setDisableEvent(true);
                else
                    setDisableEvent(false);
                break;
            }
        }
    }, [info.eventCounter])

    return (
        <div className='events-container' style={props.style}>
            {events.map((item, index) =>
                info.foulHappend ? (
                    info.foulHappend === item.text ? (
                        <div className='event' style={{
                            ...props.eventStyle,
                            width: props.hide ? (index === 6 ? "8%" : "5%") : "17%",
                        }} key={index}>
                            {index === 6 && props.hide ? (
                                <div
                                    className='letter-icon'
                                    style={{ color: theme.primary, ...props.letterStyle }}
                                >
                                    DIS
                                </div>
                            ) : (
                                <div className={`${item.className}`} style={item.style}>
                                    {item.content}
                                </div>
                            )}
                            {!props.hide && item.text}
                        </div>
                    ) : (
                        <div className='event' style={{
                            ...props.eventStyle,
                            width: props.hide ? (index === 6 ? "8%" : "5%") : "17%",
                        }} key={index}>
                            <div style={item.style}></div>
                        </div>
                    )
                ) : (
                    <div
                        disabled={(index === 2 || index === 4 || index === 8) && disableEvent}
                        className='event'
                        style={{
                            ...props.eventStyle,
                            width: props.hide ? (index === 6 ? "8%" : "5%") : "17%",
                        }}
                        key={index}
                        onClick={() => eventClick(item.text)}
                    >
                        {index === 6 && props.hide ? (
                            <div
                                className='letter-icon'
                                style={{ color: theme.primary, ...props.letterStyle }}
                            >
                                DIS
                            </div>
                        ) : (
                            <div className={`${item.className}`} style={item.style}>
                                {item.content}
                            </div>
                        )}
                        {!props.hide && item.text}
                    </div>
                )
            )}
        </div>
    );
};

export default Events;
