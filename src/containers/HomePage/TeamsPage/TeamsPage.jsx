import { useEffect, useState } from "react";
import "./TeamsPage.scss"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import * as homeActions from "../../../store/actions/home";
import { useTheme } from "../../../styles/ThemeProvider";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { Icon } from '@iconify/react';
import RoundSelector from "../../../components/UI/RoundSelector/RoundSelector";
import Ads from "../../../assets/images/IranBadmintonFederation.jpg";
import DEFAULT_LOGO from '../../../assets/images/team_avatar.png';

const TeamsPage = () => {
    const [dialog, setDialog] = useState(null)
    const [loading, setLoading] = useState(false)
    const [lives, setLives] = useState([])
    const [teams, setTeams] = useState(null);
    const [filteredTeams, setFilteredTeams] = useState([]);

    const { token } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const onTeamClickHandler = (id) => {
        // navigate(`/teams/${id}?part=team`)
    }

    useEffect(() => {
        if (!token) return;
        setDialog(null);
        // (async () => {
        //     try {
        //         setLoading(true)
        //         const fetchedData = await fetchTournaments(token)
        //         if (!fetchedData.success) {
        //             setDialog(<ErrorDialog type="error">{fetchedData.data.message}</ErrorDialog>)
        //             return;
        //         }
        //         setTournaments(fetchedData.data.tournaments)
        //         setLives(fetchedData.data.lives)
        //         setLoading(false)
        //     } catch (error) {
        //         setLoading(false)
        //         setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)

        //     }
        // })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    return <div className="teams-page">
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
        <p className="title">{stringFa.teams}</p>
        <div className="ads-and-teams">
            <div className="teams-wrapper">
                <div className="my-team-box"
                    style={{
                        backgroundColor: theme.surface,
                    }}
                >
                    <div className="team-logo">
                        <img src={DEFAULT_LOGO} alt="logo" />
                    </div>
                    <div className="team-name">رعد پدافند هوایی قم</div>
                    <div className="tournaments">
                        <div className="tournament">
                            <div className="tournament-name">لیگ برتر بدمینتون ایران جام خلیج فارس</div>
                            <div className="tournament-days-credit">
                                {[...Array(8).keys()].map((v) =>
                                    <>
                                        {v > 0 && <div className="day-link"></div>}
                                        <div className="day-credit">{v + 1}</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    loading ?
                        "Loading..."
                        :
                        filteredTeams.length > 0 ?
                            filteredTeams.map(team =>
                                <div className="team-name-and-logo">
                                    <div className="team-logo">
                                        <img src="" alt="logo" />
                                    </div>
                                    <div className="team-name">
                                        team name
                                    </div>
                                </div>
                            ) : <div>
                                تیم موجود نمی باشد
                            </div>
                }
            </div>
            <div className="ads-container">
                <img src={Ads} alt="ads" onClick={() => window.location.replace('https://iranbadminton.org/')} />
            </div>
        </div>
    </div>;
};

export default TeamsPage;
