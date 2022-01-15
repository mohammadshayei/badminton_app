import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../../api/home";
import * as homeActions from "../../../../store/actions/home";
import { useTheme } from "../../../../styles/ThemeProvider";
import { FaMedal, FaBalanceScale } from 'react-icons/fa'
import { MdOutlineEmojiTransportation, MdOutlineSportsHandball } from 'react-icons/md'
import { GoSettings } from "react-icons/go";
import { stringFa } from "../../../../assets/strings/stringFaCollection";
// import arrow from "../../../../assets/images/arrow.png";

const TournamentsList = (props) => {
    const [loading, setLoading] = useState(false)
    const tournaments = useSelector((state) => state.home.tournaments);
    const selectedTournament = useSelector((state) => state.home.selectedTournament);
    const mode = useSelector((state) => state.home.mode);
    const contents = useSelector((state) => state.home.contents);

    const token = useSelector((state) => state.auth.token);
    const refereeId = useSelector((state) => state.auth.refereeId);

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const dispatch = useDispatch();

    const setTournaments = (tournaments) => {
        dispatch(homeActions.setTournaments(tournaments));
    };

    const setSelectedTournament = (tournamentId) => {
        dispatch(homeActions.setSelectedTournament(tournamentId));
    };
    const setMode = (modeInput) => {
        dispatch(homeActions.setMode(modeInput));
    };

    const onIconClickHandler = (key) => {
        setLoading(true)
        setMode(key)
    }
    const editIconClick = () => {
        props.setEditMode(true)
        props.setShowModal(true)
    }

    useEffect(async () => {
        if (refereeId && token) {
            const result = await fetchItems(refereeId, token, 'tournaments')
            if (result.success) {
                setTournaments(result.data)
                if (result.data.length > 0) setSelectedTournament(result.data[0].tournament._id)
            }

        }
    }, [refereeId, token])

    useEffect(() => {
        setLoading(false)
    }, [contents])

    const onTournamentClick = (id) => {
        setSelectedTournament(id)
    };
    return (
        <div className="tournaments-wrapper">
            {tournaments.length > 0 ? (
                tournaments.map((item, key) => (
                    <div
                        key={item.tournament._id}
                        className={`tournament-box ${item.tournament._id === selectedTournament && "selected"}`}
                        style={{
                            backgroundColor: item.tournament._id === selectedTournament && theme.background_color,
                            color: item.tournament._id === selectedTournament && theme.on_background,
                            boxShadow:
                                item.tournament._id === selectedTournament &&
                                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                        }}
                        onClick={() => onTournamentClick(item.tournament._id)}
                    >
                        <div
                            className="progress"
                            style={{ width: `${item.tournament.progress}` }}
                        ></div>
                        <p>{item.tournament.title}</p>
                        {item.tournament._id === selectedTournament && (
                            <div disabled={loading} className="icons">
                                <FaMedal
                                    style={{ color: mode === 'games' && theme.primary }}
                                    className='icon'
                                    onClick={() => onIconClickHandler('games')}
                                />
                                <MdOutlineSportsHandball
                                    style={{ color: mode === 'players' && theme.primary }}
                                    className='icon'
                                    onClick={() => onIconClickHandler('players')}

                                />
                                <FaBalanceScale
                                    style={{ color: mode === 'referees' && theme.primary }}
                                    className='icon'
                                    onClick={() => onIconClickHandler('referees')}

                                />
                                <MdOutlineEmojiTransportation
                                    style={{ color: mode === 'gyms' && theme.primary }}
                                    className='icon'
                                    onClick={() => onIconClickHandler('gyms')}

                                />
                                <GoSettings
                                    className='icon edit-icon'
                                    onClick={editIconClick}
                                />
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="hint">
                    {stringFa.create_tournament}
                    {/* <img src={arrow} alt="arrow_down" /> */}
                </div>
            )}
        </div>
    )
}

export default TournamentsList
