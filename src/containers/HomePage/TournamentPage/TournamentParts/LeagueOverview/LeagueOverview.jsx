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
    const [data, setData] = useState([]);

    const { token } = useSelector(state => state.auth)

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const part = searchParams.get("part");

    useEffect(() => {
        if (!tournamentId || !part) return;
        const tournaments = ["58d9563e01e14005898d9ce96be9fd06", "1e69a30fbb3b48c8bbb82be7fb495fb3"];
        if (tournaments.includes(tournamentId)) return;
        (async () => {
            try {
                setContentLoading(true)
                let fetchedItems = await dynamicApi({ id: tournamentId }, token, `get_league_table`)
                if (!fetchedItems.success) {
                    setDialog(<ErrorDialog type="error">{fetchedItems.data.message}</ErrorDialog>)
                    return;
                }
                setData(fetchedItems.data.data?.filter(team => !team._id?.name?.includes("محلات")))
            } catch (error) {
                setContentLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)
            }
            setContentLoading(false)

        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tournamentId, part])

    useEffect(() => {
      if (tournamentId === "1e69a30fbb3b48c8bbb82be7fb495fb3") {
        setData([
            {
                "_id": {
                    "_id": "fdf3c9fe5a1f43aa82f6fd42546b7b17",
                    "name": "کاژه تهران",
                    "image": "image-1727518998573.png"
                },
                "gameWon": 36,
                "gameLost": 9,
                "matchsCount": 9,
                "matchWon": 8,
                "matchLost": 1,
                "scoreLost": 1451,
                "scored": 1961,
                "setWon": 77,
                "setLost": 22
            },
            {
                "_id": {
                    "_id": "c12d837f4ef44a46894dc095c0ca13b9",
                    "name": " بسکی گنبد",
                    "image": "image-1763651814455.png"
                },
                "gameWon": 34,
                "gameLost": 11,
                "matchsCount": 9,
                "matchWon": 8,
                "matchLost": 1,
                "scoreLost": 1448,
                "scored": 1910,
                "setWon": 71,
                "setLost": 28
            },
            {
                "_id": {
                    "_id": "5986186d85964e0882b1fab5674379ac",
                    "name": "چادرملو اردکان",
                    "image": "image-1663232613997.png"
                },
                "gameWon": 21,
                "gameLost": 24,
                "matchsCount": 9,
                "matchWon": 4,
                "matchLost": 5,
                "scoreLost": 1873,
                "scored": 1796,
                "setWon": 47,
                "setLost": 55
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
                "gameLost": 32,
                "matchsCount": 8,
                "matchWon": 0,
                "matchLost": 8,
                "scoreLost": 1674,
                "scored": 1266,
                "setWon": 20,
                "setLost": 66
            }
        ])
      } else if (tournamentId === "58d9563e01e14005898d9ce96be9fd06"){
        setData([
            {
                "_id": {
                    "_id": "5cd84aefe7a34bde857a4226b345af93",
                    "name": "کاژه تهران (بانوان)",
                    "image": "image-1762416169458.png"
                },
                "gameWon": 19,
                "gameLost": 6,
                "matchsCount": 5,
                "matchWon": 4,
                "matchLost": 1,
                "scoreLost": 794,
                "scored": 1051,
                "setWon": 40,
                "setLost": 14
            },
            {
                "_id": {
                    "_id": "b13c57bdc5ef4c939100cb8e5ac1e592",
                    "name": "نفت تهران",
                    "image": "image-1763651899676.JPG"
                },
                "gameWon": 17,
                "gameLost": 8,
                "matchsCount": 5,
                "matchWon": 4,
                "matchLost": 1,
                "scoreLost": 908,
                "scored": 1035,
                "setWon": 36,
                "setLost": 19
            },
            {
                "_id": {
                    "_id": "4852a4567baa4e8e91320c4c84197154",
                    "name": "درخشان زنجان",
                    "image": "image-1763651885866.JPG"
                },
                "gameWon": 8,
                "gameLost": 17,
                "matchsCount": 5,
                "matchWon": 2,
                "matchLost": 3,
                "scoreLost": 980,
                "scored": 874,
                "setWon": 17,
                "setLost": 36
            },
            {
                "_id": {
                    "_id": "5fc2e57445a84f32b43a6e20670706f6",
                    "name": "شهید فخار مشهد",
                    "image": "image-1663232548749.PNG"
                },
                "gameWon": 6,
                "gameLost": 19,
                "matchsCount": 5,
                "matchWon": 0,
                "matchLost": 5,
                "scoreLost": 1079,
                "scored": 801,
                "setWon": 16,
                "setLost": 40
            }
        ])
      }
    }, [tournamentId])
    

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