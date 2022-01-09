import { useState, useEffect } from "react";
import "./Selector.scss";
import Button from "../../../../components/UI/Button/Button"
import { stringFa } from "../../../../assets/strings/stringFaCollection"
import { useTheme } from "../../../../styles/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import * as infoActions from "../../../../store/actions/setInfo"
import { Navigate } from "react-router-dom";
import { createSet } from "../../../../api/home";
import Loading from "../../../../components/UI/Loading/Loading";

const Selector = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const [options, setOptions] = useState([]);
    const [loading, setloading] = useState(false)
    const [title, setTitle] = useState(null);
    const [index, setIndex] = useState(1);
    const [max, setMax] = useState(2);
    const [redirect, setRedirect] = useState(null);
    const info = useSelector((state) => state.info);
    const token = useSelector(state => state.auth.token)

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
                setTitle("تیم سمت راست خود را انتخاب کنید");
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
                setTitle("زننده سرویس را انتخاب کنید");
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
                    setTitle("دریافت کننده را مشخص کنید");
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
                setOptions([{ text: "درحال بارگزاری" }])
                break;
        }
    }, [index]);
    useEffect(async () => {
        if (index > max && (info.team1.receiver === 0 || info.team2.receiver === 0)) {
            setloading(true)
            if (window.location.pathname === "/scoreboard")
                props.setShow(false);
            else {
                const payload = {
                    gameId: props.selectedGameId,
                    teamA: {
                        isRightTeam: info.team1.isRightTeam,
                        server: info.team1.server,
                        receiver: info.team1.receiver,
                        players: info.team1.players.map(item => { return { player: item.id } })
                    },
                    teamB: {
                        isRightTeam: info.team2.isRightTeam,
                        server: info.team2.server,
                        receiver: info.team2.receiver,
                        players: info.team2.players.map(item => { return { player: item.id } })
                    }
                }
                const result = await createSet(payload, token)
                if (result.success) {
                    setSetId(result.data)
                    setRedirect(<Navigate to="/scoreboard" />)
                } else {
                    alert(result.error)
                }
            }
            setloading(false)
        }
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
        let valid = false;
        options.forEach(item => {
            if (item.selected) {
                valid = true;
            };
        });
        if (valid) {
            setIndex(index + 1);
        } else {
            alert("لطفا یک گزینه را انتخاب کنید");
        }
    }
    const backClick = () => {
        if (index > 1)
            setIndex(index - 1);
        if (index === 1)
            props.show(false);
    }

    return (
        <div className="selector-component">
            {redirect}
            <p className="title">{title}</p>
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
                                        color: item.selected ? theme.on_primary : theme.on_background
                                    }}
                                >
                                    {item.text}
                                </div>
                            )}
                        </div>
                        <div className="action-btns">
                            {(props.exitable || index > 2) && <p className="prev" onClick={backClick}>
                                {index === 1 ? "خروج" : "بازگشت"}
                            </p>}
                            <Button onClick={nextClick}>{index === max ? "ذخیره" : stringFa.next}</Button>
                        </div>
                    </>
            }
        </div>
    )
}

export default Selector
