import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLiveGames } from '../../api/liveGame';
import ErrorDialog from '../../components/UI/Error/ErrorDialog';
import { useTheme } from '../../styles/ThemeProvider';
import * as gameActions from "../../store/actions/gameInfo"
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

import './WaitPage.scss'
import { baseUrl } from '../../constants/Config';
import { stringFa } from '../../assets/strings/stringFaCollection';
const WaitPage = () => {
    const [tokenId, setTokenId] = useState("");
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [games, setGames] = useState(null)

    const socket = useSelector(state => state.auth.socket)


    const locaiton = useLocation();
    let navigate = useNavigate();

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const searchParams = new URLSearchParams(locaiton.search);
    const gymId = searchParams.get("gymId");
    const landNumber = searchParams.get("landNumber");

    const dispatch = useDispatch();

    const setSelectedGameView = (game) => {
        dispatch(gameActions.setGameView(game));
    };
    const slideImages = [
        {
            url: 'images/slide_1.jpg',
        },
        // {
        //     url: 'images/slide_2.jpg',
        // },
        // {
        //     url: 'images/slide_3.jpg',
        // },
        // {
        //     url: 'images/slide_4.jpg',
        // },
    ];
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

    return (
        <div className='wait-page-wrapper'
            style={{
                background: `linear-gradient(210deg,${theme.primary},${theme.primary_variant})`,
                color: theme.on_primary,

            }}
        >
            {/* <div className='title'>
                <p>نرم افزاری فکر افزار</p>
            </div> */}
            <div className="each-slide" onDragStart={(e) => { e.preventDefault(); }}>
                <img src={`${baseUrl}images/slide_1.jpg`} alt="" />
                <p
                    style={{ color: theme.primary }}
                    className='url'>http://sports.setoos.ir</p>
            </div>
            {/* <Slide arrows={false} > */}
            {/* {slideImages.map((slideImage, index) => (
                ))} */}
            {/* </Slide> */}
            <div className='wait'>
                <p>
                    {stringFa.wait_to_start_the_game}
                </p>
            </div>
        </div>
    )
}

export default WaitPage
