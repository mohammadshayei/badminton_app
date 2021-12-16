import { useEffect, useState } from 'react'
import { useTheme } from '../../../../styles/ThemeProvider';
import './TournamentContentSection.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../../../api/home';
import * as homeActions from "../../../../store/actions/home";
import PlayerFooter from './Footer/PlayerFooter';
import GameItem from './Item/GameItem'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import UserItem from './Item/UserItem'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';


const TournamentContentSection = (props) => {
    const [loading, setLoading] = useState(false)
    const [footer, setFooter] = useState(null)
    const [progress, setProgress] = useState(0)
    const [swipedStatus, setSwipedStatus] = useState('')
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
    const setShowModal = (showModal) => {
        dispatch(homeActions.setShowModal(showModal));
    };
    const editClickHandler = (id) => {
        setSelectedContent(id)
        setEditMode(true)
        setShowModal(true)
    }
    const deleteClickHandler = id => {

    }
    const leadingActions = (id) => (
        <LeadingActions >
            <SwipeAction onClick={() => editClickHandler(id)}>
                <div
                    style={{
                        backgroundColor: theme.primary,
                        display: "flex",
                        alignItems: 'center',
                        height: 59,
                        marginTop: 16,
                        borderRadius: '25px 0 0 25px'
                    }}
                >
                    <FiEdit2 style={{ color: 'white', margin: "0 .4rem" }} />
                    {
                        progress > 30 &&
                        <span style={{ color: 'white' }}>
                            ویرایش
                        </span>
                    }
                </div>
            </SwipeAction>
        </LeadingActions>
    );

    const trailingActions = (id) => (
        <TrailingActions >
            <SwipeAction
                // destructive={true}
                onClick={() => deleteClickHandler(id)}

            >
                <div
                    style={{
                        backgroundColor: 'red',
                        display: "flex",
                        alignItems: 'center',
                        height: 59,
                        marginTop: 16,
                        borderRadius: '0 25px 25px 0'
                    }}
                >
                    {
                        progress > 25 &&
                        <span style={{ color: 'white' }}>
                            حذف
                        </span>
                    }
                    <FiTrash2 style={{ color: 'white', margin: "0 .4rem" }} />
                </div>
            </SwipeAction>
        </TrailingActions>
    );
    useEffect(() => {
        switch (mode) {
            case 'players':
                setFooter(<PlayerFooter />)
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


    return (
        <div
            className="tournament-content-section-wrapper"
            style={{ backgroundColor: theme.background_color }}
        >
            {/* <div className="tournament-content-section-content"> */}
            <SwipeableList
                className="swipeable-list "
                threshold={.9}
            >
                {
                    contents.map((item, key) => {
                        return (
                            <SwipeableListItem
                                leadingActions={leadingActions(item.player._id)}
                                trailingActions={trailingActions(item.player._id)}
                                onSwipeStart={() => { setSwipedStatus(item.player._id) }}
                                onSwipeEnd={() => { setSwipedStatus('') }}
                                onSwipeProgress={setProgress}
                                key={item._id}
                            >
                                <UserItem
                                    style={{
                                        borderRadius: swipedStatus === item.player._id
                                            ? '0px' : '25px'
                                    }}
                                    {...item.player}
                                />
                            </SwipeableListItem>
                        )
                    })
                }
            </SwipeableList>
            {/* </div> */}
            {
                footer
            }
        </div>
    )
}

export default TournamentContentSection
{/* {contents.length > 0 &&
                        contents.map((item, key) => {
                            let body;
                            switch (mode) {
                                case 'games':
                                    body = <GameItem key={item.game._id} {...item.game} />
                                    break;
                                case 'players':
                                    body = <UserItem key={item._id} {...item.player} />
                                    break;
                                case 'referees':
                                    body = <UserItem key={item._id} {...item.referee} />
                                    break;
                                default:
                                    break;
                            }
                            return (
                                <SwipeableListItem
                                    leadingActions={leadingActions()}
                                    trailingActions={trailingActions()}
                                >
                                    Item content
                                </SwipeableListItem>
                            )
                        }
                        )} */}