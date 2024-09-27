/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './WaitPage.scss'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLiveGames } from '../../api/liveGame';
import ErrorDialog from '../../components/UI/Error/ErrorDialog';
import { useTheme } from '../../styles/ThemeProvider';
// import * as gameActions from "../../store/actions/gameInfo"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { stringFa } from '../../assets/strings/stringFaCollection';
import { fetchTournaments } from '../../api/home';
import { baseUrl } from '../../constants/Config';

const WaitPage = () => {
    // const [tokenId, setTokenId] = useState("");
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [games, setGames] = useState(null)
    const [tournaments, setTournaments] = useState([])
    const [assignedTournament, setAssignedTournament] = useState({})

    const socket = useSelector(state => state.auth.socket)
    const token = useSelector(state => state.auth.token)

    const locaiton = useLocation();
    let navigate = useNavigate();

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const searchParams = new URLSearchParams(locaiton.search);
    const gymId = searchParams.get("gymId");
    const landNumber = searchParams.get("landNumber");
    const tournamentId = searchParams.get("tournametId");

    // const slideImages = ['BACK02.svg', 'BACK03.svg'];

    useEffect(() => {
        (async () => {
            setLoading(true)
            const result = await getLiveGames()
            if (result.success) {
                setGames(result.data)
            } else {
                setDialog(null)
                setDialog(<ErrorDialog type="error">{result.error}</ErrorDialog>)
            }
            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        if (socket && games) {
            socket.on('get_live_game', (payload => {
                let { game } = payload;
                let updatedGames = [...games]
                updatedGames.push(game)
                setGames(updatedGames)
            }

            ))
        }
        return () => {
            if (socket)
                socket.off("get_live_game");
        }
    }, [socket, games])

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const fetchedData = await fetchTournaments(token)
                if (!fetchedData.success) {
                    setDialog(<ErrorDialog type="error">{fetchedData.data.message}</ErrorDialog>)
                    setLoading(false)
                    return;
                }
                setTournaments(fetchedData.data.tournaments)
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        })()
    }, [token])

    useEffect(() => {
        if (games && gymId && landNumber) {
            const game = games.find(item => {
                if (item.gym_id && typeof (item.gym_id) === 'string')
                    return (item.gym_id === gymId && item.land_number === landNumber)
                else if (item.gym_id && typeof (item.gym_id) === 'object')
                    return (item.gym_id._id === gymId && item.land_number === landNumber)
                else return false;
            })
            if (game) {
                navigate(`/scoreboard_view?gameId=${game._id}&gymId=${gymId}&landNumber=${landNumber}`)
            }
        }

    }, [games, gymId, landNumber])

    useEffect(() => {
        if (!tournamentId) return;
        let updatedTournamets = [...tournaments];
        const foundTournament = updatedTournamets.find(t => t._id === tournamentId);
        if (!foundTournament) return;
        console.log(foundTournament);
        setAssignedTournament(foundTournament);
    }, [tournamentId, tournaments])

    return (
        <div className='wait-page-wrapper'
            style={{
                background: assignedTournament.color || theme.background_color,  //#e62643
                color: theme.on_background,
            }}
        >
            <Slide arrows={false} duration={10000}>
                {/* {slideImages.map((slideImage, index) => ( */}
                <div className="each-slide" onDragStart={(e) => { e.preventDefault(); }}>
                    <p
                        className='title'
                    >
                        {assignedTournament.title}
                    </p>
                </div>
                <div className="each-slide" onDragStart={(e) => { e.preventDefault(); }}>
                    <img src={`${baseUrl}uploads/tournaments/${assignedTournament.image}`} alt="" />
                </div>
                {/* ))} */}
            </Slide>
            <div className='wait'>
                <p>
                    {stringFa.wait_to_start_the_game}
                </p>
            </div>
        </div>
    )
}

export default WaitPage
