/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./Selector.scss";
import Button from "../../../../components/UI/Button/Button"
import { useTheme } from "../../../../styles/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../../store/actions/setInfo"
import { useNavigate, useLocation } from "react-router-dom";
import { createSet } from "../../../../api/home";
import Loading from "../../../../components/UI/Loading/Loading";
import ErrorDialog from "../../../../components/UI/Error/ErrorDialog";

const Selector = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [options, setOptions] = useState([]);
    const [loading, setloading] = useState(false)
    const [title, setTitle] = useState(null);
    const [index, setIndex] = useState(1);
    const [max, setMax] = useState(2);
    const [redirect, setRedirect] = useState(null);
    const [dialog, setDialog] = useState(null)
    const info = useSelector((state) => state.info);
    const token = useSelector(state => state.auth.token)

    let navigate = useNavigate();
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const court = searchParams.get("court");
    const gym = searchParams.get("gym");

    const dispatch = useDispatch();
    const setChosen = (items) => {
        dispatch(infoActions.setChosen(items));
    };
    const setSetId = (id) => {
        dispatch(infoActions.setSetId(id));
    };
    useEffect(() => {
        if (!props.exitable)
            setIndex(2);
        if (info.team1.players.length === 1) {
            setMax(2);
        } else {
            setMax(3);
        }
        setRedirect(null);
    }, [])

    useEffect(() => {
        switch (index) {
            case 1:
                setTitle("Select team on your right");
                setOptions([{
                    id: info.team1.players[0].id,
                    text: (info.team1.players.map((player) => player.name)).join(" - "),
                    selected: false
                }, {
                    id: info.team2.players[0].id,
                    text: (info.team2.players.map((player) => player.name)).join(" - "),
                    selected: false
                },
                ])
                break;
            case 2:
                let players;
                setTitle("Select Server");
                if (props.exitable) {
                    players = [{
                        id: info.team1.players[0].id,
                        text: info.team1.players[0].name,
                        selected: false
                    }]
                    if (max === 3)
                        players = [...players, {
                            id: info.team1.players[1].id,
                            text: info.team1.players[1].name,
                            selected: false
                        }]
                    players = [...players, {
                        id: info.team2.players[0].id,
                        text: info.team2.players[0].name,
                        selected: false
                    }]
                    if (max === 3)
                        players = [...players, {
                            id: info.team2.players[1].id,
                            text: info.team2.players[1].name,
                            selected: false
                        }]
                } else {
                    if (info.team1.setWon > 0) {
                        players = [{
                            id: info.team1.players[0].id,
                            text: info.team1.players[0].name,
                            selected: false
                        }]
                        if (max === 3)
                            players = [...players, {
                                id: info.team1.players[1].id,
                                text: info.team1.players[1].name,
                                selected: false
                            }]
                    }
                    else if (info.team2.setWon > 0) {
                        players = [{
                            id: info.team2.players[0].id,
                            text: info.team2.players[0].name,
                            selected: false
                        }]
                        if (max === 3)
                            players = [...players, {
                                id: info.team2.players[1].id,
                                text: info.team2.players[1].name,
                                selected: false
                            }]
                    }
                }
                setOptions(players);
                break;
            case 3:
                if (max === 3) {
                    let players;
                    setTitle("Select Receiver");
                    if (info.team1.server === 0) {
                        players = info.team1.players.map((player) =>
                            ({ id: player.id, text: player.name, selected: false })
                        );
                    } else {
                        players = info.team2.players.map((player) =>
                            ({ id: player.id, text: player.name, selected: false })
                        );
                    }
                    setOptions(players);
                }
                break;
            default:
                setOptions([{ text: "Loading..." }])
                break;
        }
    }, [index]);

    useEffect(() => {
        (async () => {
            if (index > max && (info.team1.receiver === 0 || info.team2.receiver === 0)) {
                setloading(true)
                if (!props.exitable)
                    props.setShow(false);
                else {
                    const payload = {
                        gameId: props.selectedGameId,
                        teamA: {
                            isRightTeam: info.team1.isRightTeam,
                            server: info.team1.server,
                            receiver: info.team1.receiver,
                            isTop: info.team1.isTop,
                            players: info.team1.players.map(item => { return { player: item.id } })
                        },
                        teamB: {
                            isRightTeam: info.team2.isRightTeam,
                            server: info.team2.server,
                            receiver: info.team2.receiver,
                            isTop: info.team2.isTop,
                            players: info.team2.players.map(item => { return { player: item.id } })
                        }
                    }
                    const result = await createSet(payload, token)
                    if (result.success) {
                        setSetId(result.data)
                        props.setShow(false);

                    } else {
                        setDialog(null)
                        setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
                    }
                }
                setloading(false)
            }
        })()
    }, [index, info.team1, info.team2])

    const optionClick = (i) => {
        let updatedOptions = [...options];
        updatedOptions.forEach(option => {
            option.selected = false;
        });
        updatedOptions[i].selected = true;
        setOptions(updatedOptions);
        info.team1.players.forEach(player => {
            if (player.id === options[i].id) {
                setChosen({ index, id: player.id });
            }
        });
        info.team2.players.forEach(player => {
            if (player.id === options[i].id) {
                setChosen({ index, id: player.id });
            }
        });
        nextClick();
    }
    const nextClick = () => {
        setDialog(null)
        let valid = false;
        options.forEach(item => {
            if (item.selected) {
                valid = true;
            };
        });
        if (valid) {
            setIndex(index + 1);
        } else {
            setDialog(<ErrorDialog type="error">Please select one item</ErrorDialog>)
        }
    }
    const backClick = () => {
        if (index > 1)
            setIndex(index - 1);
        if (index === 1) {
            if (gym)
                navigate(`/my_games?gym=${gym}${court ? `$court=${court}` : ""}`)
            else if (court)
                navigate(`/my_games?court=${court}${gym ? `$gym=${gym}` : ""}`)
            else
                navigate(`/my_games`)
        }
        // props.setShow(false);
    }

    return (
        <div className="selector-component">
            {dialog}
            {redirect}
            <p className="title"
                style={{
                    fontSize: `${Math.min(window.innerWidth * 0.03, 18)}px`,
                }}
            >{title}</p>
            {
                loading ?
                    <Loading style={{ color: theme.on_background }} /> :
                    <>
                        <div className="options-container">
                            {options.map((item, i) =>
                                <div key={i} className="option-box" onClick={() => optionClick(i)}
                                    style={{
                                        borderColor: theme.primary,
                                        backgroundColor: item.selected ? theme.primary : "transparent",
                                        color: item.selected ? theme.on_primary : theme.on_background,
                                        fontSize: `${Math.min(window.innerWidth * 0.032, 19)}px`,
                                    }}
                                >
                                    {item.text}
                                </div>
                            )}
                        </div>
                        <div className="action-btns">
                            {(props.exitable || index > 2) &&
                                <p className="prev"
                                    onClick={backClick}
                                    style={{
                                        color: theme.secondary
                                    }}
                                >
                                    {index === 1 ? "Exit" : "Back"}
                                </p>}
                            {/* <Button onClick={nextClick}>{index === max ? "Save" : "Next"}</Button> */}
                        </div>
                    </>
            }
        </div>
    )
}

export default Selector
