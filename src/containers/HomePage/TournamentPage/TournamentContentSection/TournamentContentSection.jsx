import React, { useEffect, useState } from 'react'
import { useTheme } from '../../../../styles/ThemeProvider';
import Button from "../../../../components/UI/Button/Button";
import { stringFa } from '../../../../assets/strings/stringFaCollection';
import { useDispatch, useSelector } from 'react-redux';
import GameItem from '../Item/GameItem';
import PlayerItem from '../Item/PlayerItem';
import { fetchItems } from '../../../../api/home';
import * as homeActions from "../../../../store/actions/home";

const TournamentContentSection = (props) => {
    const [loading, setLoading] = useState(false)

    const contents = useSelector((state) => state.home.contents);
    const mode = useSelector((state) => state.home.mode);
    const selectedTournament = useSelector((state) => state.home.selectedTournament);
    const token = useSelector((state) => state.auth.token);

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const dispatch = useDispatch();

    const setContents = (contents) => {
        dispatch(homeActions.setContents(contents));
    };

    useEffect(async () => {
        if (mode !== 'edit') {
            setLoading(true)
            const result = await fetchItems(selectedTournament, token, mode)
            if (result.success) {
                setContents(result.data)
            }
            setLoading(false)
        }

    }, [selectedTournament, mode]);


    return (
        <div
            className="box-container"
            style={{ backgroundColor: theme.background_color }}
        >
            <div className="box-content">
                {contents.length > 0 &&
                    contents.map((item, key) => {
                        let body;
                        switch (mode) {
                            case 'games':
                                body = <GameItem key={item.game._id} {...item.game} />
                                break;
                            case 'players':
                                body = <PlayerItem key={item._id} {...item.player} />
                                break;
                            case 'referees':
                                body = <PlayerItem key={item._id} {...item.referee} />
                                break;
                            default:
                                break;
                        }
                        return body
                    }
                    )}
            </div>
            <div className="box-btn">
                <Button>{stringFa.new_game}</Button>
            </div>
        </div>
    )
}

export default TournamentContentSection
