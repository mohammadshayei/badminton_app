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

    const onTournamentClickHandler = (id) => {
        navigate(`/tournaments/${id}?part=team`)
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
        let updatedFilteredTournaments = tournaments.filter(item => item.state === key)
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
                        <div className="live-score-item">
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
                />
            )}
        </div>
        <div className="ads-and-tournaments">
            <div className="tournaments-wrapper">
                {
                    loading ?
                        <TournamentBox loading={true} />
                        :
                        filteredTournaments.length > 0 ?
                            filteredTournaments.map(tournament =>
                                <TournamentBox
                                    onClick={() => onTournamentClickHandler(tournament._id)}
                                    title={tournament.title}
                                    chiefName={tournament.chief.username}
                                    ageCategory={tournament.age_category}
                                    image={tournament.image}
                                    gameDate={tournament.game_date}
                                    key={tournament._id}
                                    loading={loading}
                                />
                            ) : <div>
                                تورنمنتی موجود نمی باشد
                                {filterSelectors.my_tournaments.selected && 'ساخت تورنمت جدید'}
                            </div>
                }
            </div>
            <div className="ads-container">
                <img src={Ads} alt="ads" onClick={() => window.location.replace('https://iranbadminton.org/')} />
            </div>
        </div>
    </div>;
};

export default TournamentsPage;
