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
    const [data, setData] = useState(
        [
            {
                "_id": {
                    "_id": "fdf3c9fe5a1f43aa82f6fd42546b7b17",
                    "name": "کاژه تهران",
                    "image": "image-1727518998573.png"
                },
                "gameWon": 31,
                "gameLost": 9,
                "matchsCount": 8,
                "matchWon": 7,
                "matchLost": 1,
                "scoreLost": 1345,
                "scored": 1751,
                "setWon": 67,
                "setLost": 22
            },
            {
                "_id": {
                    "_id": "c12d837f4ef44a46894dc095c0ca13b9",
                    "name": " بسکی گنبد",
                    "image": "image-1763651814455.png"
                },
                "gameWon": 30,
                "gameLost": 10,
                "matchsCount": 8,
                "matchWon": 7,
                "matchLost": 1,
                "scoreLost": 1278,
                "scored": 1708,
                "setWon": 63,
                "setLost": 25
            },
            {
                "_id": {
                    "_id": "5986186d85964e0882b1fab5674379ac",
                    "name": "چادرملو اردکان",
                    "image": "image-1663232613997.png"
                },
                "gameWon": 20,
                "gameLost": 20,
                "matchsCount": 8,
                "matchWon": 4,
                "matchLost": 4,
                "scoreLost": 1671,
                "scored": 1626,
                "setWon": 44,
                "setLost": 47
            },
            {
                "_id": {
                    "_id": "57e4f104751b43cd86480c8bce912f4c",
                    "name": "درخشان زنجان (آقایان)",
                    "image": "image-1763651680978.JPG"
                },
                "gameWon": 17,
                "gameLost": 28,
                "matchsCount": 9,
                "matchWon": 4,
                "matchLost": 5,
                "scoreLost": 1924,
                "scored": 1687,
                "setWon": 41,
                "setLost": 61
            },
            {
                "_id": {
                    "_id": "c3f5d8655a8d42438b3fcb49a2247cf1",
                    "name": "رعدپدافندهوایی کرمان",
                    "image": "image-1663232599533.PNG"
                },
                "gameWon": 14,
                "gameLost": 26,
                "matchsCount": 8,
                "matchWon": 2,
                "matchLost": 6,
                "scoreLost": 1742,
                "scored": 1492,
                "setWon": 33,
                "setLost": 57
            },
            {
                "_id": {
                    "_id": "c8e2a1f26c8e4b7faa65fce6e375734e",
                    "name": "پرتو نیرو روشا مشهد",
                    "image": "image-1694518044936.jpg"
                },
                "gameWon": 8,
                "gameLost": 27,
                "matchsCount": 7,
                "matchWon": 0,
                "matchLost": 7,
                "scoreLost": 1464,
                "scored": 1160,
                "setWon": 20,
                "setLost": 56
            }
        ]
    );

    const { token } = useSelector(state => state.auth)

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const part = searchParams.get("part");

    // useEffect(() => {
    //     if (!tournamentId || !part) return;
    //     (async () => {
    //         try {
    //             setContentLoading(true)
    //             let fetchedItems = await dynamicApi({ id: tournamentId }, token, `get_league_table`)
    //             if (!fetchedItems.success) {
    //                 setDialog(<ErrorDialog type="error">{fetchedItems.data.message}</ErrorDialog>)
    //                 return;
    //             }
    //             setData(fetchedItems.data.data?.filter(team => !team._id?.name?.includes("محلات")))
    //         } catch (error) {
    //             setContentLoading(false)
    //             setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
    //         }
    //         setContentLoading(false)

    //     })()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [tournamentId, part])

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
                                    <img src={item._id.image ? `${baseUrl}uploads/teams/${item._id.image}` : DEFAULT_LOGO} alt="logo" loading="lazy" />
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