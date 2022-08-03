import "./TournamentsPage.scss";
import TournamentBox from "./TournamentBox";
import { useTheme } from "../../../styles/ThemeProvider";
import { Icon } from '@iconify/react';
import RoundSelector from "../../../components/UI/RoundSelector/RoundSelector";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as homeActions from "../../../store/actions/home";
import { fetchTournaments } from "../../../api/home";
import { useSelector } from "react-redux";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useNavigate } from "react-router-dom";
import Ads from "../../../assets/images/IranBadmintonFederation.jpg";
import Ads2 from "../../../assets/images/IranBadmintonFederation2.jpg";
import Footer from "../Footer/Footer";
import { GiTrophyCup } from "react-icons/gi";

const TournamentsPage = () => {
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [lives, setLives] = useState([])
    const [filterSelectors, setFilterSelectors] = useState({
        my_tournaments: {
            text: "مسابقات من",
            content: 'owner',
            selected: false,
        },
        finished: {
            text: "تمام شده",
            selected: false,
            content: 'prev',
        },
        now_playing: {
            text: "در حال انجام",
            selected: true,
            content: 'now',
        },
        upcoming: {
            text: "در آینده",
            selected: false,
            content: 'future',

        }
    });
    const [filteredTournaments, setfilteredTournaments] = useState([])

    const { token } = useSelector(state => state.auth)
    const { tournaments } = useSelector(state => state.home)


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const setTournaments = (tournaments) => {
        dispatch(homeActions.setTournaments(tournaments));
    };
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onSelectorClick = (key) => {
        let updatedFilterSelectors = { ...filterSelectors };
        for (const filter in updatedFilterSelectors) {
            updatedFilterSelectors[filter].selected = false;
        }
        updatedFilterSelectors[key].selected = true;
        setFilterSelectors(updatedFilterSelectors);
    }

    const onTournamentClickHandler = (id, freeRanking) => {
        navigate(`/tournaments/${id}?part=${freeRanking ? 'player' : "team"}`)
    }
    const onLiveGameClickHandler = () => {
        navigate(`/live_scores`)
    }

    useEffect(() => {
        if (!token) return;
        setDialog(null);
        (async () => {
            try {
                setLoading(true)
                const fetchedData = await fetchTournaments(token)
                if (!fetchedData.success) {
                    setDialog(<ErrorDialog type="error">{fetchedData.data.message}</ErrorDialog>)
                    return;
                }
                setTournaments(fetchedData.data.tournaments)
                setLives(fetchedData.data.lives)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)

            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    useEffect(() => {
        if (!tournaments) return;
        let key = Object.entries(filterSelectors).find(([_, v]) => v.selected)[1].content
        let updatedFilteredTournaments;
        if (key === 'owner')
            updatedFilteredTournaments = tournaments.filter(item => item.owner)
        else
            updatedFilteredTournaments = tournaments.filter(item => item.state === key)
        setfilteredTournaments(updatedFilteredTournaments)

    }, [tournaments, filterSelectors])
    return <div className="tournaments-page">
        {dialog}
        {
            lives.length > 0 &&
            <div className="live-scores-bar"
                style={{
                    display: "flex",
                    backgroundColor: theme.secondary_variant,
                    color: theme.on_secondary
                }}
            >
                {
                    lives.map(item =>
                        <div className="live-score-item" key={item._id} onClick={() => onLiveGameClickHandler()}>
                            <Icon className="live-icon" icon="fluent:live-24-regular" color={theme.on_primary} />
                            <p>{item.title}</p>
                        </div>
                    )
                }

            </div>
        }
        <p className="title">{stringFa.tournaments}</p>
        <div className="selectors-wrapper">
            {Object.entries(filterSelectors).map(([k, v]) =>
                <RoundSelector
                    key={k}
                    selector={k}
                    text={v.text}
                    selected={v.selected}
                    onClick={() => onSelectorClick(k)}
                    style={{ margin: "0 0.25rem" }}
                />
            )}
        </div>
        <div className="ads-and-tournaments">
            <div className="tournaments-wrapper">
                <div className="ads-container">
                    <img src={Ads2} alt="ads"
                    //  onClick={() => window.location.replace('https://iranbadminton.org/')} 
                    />
                </div>
                {
                    loading ?
                        <TournamentBox loading={true} />
                        :
                        filteredTournaments.length > 0 ?
                            filteredTournaments.map(tournament =>
                                <TournamentBox
                                    onClick={() => onTournamentClickHandler(tournament._id, tournament.free_ranking)}
                                    title={tournament.title}
                                    chiefName={tournament.chief.username}
                                    ageCategory={tournament.age_category}
                                    image={tournament.image}
                                    gameDate={tournament.game_date}
                                    key={tournament._id}
                                    loading={loading}
                                />
                            ) :
                            <div className="empty-tournaments">
                                <GiTrophyCup className="empty-icon" color={theme.darken_border_color} />
                                <p>
                                    مسابقه وجود ندارد
                                </p>
                                {/* {filterSelectors.my_tournaments.selected && 'ساخت تورنمت جدید'} */}
                            </div>
                }
            </div>
            <div className="ads-container">
                <img src={Ads} alt="ads"
                // onClick={() => window.location.replace('https://iranbadminton.org/')} 
                />
            </div>
        </div>
        <Footer />
    </div>;
};

export default TournamentsPage;
