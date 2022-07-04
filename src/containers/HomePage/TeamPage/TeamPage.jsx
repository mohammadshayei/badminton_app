/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./TeamPage.scss"
import { useNavigate, useLocation } from 'react-router-dom'
import Header from "../Header/Header";
import Button from "../../../components/UI/Button/Button";
import DEFAULT_LOGO from '../../../assets/images/team_avatar.png';
import MemberShipInfo from "../MemberShipInfo/MemberShipInfo";

const TeamPage = ({ id }) => {
    const [team, setTeam] = useState({
        title: "رعد پدافند هوایی قم",
        image: null,
    });
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null);
    const [content, setContent] = useState(null)
    const [filterSelectors, setFilterSelectors] = useState({
        informations: {
            text: "اطلاعات عضویت",
            selected: true,
        },
        games: {
            text: "مسابقات",
            selected: false,
        },
        players: {
            text: "بازیکن ها",
            selected: false,
        },
    });
    const [showInputForm, setShowInputForm] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const part = searchParams.get("part");

    const onSelectorClick = (key) => {
        let updatedFilterSelectors = { ...filterSelectors };
        for (const filter in updatedFilterSelectors) {
            updatedFilterSelectors[filter].selected = false;
        }
        updatedFilterSelectors[key].selected = true;
        setFilterSelectors(updatedFilterSelectors);
        setContent(null)
        navigate(`/teams/${id}?part=${key}`)
    }

    useEffect(() => {
        setShowInputForm(false)
        if (!part || !filterSelectors) return;
        let updatedFilterSelectors = { ...filterSelectors };
        for (const filter in updatedFilterSelectors) {
            updatedFilterSelectors[filter].selected = false;
        }
        updatedFilterSelectors[part].selected = true;
        setFilterSelectors(updatedFilterSelectors);
    }, [part])

    return <div className='team-page-wrapper'>
        {dialog}
        <Header
            title={team.title}
            image={team.image ? team.image : <img src={DEFAULT_LOGO} alt="logo" />}
            loading={loading}
            filterSelectors={filterSelectors}
            onSelectorClick={onSelectorClick}
        />
        {
            part === "informations" ?
                <MemberShipInfo />
                :
                part === "games" ?
                    "games" :
                    <div className='team-body'>
                        {/* <div className='tournament-search'>
                            <TournamentItemSearch
                                searchValue={searchValue}
                                searchPlaceHolder={`جستجو ${partTitle}`}
                                searchListItems={
                                    searchListItems.filter(item => listItem
                                        .findIndex(i => i._id === item._id) < 0)}
                                onSearch={onSearch}
                                searchLoading={searchLoading}
                                onAddItemToTournament={onAddItemToTournament}
                                selector={() => {
                                    if (part === 'team') return 'name'
                                    else if (part === 'player' || part === 'referee') return 'username'
                                    if (part === 'gym') return 'title'
                                }}
                                createAccess={part === 'referee' ? user?._id === tournament?.chief?._id : createAccess}
                            />
                            {
                                createAccess &&
                                <Button
                                    onClick={onAddItemClickHandler}
                                >
                                    <div className='button-add'>
                                        <AiOutlinePlus style={{ fontSize: 15 }} />
                                        {`${partTitle} جدید`}
                                    </div>
                                </Button>
                            }
                        </div>
                        <div className='tournament-content'>
                            <div className="tournament-list-items">
                                {
                                    contentLoading ?
                                        [...Array(5).keys()].map((v) =>
                                            <Skeleton
                                                key={v}
                                                className="tournament-item"
                                                direction='rtl'
                                                baseColor={theme.border_color}
                                                highlightColor={theme.darken_border_color}
                                                style={{ border: "none" }}
                                            />) :
                                        filteredListItems.length > 0 ?
                                            filteredListItems.map((item, index) =>
                                                <TeamItem
                                                    key={item._id}
                                                    index={index + 1}
                                                    indexNeeded={part === 'team' ? true : false}
                                                    item={item}
                                                    selector={() => {
                                                        if (part === 'team') return 'name'
                                                        else if (part === 'player' || part === 'referee') return 'username'
                                                        else if (part === 'gym') return 'title'
                                                    }}
                                                    onClick={() => onItemClick(item._id)}
                                                />
                                            )
                                            : <div className='not_found'>
                                                <Icon
                                                    icon="uit:exclamation-circle"
                                                    fontSize="3rem"
                                                    opacity={0.3}
                                                    color={theme.on_background}
                                                />
                                                {stringFa.item_not_found}
                                            </div>
                                }
                            </div>
                            <div className={`touranament-item-input ${createAccess ? "item-input-form" : ""}`}
                                style={{
                                    backgroundColor: window.innerWidth > 720 ? theme.background_color : theme.surface,
                                    display: showInputForm ? 'flex' : 'none',
                                }}>
                                {form}
                            </div>
                        </div> */}
                    </div>
        }

    </div>;

};

export default TeamPage;
