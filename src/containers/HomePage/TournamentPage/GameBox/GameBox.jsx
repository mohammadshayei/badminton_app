import { stringFa } from "../../../../assets/strings/stringFaCollection";
import TransparentButton from "../../../../components/UI/Button/TransparentButton/TransparentButton";
import CustomInput, { elementTypes } from "../../../../components/UI/CustomInput/CustomInput";
import { useTheme } from "../../../../styles/ThemeProvider";
import "./GameBox.scss";
import { IoTrashBin } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const GameBox = ({
    game,
    games,
    setGames,
    landNumbers,
    teamsName,
    listAPlayers,
    listBPlayers,
    officials,
    onChangeCourt_GameNumber,
    onChange,
    onRemove,
    onSave,
    toggle,
    itemLoading,
    toggleType,
    createAccess
}) => {

    const themeState = useTheme();
    const theme = themeState.computedTheme;
    let navigate = useNavigate()

    const getReport = (id) => {
        navigate(`/report?id=${id}`);
    }

    return <div className="tournament-game-box"
        style={{
            backgroundColor: theme.surface
        }}
    >
        <div className="match-game-header">
            <div className="match-game-number">
                <CustomInput
                    elementConfig={{
                        placeholder: stringFa.number_of_game,
                    }}
                    inputContainer={{
                        padding: "0",
                        width: "100px",
                    }}
                    inputStyle={{
                        fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                        minWidth: "100px",
                        direction: "ltr"
                    }}
                    onChange={(e) => onChangeCourt_GameNumber(e, game._id, 'gameNumber')}
                    value={game.gameNumber}
                />
            </div>
            <div className="match-game-index"
                style={{
                    backgroundColor: game.status > -1 ? theme.primary : theme.darken_border_color, //if done -> theme.primary
                    color: theme.on_primary,
                    cursor: toggleType ? 'pointer' : 'auto'
                }}
                onClick={() => toggleType && toggleType(game._id)}
            >{game.title}
            </div>
            {game.status > 1 &&
                <div className="match-game-report"
                    style={{ color: theme.secondary }}
                    onClick={() => {
                        if (game.status === 3) getReport(game._id)
                    }}
                >
                    {game.status === 3 &&
                        <p style={{ cursor: 'pointer' }}>{stringFa.game_scoresheet}</p>
                    }
                    {game.status === 2 &&
                        <div className="live-indicator" />
                    }
                </div>
            }

            <div className="match-game-number  game-court">
                <CustomInput
                    placeHolder={'court'}
                    elementType={elementTypes.dropDown}
                    onChange={(e) => onChangeCourt_GameNumber(e, game._id, 'court')}
                    items={landNumbers}
                    value={game.court.value}
                    inputStyle={{
                        fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                        minWidth: "50px",
                        direction: "ltr"
                    }}
                    inputContainer={{
                        padding: "0",
                        width: "100px",
                    }}
                />
            </div>
        </div>
        <div className="match-game-details">
            {
                Object.entries(game.players).map(([k2, v]) =>
                    <div key={k2} className={`game-detail-section ${k2 === 'b' ? "left" : ''}`}>
                        {teamsName && <div className="detail-name">
                            {k2 === 'b' ? teamsName.b : teamsName.a}
                        </div>}
                        <div className="detail-items">
                            {[...new Array(v.length)].map((_, k3) =>
                                <div key={k3} className="detail-item">
                                    <CustomInput
                                        placeHolder={stringFa.undefined}
                                        elementType={elementTypes.dropDown}
                                        items={k2 === 'b' ? listBPlayers?.map(item => {
                                            return {
                                                id: item._id,
                                                text: item.username,
                                            }
                                        }) : listAPlayers?.map(item => {
                                            return {
                                                id: item._id,
                                                text: item.username,
                                            }
                                        })}
                                        onChange={(e) => onChange(e, game._id, k2, k3, 'player')}
                                        value={game.players[k2][k3].value}
                                        inputContainer={{ padding: "0" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>)
            }
        </div>
        <div className="match-game-details match-game-officials"
            style={{
                backgroundColor: game.officials.umpire[0]._id ? theme.primary : theme.border_color,
                padding: game.officialsOpen ? "0.5rem" : "0",
                maxHeight: game.officialsOpen ? "250px" : "1px",
            }}
        >
            {
                Object.entries(game.officials).map(([k2, v]) =>
                    <div key={k2} className={`game-detail-section ${k2 === 'serviceJudge' ? "left" : ''}`}
                        style={{ opacity: game.officialsOpen ? 1 : 0 }}
                    >
                        <div className="detail-name">
                            {k2 === 'serviceJudge' ? 'داور سرویس' : 'داور'}
                        </div>
                        {[...new Array(v.length)].map((_, k3) =>
                            <div key={k3} className="detail-items">
                                <CustomInput
                                    placeHolder={stringFa.undefined}
                                    elementType={elementTypes.dropDown}
                                    items={officials.map(item => {
                                        return {
                                            id: item.referee._id,
                                            text: item.referee.username,
                                        }
                                    })}
                                    inputContainer={{ padding: "0" }}
                                    onChange={(e) => onChange(e, game._id, k2, k3, 'official')}
                                    value={game.officials[k2][k3].value}
                                />
                            </div>
                        )}
                    </div>)
            }
        </div>

        <div className="match-game-buttons">
            {
                createAccess &&
                <>
                    <TransparentButton
                        ButtonStyle={{
                            padding: "0",
                            margin: "0 0.5rem",
                            fontSize: "clamp(0.8rem,1vw,0.9rem)",
                            color: theme.error
                        }}
                        config={{
                            disabled: toggleType ? !(game?.fetched) :
                                game?._id.length === 1
                        }}
                        onClick={() => onRemove(game._id)}
                        loading={itemLoading.type === 'delete' && itemLoading.content === game._id}
                    >
                        <IoTrashBin />
                    </TransparentButton>
                    <TransparentButton
                        config={{
                            disabled: !(
                                !game.saved &&
                                game.court && game.gameNumber
                                // && game.officials.serviceJudge[0].value
                                // && game.officials.umpire[0].value
                                && game.players.a.findIndex(item => !item.value) < 0
                                && game.players.b.findIndex(item => !item.value) < 0)

                        }}
                        loading={itemLoading.type === 'save' && itemLoading.content === game._id}
                        ButtonStyle={{
                            padding: "0",
                            margin: "0 0.5rem",
                            fontSize: "clamp(0.8rem,1vw,0.9rem)",
                            color: theme.secondary
                        }}
                        onClick={() => onSave(game._id)}
                    >
                        {stringFa.save}
                    </TransparentButton>
                </>
            }
            <TransparentButton
                ButtonStyle={{
                    padding: "0",
                    margin: "0 0.5rem",
                    fontSize: "clamp(0.6rem,0.9vw,0.8rem)",
                }}
                onClick={() => toggle(game._id)}
            >
                {game.officialsOpen ? '- ' : '+ '}{stringFa.officials}
            </TransparentButton>
        </div>
    </div >;
};

export default GameBox;
