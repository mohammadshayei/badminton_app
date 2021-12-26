import { useState, useEffect } from "react"
import "./GlobalSection.scss"

const HeaderAuth = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const newGame =
            [...games,
            {
                tournament: "لیگ 1400",
                players: ["محمد احمدی", "شایان برومند"],
                place: "قم",
                date: "1400-09-28"
            }];
        setGames(newGame);
    }, [])

    return (
        <div className='global-section-container'>
            <div className="light"></div>
            <div className="global-section-inner">
                {games.length > 0 ?
                    games.map((game) =>
                        <div className="game-box">
                            <p>{game.tournament}</p>
                            <p>{game.players.map((player) => player).join(" - ")}</p>
                            {/* <p>{game.place}</p> */}
                            <p>{game.date}</p>
                        </div>
                    )
                    :
                    "loading..."
                }
            </div>
        </div>
    )
}

export default HeaderAuth
