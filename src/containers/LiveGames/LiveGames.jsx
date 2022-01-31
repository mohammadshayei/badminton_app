import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLiveGames } from '../../api/liveGame';
import { stringFa } from '../../assets/strings/stringFaCollection';
import Loading from '../../components/UI/Loading/Loading';
import rocket from "../../assets/images/rocket.png";
import rockets from "../../assets/images/rockets.png";
import * as gameActions from "../../store/actions/gameInfo"
import * as homeActions from "../../store/actions/home"


import './LiveGames.scss'
import { useNavigate } from 'react-router-dom';
import ErrorDialog from '../../components/UI/Error/ErrorDialog';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import AssignLand from './AssignLand/AssignLand';
const LiveGames = () => {
    const [loading, setLoading] = useState(false)
    const [games, setGames] = useState([]);
    const [dialog, setDialog] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const socket = useSelector(state => state.auth.socket)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const setSelectedGameView = (game) => {
        dispatch(gameActions.setGameView(game));
    };
    const setAssingScoreboard = (data) => {
        dispatch(homeActions.setAssingScoreboard(data));
    };
    const gameClickHandler = (id) => {
        setAssingScoreboard({ gymId: "", landNumber: 0 })
        const game = games.find(item => item._id === id)
        setSelectedGameView(game);
        navigate('/scoreboard_view')
    }

    useEffect(async () => {
        setLoading(true)
        const result = await getLiveGames()
        if (result.success) {
            setGames(result.data)
        } else {
            setDialog(null)
            setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
        }
        setLoading(false)
    }, [])
    useEffect(() => {
        if (socket && games) {
            socket.on('get_winner_team', (payload => {
                let { teamName, gameId } = payload;
                let updatedGames = [...games]
                let gameIndex = updatedGames.findIndex(item => item._id === gameId)
                if (gameIndex >= 0) {
                    if (teamName === 'team1')
                        updatedGames[gameIndex].teamA.setWon =
                            updatedGames[gameIndex].teamA.setWon + 1
                    else
                        updatedGames[gameIndex].teamB.setWon =
                            updatedGames[gameIndex].teamB.setWon + 1
                    setGames(updatedGames)
                }

            }))
            socket.on('get_live_game', (payload => {
                let { game } = payload;
                let updatedGames = [...games]
                updatedGames.push(game)
                setGames(updatedGames)
            }

            ))
        }
    }, [socket, games])

    return (
        <div className="live-games-page-wrapper">
            {dialog}
            {showModal && <Modal show={showModal} modalClosed={() => setShowModal(false)}>
                <AssignLand games={games} />
            </Modal>}
            <div className="live-games">
                {
                    loading ?
                        <Loading /> :
                        games.length > 0 ? (
                            games.map((game, key) => (
                                <div key={game._id} className="game-box"
                                    onClick={() => gameClickHandler(game._id)}>
                                    {game.game_type === "single" ? (
                                        <img src={rocket} alt="" />
                                    ) : (
                                        <img src={rockets} alt="" />
                                    )}
                                    <div className="details">
                                        <p className="title">{game.tournament.title}</p>
                                        <p className="game-number">{`${stringFa.game_number} ${game.game_number}`}</p>
                                        <p className="players-name">
                                            <span> {`${game.teamA.players[0].player.username}
                                        ${game.game_type === "double" ? "  ,  " + game.teamA.players[1].player.username : "  "}`}
                                            </span>
                                            <span className='span-score'>
                                                {`${game.teamA.setWon}    :   ${game.teamB.setWon}`}
                                            </span>
                                            <span> {`${game.teamB.players[0].player.username}
                                        ${game.game_type === "double" ? "  ,  " + game.teamB.players[1].player.username : "  "}`}
                                            </span>
                                        </p>

                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="hint">
                                {stringFa.no_game_to_see}
                            </div>
                        )
                }
            </div>
            <div className='button-container'>
                <Button
                    onClick={() => { setShowModal(true) }}
                    ButtonStyle={{
                        fontSize: '1.2rem',
                        padding: '.4rem 1.5rem',
                        background: 'white',
                        color: 'black',
                    }}
                >
                    {stringFa.assign_scorebaord_to_court}
                </Button>
            </div>
        </div>
    )
}

export default LiveGames
