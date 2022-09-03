import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { dynamicApi } from "../../../../../api/home";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import ErrorDialog from "../../../../../components/UI/Error/ErrorDialog";
import { baseUrl } from "../../../../../constants/Config";
import "./LeagueOverview.scss"
import DEFAULT_LOGO from '../../../../../assets/images/team_avatar.png';

const LeagueOverview = ({ tournamentId }) => {
    const [contentLoading, setContentLoading] = useState(false);
    const [dialog, setDialog] = useState(null);
    const [data, setData] = useState(null);


    const { token } = useSelector(state => state.auth)

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const part = searchParams.get("part");

    useEffect(() => {
        if (!tournamentId || !part) return;
        (async () => {
            try {
                setContentLoading(true)
                let fetchedItems = await dynamicApi({ id: tournamentId }, token, `get_league_table`)
                if (!fetchedItems.success) {
                    setDialog(<ErrorDialog type="error">{fetchedItems.data.message}</ErrorDialog>)
                    return;
                }
                setData(fetchedItems.data.data)
            } catch (error) {
                setContentLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setContentLoading(false)

        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tournamentId, part])
    return <div className="league-overview">
        <table className="league-table">
            <thead>
                <tr>
                    {columns.map((item, i) => <th key={i}>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                {data &&
                    data.map((item, i) =>
                        <tr key={item._id._id}>
                            <td>{i + 1}</td>
                            <td>
                                <div className="team-name">
                                    <img src={item._id.image ? `${baseUrl}uploads/teams/${item._id.image}` : DEFAULT_LOGO} alt="logo" />
                                    <p>{item._id.name}</p>
                                </div>
                            </td>
                            <td>{item.matchsCount}</td>
                            <td>{item.matchWon}</td>
                            <td>{item.matchLost}</td>
                            <td>{item.gameWon}</td>
                            <td>{item.gameLost}</td>
                            <td>{item.setWon}</td>
                            <td>{item.setLost}</td>
                            <td>{item.scored}</td>
                            <td>{item.scoreLost}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>;
};

export default LeagueOverview;

export const columns = [
    stringFa.rank,
    stringFa.club_name,
    stringFa.played_matches,
    stringFa.won_matches,
    stringFa.lost_matches,
    stringFa.won_games,
    stringFa.lost_games,
    stringFa.won_sets,
    stringFa.lost_sets,
    stringFa.earned_points,
    stringFa.lost_points
]