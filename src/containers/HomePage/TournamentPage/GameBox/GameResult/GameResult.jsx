import { useState } from "react";
import { elementTypes } from "../../../../../components/UI/CustomInput/CustomInput";
import Input from "../../../../../components/UI/Input/Input";

const GameResult = ({ teamsName }) => {
    const [order, setOrder] = useState({
        team1:
        {
            title: teamsName.a,
            value: '',
            elementType: elementTypes.input
        },
        team2:
        {
            title: teamsName.b,
            value: '',
            elementType: elementTypes.input
        }
    });

    return (
        <div>
            {Object.entries(order).map(([k, v]) => (
                <div key={k}>
                    {v.title}
                    <Input {...v} />
                </div>
            ))
            }
        </div>
    );
};

export default GameResult;
