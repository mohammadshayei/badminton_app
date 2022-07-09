import Day from "../Day";
import "./Games.scss";
import Skeleton from 'react-loading-skeleton';
import { useTheme } from "../../../../../styles/ThemeProvider";
import { useState } from "react";
import GameBox from "../../GameBox/GameBox";
import CustomInput, { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import { stringFa } from "../../../../../assets/strings/stringFaCollection";
import TransparentButton from "../../../../../components/UI/Button/TransparentButton/TransparentButton";

const Games = ({ tournamentDays }) => {
    const [games, setGames] = useState([
        {
            _id: '1',
            title: "انفرادی",
            court: { _id: "", value: "" },
            status: -1,
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            loading: false,
            officialsOpen: false,
        },
        {
            _id: '2',
            title: "انفرادی",
            court: { _id: "", value: "" },
            status: -1,
            gameNumber: "",
            players: { a: [{ _id: "", value: "" },], b: [{ _id: "", value: "" },] },
            officials: { umpire: [{ _id: "", value: "" },], serviceJudge: [{ _id: "", value: "" },] },
            saved: false,
            loading: false,
            officialsOpen: false,
        }
    ]);
    const [landNumbers, setLandNumbers] = useState([]);
    const [listAPlayers, setListAPlayers] = useState([]);
    const [listBPlayers, setListBPlayers] = useState([]);
    const [officials, setOfficials] = useState([])

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return <div className="tournament-games-container">
        <div className="days-and-gym-selector">
            <div className="day-selector-container">
                {tournamentDays ?
                    tournamentDays.map(day =>
                        <Day
                            key={day._id}
                            day={day}
                        // selectDay={() => selectDay(day._id)}
                        />
                    ) :
                    [...Array(5).keys()].map((v) =>
                        <Skeleton
                            key={v}
                            className="day"
                            style={{ border: "none" }}
                        />
                    )
                }
            </div>
            <div className="gym-selector">
                <div>نام سالن</div>
                <CustomInput
                    placeHolder={stringFa.undefined}
                    elementType={elementTypes.dropDown}
                    items={[]}
                    // onChange={onChangeGym}
                    // items={gyms.map(item => {
                    //     return {
                    //         id: item.gym._id,
                    //         text: item.gym.title,
                    //     }
                    // })}
                    // value={gym.value}
                    inputContainer={{ padding: "0" }}
                />
            </div>
        </div>
        <div className="games-wrapper">
            {
                games.map((game) =>
                    <GameBox
                        key={game._id}
                        game={game}
                        games={games}
                        setGames={setGames}
                        landNumbers={landNumbers}
                        listAPlayers={listAPlayers}
                        listBPlayers={listBPlayers}
                        officials={officials}
                    // onChangeCourt_GameNumber={onChangeCourt_GameNumber}
                    // onChange={onChange}
                    // onSave={onSave}
                    // onRemove={onRemove}
                    // toggle={toggle}
                    />
                )
            }
        </div>
        <TransparentButton >
            {`+ ${stringFa.new_game}`}
        </TransparentButton>
    </div>;
};

export default Games;
