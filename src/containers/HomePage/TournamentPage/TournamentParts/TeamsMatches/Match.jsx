/* eslint-disable react-hooks/exhaustive-deps */
import "./TeamsMatches.scss";
import TransparentButton from "../../../../../components/UI/Button/TransparentButton/TransparentButton";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../../styles/ThemeProvider";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import { useEffect, useState } from "react";
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog";
import { dynamicApi } from "../../../../../api/home";
import { useSelector } from "react-redux";
import { IoTrashBin } from "react-icons/io5";
import TextComponent from "../../../../../components/UI/TextComponent/TextComponent";

const Match = ({ onShowGame, createAccess, data, day, index, setShowGames, referees, teams, tournamentId }) => {
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null)
    const [order, setOrder] = useState({
        teamA: {
            text: "",
            id: "",
            invalid: false,
            touched: true,
            shouldValidate: true,
            validationMessage: "",

        },
        teamB: {
            text: "",
            id: "",
            invalid: false,
            validationMessage: "",
            touched: true,
            shouldValidate: true,
        },
        referee: {
            text: "",
            id: "",
            invalid: false,
            validationMessage: "",
            touched: true,
            shouldValidate: true,
        }
    })
    const [saved, setSaved] = useState(false)

    const { token } = useSelector(state => state.auth)

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onChange = (value, key) => {
        if (saved)
            setSaved(false)
        let updatedOrder = { ...order }
        updatedOrder[key].text = value.text;
        updatedOrder[key].id = value.id;
        for (const key in updatedOrder) {
            updatedOrder[key].invalid = false
        }
        setOrder(updatedOrder)
    }
    const onSave = async () => {
        setLoading(true)
        setDialog(null)
        if (!day || !day.date)
            setDialog(<ErrorDialog type="error">{stringFa.select_date}</ErrorDialog>)
        try {
            let payload, url;
            if (data) {
                payload = {
                    refereeId: order.referee.id,
                    teamAId: order.teamA.id,
                    teamBId: order.teamB.id,
                    dayId: day._id,
                    matchId: data._id
                }
                url = 'edit_match'
            }
            else {
                payload = {
                    refereeId: order.referee.id,
                    teamAId: order.teamA.id,
                    teamBId: order.teamB.id,
                    tournamentId,
                    dayId: day._id
                }
                url = 'create_match'
            }
            const result = await dynamicApi(payload, token, url)
            if (result.success) {
                setDialog(<ErrorDialog type='success'>{result.data.message}</ErrorDialog>)
            }
            else {
                let updatedOrder = { ...order }
                switch (result.data.type) {
                    case 0:
                        setDialog(<ErrorDialog type='error'>{result.data.message}</ErrorDialog>)
                        break;
                    case 1:
                        updatedOrder.teamA.invalid = true
                        updatedOrder.teamA.validationMessage = result.data.message
                        break;
                    case 2:
                        updatedOrder.teamB.invalid = true
                        updatedOrder.teamB.validationMessage = result.data.message
                        break;
                    case 3:
                        updatedOrder.referee.invalid = true
                        updatedOrder.referee.validationMessage = result.data.message
                        break;
                    default:
                        setDialog(<ErrorDialog type='error'>{result.data.message}</ErrorDialog>)
                        break;
                }
                setOrder(updatedOrder)
            }
            setSaved(true)
        } catch (error) {
            setLoading(false)
            setSaved(true)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
        setLoading(false)

    }
    const onRemove = async () => {
        setDialog(null)
        if (!data)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        try {
            let payload = {
                matchId: data._id
            }
            const result = await dynamicApi(payload, token, 'remove_match_from_day')
            if (result.success) {
                setDialog(<ErrorDialog type='success'>{result.data.message}</ErrorDialog>)
                setOrder({
                    teamA: {
                        text: "",
                        id: "",
                        invalid: false,
                        touched: true,
                        shouldValidate: true,
                        validationMessage: "",

                    },
                    teamB: {
                        text: "",
                        id: "",
                        invalid: false,
                        validationMessage: "",
                        touched: true,
                        shouldValidate: true,
                    },
                    referee: {
                        text: "",
                        id: "",
                        invalid: false,
                        validationMessage: "",
                        touched: true,
                        shouldValidate: true,
                    }
                })
            }
            else {
                setDialog(<ErrorDialog type='error'>{result.data.message}</ErrorDialog>)
            }
            setSaved(true)
        } catch (error) {
            setSaved(true)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }

    }
    useEffect(() => {
        if (!data) {
            let updatedOrder = { ...order }
            updatedOrder.referee.id = ''
            updatedOrder.referee.text = ''

            updatedOrder.teamA.id = ''
            updatedOrder.teamA.text = ''

            updatedOrder.teamB.id = ''
            updatedOrder.teamB.text = ''
            setOrder(updatedOrder)
            return;
        };
        let updatedOrder = { ...order }
        updatedOrder.referee.id = data.referee._id
        updatedOrder.referee.text = data.referee.username

        updatedOrder.teamA.id = data.teamA._id
        updatedOrder.teamA.text = data.teamA.name

        updatedOrder.teamB.id = data.teamB._id
        updatedOrder.teamB.text = data.teamB.name
        setOrder(updatedOrder)
        setSaved(true)
    }, [data])
    return <>
        {dialog}
        <div className="table-row-content">

            <div
                className={`table-row-header ${index > 0 ? "not-main" : ""}`}
                style={{
                    color: theme.primary,
                }}
            >
                <p>{stringFa.home}</p>
                <p>{stringFa.away}</p>
                <p>{stringFa.referee}</p>
            </div>
            <div className="table-row-body"
                style={{
                    borderColor: theme.border_color,
                }}
            >
                <div className="table-row-item">
                    {
                        createAccess ?
                            <CustomInput
                                elementType={elementTypes.dropDown}
                                // inputContainer={{ padding: "0" }}
                                items={teams ? teams : []}
                                onChange={e => onChange(e, 'teamA')}
                                value={order.teamA.text}
                                invalid={order.teamA.invalid}
                                touched={order.teamA.touched}
                                shouldValidate={order.teamA.shouldValidate}
                                placeHolder={stringFa.undefined}
                                validationMessage={order.teamA.validationMessage}
                            />
                            :
                            <TextComponent
                                value={order.teamA.text}
                                style={{ justifyContent: "center" }}
                            />
                    }
                </div>
                <div className="table-row-item">
                    {createAccess ?
                        <CustomInput
                            elementType={elementTypes.dropDown}
                            // inputContainer={{ padding: "0" }}
                            items={teams ? teams : []}
                            onChange={e => onChange(e, 'teamB')}
                            value={order.teamB.text}
                            invalid={order.teamB.invalid}
                            placeHolder={stringFa.undefined}
                            touched={order.teamA.touched}
                            shouldValidate={order.teamA.shouldValidate}
                            validationMessage={order.teamB.validationMessage}
                        />
                        :
                        <TextComponent
                            value={order.teamB.text}
                            style={{ justifyContent: "center" }}
                        />
                    }

                </div>
                <div className="table-row-item">
                    {
                        createAccess ?
                            <CustomInput
                                elementType={elementTypes.dropDown}
                                // inputContainer={{ padding: "0" }}
                                items={referees ? referees : []}
                                onChange={e => onChange(e, 'referee')}
                                value={order.referee.text}
                                invalid={order.referee.invalid}
                                placeHolder={stringFa.undefined}
                                shouldValidate={order.teamA.shouldValidate}
                                touched={order.teamA.touched}
                                validationMessage={order.referee.validationMessage}
                            /> :
                            <TextComponent
                                value={order.referee.text}
                                style={{ justifyContent: "center" }}
                            />
                    }
                </div>
            </div>
        </div>
        <div className={`table-row-btns ${index === 0 ? 'btn-alignment' : ''}`}>
            {
                createAccess &&
                <TransparentButton
                    ButtonStyle={{
                        padding: "0",
                        fontSize: "clamp(0.8rem,1vw,0.9rem)",
                        color: theme.error
                    }}
                    config={{
                        disabled: !data
                    }}
                    onClick={() => onRemove()}
                >
                    <IoTrashBin />
                </TransparentButton>
            }
            {
                createAccess &&
                <TransparentButton
                    ButtonStyle={{
                        padding: "0",
                        fontSize: "clamp(0.8rem,1vw,0.9rem)",
                        color: theme.secondary
                    }}
                    onClick={onSave}
                    config={{
                        disabled: (saved) || (!order.referee.id || !order.teamA.id || !order.teamB.id)
                    }}

                    loading={loading}
                >
                    {stringFa.save}
                </TransparentButton>
            }
            {
                data?.games?.length > 0 &&
                <TransparentButton
                    ButtonStyle={{
                        padding: "0",
                        fontSize: "clamp(0.8rem,1vw,0.9rem)",
                    }}
                    config={{

                    }}
                    onClick={() => {
                        onShowGame(data?._id)
                        setShowGames(true)
                    }}
                >
                    {stringFa.show_games}
                </TransparentButton>
            }

        </div>
    </>;
};

export default Match;
