import "./Overview.scss"
import { useTheme } from "../../../../../styles/ThemeProvider.js";
import { useEffect, useState } from 'react';
import React from 'react'
import { useSelector } from "react-redux";
import Day from "../Day";
import Skeleton from "react-loading-skeleton";
import { dynamicApi } from "../../../../../api/home";
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import { Fragment } from "react";
import { useNavigate } from "react-router";
import IMAGE from '../../../../../assets/images/user_avatar.svg';
import { baseUrl } from "../../../../../constants/Config";

const Overview = ({ tournamentId, createAccess }) => {
    const [tournamentDays, setTournamentDays] = useState([]);
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dateValue, setDateValue] = useState('')
    const [games, setGames] = useState([])
    const { token, socket } = useSelector(state => state.auth)


    const themeState = useTheme();
    const theme = themeState.computedTheme;

    let navigate = useNavigate()

    const selectDay = async (key) => {
        let selected;
        let updatedTournamentsDay = tournamentDays.map(item => {
            if (item._id === key)
                selected = item
            return {
                ...item,
                selected: item._id === key
            }
        })
        setTournamentDays(updatedTournamentsDay)
        setDateValue(selected.date)

        setDialog(null)
        try {
            setLoading(true)
            let payload = {
                tournamentId,
                dayId: key,
            }
            const result = await dynamicApi(payload, token, 'get_overview_free_ranking_day')
            if (!result.success) {
                setDialog(<ErrorDialog type="error"> {result.data.message}</ErrorDialog >)
            }
            else {
                let updatedGames = result.data.selectedDay.games.map(item => {
                    return {
                        _id: item.game._id,
                        title: `بازی شماره ${item.game.game_number}`,
                        players: {
                            a: item.game.teamA.players.map(i => {
                                return {
                                    _id: i.player._id,
                                    username: i.player.username,
                                    image: i.player.image
                                }
                            }), b: item.game.teamB.players.map(i => {
                                return {
                                    _id: i.player._id,
                                    username: i.player.username,
                                    image: i.player.image
                                }
                            }),
                        },
                        status: item.game.status,
                        scores: {
                            a: item.game.sets.map(i => {
                                return {
                                    score: i.set.teamA.score,
                                    winner: i.set.teamA.setWon
                                }
                            }),
                            b: item.game.sets.map(i => {
                                return {
                                    score: i.set.teamB.score,
                                    winner: i.set.teamB.setWon
                                }
                            }),
                        }
                    }
                })
                setGames(updatedGames)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
        }
    }
    const getReport = (id) => {
        navigate(`/report?id=${id}`);
    }
    const onGoToLiveScore = (id) => {
        navigate(`/scoreboard_view?gameId=${id}`)
    }

    useEffect(() => {
        setDialog(null)
        if (!tournamentId) return;
        (async () => {
            try {
                setLoading(true)
                const fetchedData = await dynamicApi({ id: tournamentId }, token, 'get_overview_days_free_ranking')
                let updatedTournamentsDay = fetchedData.data.days.map(item => {
                    return {
                        _id: item._id,
                        date: item.date ? item.date : '',
                        counter: item.number + 1,
                        status: item.status,
                        selected: item._id === fetchedData.data.selectedDay._id,
                    }
                })
                setDateValue(fetchedData.data.selectedDay.date ? fetchedData.data.selectedDay.date : '')
                setTournamentDays(updatedTournamentsDay)
                let updatedGames = fetchedData.data.selectedDay.games.map(item => {
                    return {
                        _id: item.game._id,
                        title: `بازی شماره ${item.game.game_number}`,
                        players: {
                            a: item.game.teamA.players.map(i => {
                                return {
                                    _id: i.player._id,
                                    username: i.player.username,
                                    image: i.player.image
                                }
                            }), b: item.game.teamB.players.map(i => {
                                return {
                                    _id: i.player._id,
                                    username: i.player.username,
                                    image: i.player.image
                                }
                            }),
                        },
                        status: item.game.status,
                        scores: {
                            a: item.game.sets.map(i => {
                                return {
                                    score: i.set.teamA.score,
                                    winner: i.set.teamA.setWon
                                }
                            }),
                            b: item.game.sets.map(i => {
                                return {
                                    score: i.set.teamB.score,
                                    winner: i.set.teamB.setWon
                                }
                            }),
                        }
                    }
                })
                setGames(updatedGames)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setLoading(false)
        })()
    }, [tournamentId])
    return (
        <div className="tournament-overview-container">
            {dialog}
            <div className="days-and-gym-selector">
                <div className="day-selector-container">
                    {tournamentDays ?
                        tournamentDays.map(day =>
                            <Day
                                key={day._id}
                                day={day}
                                selectDay={() => selectDay(day._id)}
                            />
                        ) :
                        [...Array(5).keys()].map((v) =>
                            <Skeleton
                                key={v}
                                className="day"
                                style={{ border: "none" }}
                            />
                        )
                    }
                </div>
            </div>
            <div className="games-container">
                {
                    games?.length > 0 ? games.map((game) =>
                        <div key={game._id} className="a-match-game"
                            style={{
                                borderColor: theme.darken_border_color
                            }}
                        >
                            <div className="match-game-index"
                                style={{
                                    backgroundColor: theme.surface,
                                    color: theme.on_surface
                                }}
                            >{game.title}</div>
                            {token && game.status === 3 &&
                                <div className="match-game-report"
                                    style={{ color: theme.secondary }}
                                    onClick={() => getReport(game._id)}
                                >
                                    {stringFa.game_scoresheet}
                                </div>
                            }
                            <div className="match-game-details">
                                {Object.entries(game.players).map(([key, players]) =>
                                    <Fragment key={key}>
                                        <div className={`match-game-team ${key === "b" ? "left" : ''}`}>
                                            <div className="players">
                                                {players.map((player, i) =>
                                                    <div key={player._id} className="player"
                                                        style={{
                                                            marginTop: i > 0 ? "0.25rem" : 0
                                                        }}
                                                    >
                                                        <img className="player-image" src={!player.image ? IMAGE : `${baseUrl}uploads/players/${player.image}`} alt="avatar" />
                                                        <div className="player-name">{player.username}</div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="scores">
                                                {game.status === 3 && game.scores[key].map((item, k4) =>
                                                    <p style={{ fontWeight: item.winner && 'bold' }} key={k4}>
                                                        {item.score}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {key === 'a' ?
                                            game.status === 2 ?
                                                <div className="live-game"
                                                    onClick={() => onGoToLiveScore(game._id)}
                                                    style={{ color: theme.secondary, cursor: "pointer" }}>
                                                    {stringFa.live_score}
                                                    <div className="live-indicator" />
                                                </div> :
                                                <p className="dash">-</p> :
                                            ''
                                        }
                                    </Fragment>
                                )}

                            </div>
                        </div>
                    ) :
                        <div>بازی ای برای این روز تعریف نشده است</div>
                }
            </div>
        </div>
    )
}

export default Overview



























// import { SingleEliminationBracket, Match, MATCH_STATES, SVGViewer, createTheme } from '@g-loot/react-tournament-brackets';
// function useWindowSize() {
//     // Initialize state with undefined width/height so server and client renders match
//     // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
//     const [windowSize, setWindowSize] = useState({
//         width: undefined,
//         height: undefined,
//     });
//     useEffect(() => {
//         // Handler to call on window resize
//         function handleResize() {
//             // Set window width/height to state
//             setWindowSize({
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             });
//         }
//         // Add event listener
//         window.addEventListener("resize", handleResize);
//         // Call handler right away so state gets updated with initial window size
//         handleResize();
//         // Remove event listener on cleanup
//         return () => window.removeEventListener("resize", handleResize);
//     }, []); // Empty array ensures that effect is only run on mount
//     return windowSize;
// }
// const Overview = () => {

//     const size = useWindowSize();
//     const finalWidth = size.width;
//     const finalHeight = size.height - 120;

//     const themeState = useTheme();
//     const theme = themeState.computedTheme;

//     const CostumeTheme = createTheme({
//         textColor: { main: theme.on_surface, highlighted: theme.on_surface, dark: theme.darken_border_color },
//         matchBackground: { wonColor: theme.darken_border_color, lostColor: theme.border_color },
//         score: {
//             background: { wonColor: theme.background_color, lostColor: theme.background_color },
//             text: { highlightedWonColor: theme.secondary, highlightedLostColor: theme.error },
//         },
//         border: {
//             color: theme.border_color,
//             highlightedColor: theme.secondary,
//         },
//         roundHeader: { backgroundColor: theme.secondary, fontColor: theme.on_secondary },
//         connectorColor: theme.darken_border_color,
//         connectorColorHighlight: theme.secondary,
//         svgBackground: theme.background_color,
//     });

//     return (
//         <div className="tournament-overview-container">
//             <SingleEliminationBracket
//                 matches={matches}
//                 matchComponent={Match}
//                 theme={CostumeTheme}
//                 options={{
//                     style: {
//                         roundHeader: {
//                             backgroundColor: CostumeTheme.roundHeader.backgroundColor,
//                             fontColor: CostumeTheme.roundHeader.fontColor,
//                         },
//                         connectorColor: CostumeTheme.connectorColor,
//                         connectorColorHighlight: CostumeTheme.connectorColorHighlight,
//                     },
//                 }}
//                 svgWrapper={({ children, ...props }) => (
//                     <SVGViewer
//                         background={CostumeTheme.svgBackground}
//                         SVGBackground={CostumeTheme.svgBackground}
//                         width={finalWidth}
//                         height={finalHeight}
//                         {...props}
//                     >
//                         {children}
//                     </SVGViewer>
//                 )}
//             />
//         </div>
//     )
// }
// export default Overview
// export const matches = [
//     {
//         id: 19876,
//         name: 'Final - Match',
//         nextLooserMatchId: null,
//         nextMatchId: null,
//         participants: [
//             {
//                 id: '059743f7-9501-471e-8f9e-2d1032eccc67',
//                 isWinner: false,
//                 name: 'محمد پایروند',
//                 picture: null,
//                 resultText: '',
//                 status: null
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'DONE',
//         tournamentRoundText: '4'
//     },
//     {
//         id: 19877,
//         name: 'Semi Final - Match 1',
//         nextLooserMatchId: null,
//         nextMatchId: 19876,
//         participants: [
//             {
//                 id: 'acf45434-78a1-4907-bf19-92235d180e8b',
//                 isWinner: false,
//                 name: 'مهران شهبازی',
//                 picture: null,
//                 resultText: '',
//                 status: null
//             },
//             {
//                 id: '6d9ec9e8-d10d-424b-a00f-2078d4e08d39',
//                 isWinner: false,
//                 name: 'علی علیزاده',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: '',
//                 status: null
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'DONE',
//         tournamentRoundText: '3'
//     },
//     {
//         id: 19884,
//         name: 'Semi Final - Match 2',
//         nextLooserMatchId: null,
//         nextMatchId: 19876,
//         participants: [
//             {
//                 id: '059743f7-9501-471e-8f9e-2d1032eccc67',
//                 isWinner: true,
//                 name: 'محمد پایروند',
//                 picture: null,
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             },
//             {
//                 id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
//                 isWinner: false,
//                 name: 'علیرضا کرمی',
//                 picture: null,
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '3'
//     },
//     {
//         id: 19878,
//         name: 'Round 2 - Match 1',
//         nextLooserMatchId: null,
//         nextMatchId: 19877,
//         participants: [
//             {
//                 id: 'a552ca06-579d-41ee-9405-4cedd187c5bf',
//                 isWinner: false,
//                 name: 'بهمن چگینی نکو',
//                 picture: null,
//                 resultText: '1',
//                 status: MATCH_STATES.PLAYED
//             },
//             {
//                 id: '6d9ec9e8-d10d-424b-a00f-2078d4e08d39',
//                 isWinner: true,
//                 name: 'علی علیزاده',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: '2',
//                 status: MATCH_STATES.PLAYED
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'DONE',
//         tournamentRoundText: '2'
//     },
//     {
//         id: 19881,
//         name: 'Round 2 - Match 2',
//         nextLooserMatchId: null,
//         nextMatchId: 19877,
//         participants: [
//             {
//                 id: 'acf45434-78a1-4907-bf19-92235d180e8b',
//                 isWinner: true,
//                 name: 'مهران شهبازی',
//                 picture: null,
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             },
//             {
//                 id: 'fdce979a-002e-4906-a80f-d161f108bcde',
//                 isWinner: false,
//                 name: 'میلاد شهابی نژاد',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '2'
//     },
//     {
//         id: 19885,
//         name: 'Round 2 - Match 3',
//         nextLooserMatchId: null,
//         nextMatchId: 19884,
//         participants: [
//             {
//                 id: 'c7a2ec6b-389f-429d-819e-53594e94d475',
//                 isWinner: false,
//                 name: 'کامبیز جعفری',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             },
//             {
//                 id: '059743f7-9501-471e-8f9e-2d1032eccc67',
//                 isWinner: true,
//                 name: 'محمد پایروند',
//                 picture: null,
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '2'
//     },
//     {
//         id: 19888,
//         name: 'Round 2 - Match 4',
//         nextLooserMatchId: null,
//         nextMatchId: 19884,
//         participants: [
//             {
//                 id: 'ce914b1b-fe1e-4be9-8409-681049265614',
//                 isWinner: false,
//                 name: 'محسن معصومی',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             },
//             {
//                 id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
//                 isWinner: true,
//                 name: 'علیرضا کرمی',
//                 picture: null,
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '2'
//     },
//     {
//         id: 19879,
//         name: 'Round 1 - Match 1',
//         nextLooserMatchId: null,
//         nextMatchId: 19878,
//         participants: [
//             {
//                 id: 'bcbe20a3-82b5-4818-bb29-4c1149e9f04e',
//                 isWinner: false,
//                 name: 'آرمین مدیری',
//                 picture: 'teamlogos/px6aikyzeej5vhecturj',
//                 resultText: 'WO',
//                 status: MATCH_STATES.WALK_OVER
//             },
//             {
//                 id: 'a552ca06-579d-41ee-9405-4cedd187c5bf',
//                 isWinner: true,
//                 name: 'بهمن چگینی نکو',
//                 picture: null,
//                 resultText: '',
//                 status: MATCH_STATES.PLAYED
//             }
//         ],
//         startTime: '2021-05-30',
//         state: MATCH_STATES.WALK_OVER,
//         tournamentRoundText: '1'
//     },
//     {
//         id: 19880,
//         name: 'Round 1 - Match 2',
//         nextLooserMatchId: null,
//         nextMatchId: 19878,
//         participants: [
//             {
//                 id: '5acb196d-5f82-47f3-ae5a-2e87d070f610',
//                 isWinner: false,
//                 name: 'کریم کریمی',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             },
//             {
//                 id: '6d9ec9e8-d10d-424b-a00f-2078d4e08d39',
//                 isWinner: true,
//                 name: 'علی علیزاده',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '1'
//     },
//     {
//         id: 19882,
//         name: 'Round 1 - Match 3',
//         nextLooserMatchId: null,
//         nextMatchId: 19881,
//         participants: [
//             {
//                 id: 'acf45434-78a1-4907-bf19-92235d180e8b',
//                 isWinner: true,
//                 name: 'مهران شهبازی',
//                 picture: null,
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             },
//             {
//                 id: 'be2db859-515f-4159-9051-6723d0b47eb7',
//                 isWinner: false,
//                 name: 'حمید هیراد',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '1'
//     },
//     {
//         id: 19883,
//         name: 'Round 1 - Match 4',
//         nextLooserMatchId: null,
//         nextMatchId: 19881,
//         participants: [
//             {
//                 id: 'fdce979a-002e-4906-a80f-d161f108bcde',
//                 isWinner: true,
//                 name: 'میلاد شهابی نژاد',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             },
//             {
//                 id: 'b264744c-0114-46b9-ab28-a7f56aded7bd',
//                 isWinner: false,
//                 name: 'مهدی آل فقیه',
//                 picture: null,
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '1'
//     },
//     {
//         id: 19886,
//         name: 'Round 1 - Match 5',
//         nextLooserMatchId: null,
//         nextMatchId: 19885,
//         participants: [
//             {
//                 id: 'd9a7b576-9d7e-430c-aa7e-6401d6eb7cf8',
//                 isWinner: false,
//                 name: 'جواد محمدی',
//                 picture: null,
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             },
//             {
//                 id: 'c7a2ec6b-389f-429d-819e-53594e94d475',
//                 isWinner: true,
//                 name: 'کامبیز جعفری',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '1'
//     },
//     {
//         id: 19887,
//         name: 'Round 1 - Match 6',
//         nextLooserMatchId: null,
//         nextMatchId: 19885,
//         participants: [
//             {
//                 id: '8411c4ef-f337-42c9-bff9-63c2f0e80255',
//                 isWinner: false,
//                 name: 'حسن شیرازی',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             },
//             {
//                 id: '059743f7-9501-471e-8f9e-2d1032eccc67',
//                 isWinner: true,
//                 name: 'محمد پایروند',
//                 picture: null,
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '1'
//     },
//     {
//         id: 19889,
//         name: 'Round 1 - Match 7',
//         nextLooserMatchId: null,
//         nextMatchId: 19888,
//         participants: [
//             {
//                 id: 'ce914b1b-fe1e-4be9-8409-681049265614',
//                 isWinner: true,
//                 name: 'محسن معصومی',
//                 picture: 'teamlogos/client_team_default_logo',
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             },
//             {
//                 id: '86cd4ff0-14ae-445c-820a-777fe448cddb',
//                 isWinner: false,
//                 name: 'محمد علی فقیه خراسانی',
//                 picture: null,
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '1'
//     },
//     {
//         id: 19890,
//         name: 'Round 1 - Match 8',
//         nextLooserMatchId: null,
//         nextMatchId: 19888,
//         participants: [
//             {
//                 id: '51c449a7-fb04-445a-b478-1ca95feeeafa',
//                 isWinner: true,
//                 name: 'علیرضا کرمی',
//                 picture: null,
//                 resultText: 'Won',
//                 status: 'PLAYED'
//             },
//             {
//                 id: 'b370498e-5e54-4d98-88ef-ba039ee7fb62',
//                 isWinner: false,
//                 name: 'محمد سعادت',
//                 picture: null,
//                 resultText: 'Lost',
//                 status: 'PLAYED'
//             }
//         ],
//         startTime: '2021-05-30',
//         state: 'SCORE_DONE',
//         tournamentRoundText: '1'
//     },
// ];