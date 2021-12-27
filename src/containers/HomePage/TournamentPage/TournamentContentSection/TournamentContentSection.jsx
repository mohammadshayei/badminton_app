import { useEffect, useState } from 'react'
import { useTheme } from '../../../../styles/ThemeProvider';
import './TournamentContentSection.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, removeContent } from '../../../../api/home';
import * as homeActions from "../../../../store/actions/home";
import PlayerFooter from './Footer/PlayerFooter';
import GameItem from './Item/GameItem'
import UserItem from './Item/UserItem'
import {
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
    Type as ListType
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { stringFa } from '../../../../assets/strings/stringFaCollection';
import SimpleFooter from './Footer/SimpleFooter';
import GymItem from './Item/GymItem';
import RefereeFooter from './Footer/RefereeFooter';


const TournamentContentSection = (props) => {
    const [loading, setLoading] = useState(false)
    const [footer, setFooter] = useState(null)
    const [swipedStatus, setSwipedStatus] = useState('')
    const [body, setBody] = useState(null)
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
    const setSelectedContent = (contentId) => {
        dispatch(homeActions.setSelectedContent(contentId));
    };
    const setEditMode = (editMode) => {
        dispatch(homeActions.setEditMode(editMode));
    };
    const removeItemContent = (id, key) => {
        dispatch(homeActions.removeItemContent(id, key));
    };
    const setShowModal = (showModal) => {
        dispatch(homeActions.setShowModal(showModal));
    };
    const editClickHandler = (id) => {
        setSelectedContent(id)
        setEditMode(true)
        setShowModal(true)
    }
    const deleteClickHandler = async id => {
        setLoading(true)
        let payload, url;
        switch (mode) {
            case 'players':
                payload = { tournamentId: selectedTournament, playerId: id }
                url = 'remove_player_from_tournament'
                break;
            case 'gyms':
                payload = { tournamentId: selectedTournament, gymId: id }
                url = 'remove_gym'
                break;
            case 'referees':
                payload = { tournamentId: selectedTournament, refereeId: id }
                url = 'remove_referee_to_tournament'
                break;
            default:
                break;
        }
        const result = await removeContent(payload, token, url)
        if (result.success) {
            alert(stringFa.remove_successfully)
            removeItemContent(id, mode.substring(0, mode.length - 1))
        } else {
            alert(result.error)
        }
        setLoading(false)
    }

    const trailingActions = (id) => (
        <TrailingActions >
            <SwipeAction onClick={() => editClickHandler(id)}>
                <div
                    className='swipe-action-btn'
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.on_primary,
                        margin: "1rem 0 1rem 1rem",
                        borderRadius: '25px 0 0 25px'
                    }}
                >
                    <span>
                        ویرایش
                    </span>
                </div>
            </SwipeAction>
            <SwipeAction
                destructive={true}
                onClick={() => deleteClickHandler(id)}>
                <div
                    className='swipe-action-btn'
                    style={{
                        backgroundColor: theme.error,
                        color: theme.on_error,
                        margin: "1rem 1rem 1rem 0",
                        borderRadius: '0 25px 25px 0',
                    }}
                >
                    <span>
                        حذف
                    </span>
                </div>
            </SwipeAction>
        </TrailingActions >
    );


    const trailingActionsRefer = (id) => (
        <TrailingActions >
            <SwipeAction
                destructive={true}
                onClick={() => deleteClickHandler(id)}>
                <div
                    className='swipe-action-btn'
                    style={{
                        backgroundColor: theme.error,
                        color: theme.on_error,
                        borderRadius: '15px',
                        margin: "1rem"
                    }}
                >
                    <span>
                        حذف
                    </span>
                </div>
            </SwipeAction>
        </TrailingActions >
    );

    useEffect(() => {
        switch (mode) {
            case 'players':
                setFooter(<PlayerFooter />)
                break;
            case 'gyms':
                setFooter(<SimpleFooter titleButton={stringFa.add_gym} />)
                break;
            case 'referees':
                setFooter(<RefereeFooter />)
                break;
            default:
                setFooter(null)
                break;
        }
    }, [mode, selectedTournament])

    useEffect(async () => {
        setLoading(true)
        const result = await fetchItems(selectedTournament, token, mode)
        if (result.success) {
            setContents(result.data)
        }
        setLoading(false)

    }, [selectedTournament, mode]);

    useEffect(() => {
        if (contents.length > 0) {
            setBody(
                contents.map((item, key) => {
                    return (
                        <SwipeableListItem
                            trailingActions={mode !== 'referees' ?
                                trailingActions(item[mode.substring(0, mode.length - 1)]._id) :
                                trailingActionsRefer(item[mode.substring(0, mode.length - 1)]._id)}
                            onSwipeStart={() => { setSwipedStatus(item[mode.substring(0, mode.length - 1)]._id) }}
                            onSwipeEnd={() => { setSwipedStatus('') }}
                            key={item[mode.substring(0, mode.length - 1)]._id}
                        >
                            {
                                mode === 'gyms' ?
                                    <GymItem
                                        style={{
                                            borderRadius: swipedStatus === item[mode.substring(0, mode.length - 1)]._id
                                                ? '0px' : '25px'
                                        }}
                                        {...item[mode.substring(0, mode.length - 1)]}
                                    />
                                    :
                                    <UserItem
                                        {...item[mode.substring(0, mode.length - 1)]}
                                    />
                            }
                        </SwipeableListItem>
                    )
                })
            )
        } else {
            setBody(null)
        }
    }, [contents])
    console.log(contents)
    return (
        <div
            className="tournament-content-section-wrapper"
            style={{ backgroundColor: theme.background_color }}
        >
            <SwipeableList
                type={ListType.IOS}
                className='tournament-content-section-content'
                style={{
                    gridTemplateRows: `repeat(${contents.length}, 5rem)`
                }}
            >
                {body}
            </SwipeableList>
            {footer}
        </div>
    )
}

export default TournamentContentSection
