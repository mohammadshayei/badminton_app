/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./TeamPage.scss"
import { useNavigate, useLocation } from 'react-router-dom'
import Header from "../Header/Header";
import DEFAULT_LOGO from '../../../assets/images/team_avatar.png';
import MemberShipInfo from "../MemberShipInfo/MemberShipInfo";
import { dynamicApi } from "../../../api/home";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useSelector } from "react-redux";
import TeamTournaments from "../TeamTournaments/TeamTournaments";
import TeamPlayers from "../TeamPlayer/TeamPlayers";
import Footer from "../Footer/Footer";
import { baseUrl } from "../../../constants/Config";

const TeamPage = ({ id }) => {

    let baseFilterSelector = {

        games: {
            text: "مسابقات",
            selected: false,
        },
        players: {
            text: "بازیکن ها",
            selected: false,
        },
    }


    const [team, setTeam] = useState();
    const [createAccess, setCreateAccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(null);
    const [filterSelectors, setFilterSelectors] = useState(baseFilterSelector);
    const [data, setData] = useState(null)
    const { token, user } = useSelector(state => state.auth)

    const navigate = useNavigate()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const part = searchParams.get("part");
    const item = searchParams.get("item");
    const create = searchParams.get("create");



    const onSelectorClick = (key) => {
        let updatedFilterSelectors = { ...filterSelectors };
        for (const filter in updatedFilterSelectors) {
            updatedFilterSelectors[filter].selected = false;
        }
        updatedFilterSelectors[key].selected = true;
        setFilterSelectors(updatedFilterSelectors);
        setData(null)
        navigate(`/teams/${id}?part=${key}`)
    }
    useEffect(() => {
        if (!data?.ownerId || !user) return;
        if (user._id === data.ownerId) setCreateAccess(true)
        else setCreateAccess(false)
    }, [data?.ownerId, user])

    useEffect(() => {
        let updatedFilterSelectors = { ...baseFilterSelector }
        if (createAccess) {
            updatedFilterSelectors = {
                informations: {
                    text: "اطلاعات عضویت",
                    selected: true,
                },
                ...updatedFilterSelectors,
            }
        }
        for (const filter in updatedFilterSelectors) {
            updatedFilterSelectors[filter].selected = false;
        }
        if (updatedFilterSelectors[part])
            updatedFilterSelectors[part].selected = true;
        setFilterSelectors(updatedFilterSelectors)
    }, [createAccess])
    useEffect(() => {
        if (!part || !filterSelectors) return;
        let updatedFilterSelectors = { ...filterSelectors };
        for (const filter in updatedFilterSelectors) {
            if (filter === part)
                updatedFilterSelectors[filter].selected = true;
            else
                updatedFilterSelectors[filter].selected = false;
        }
        setFilterSelectors(updatedFilterSelectors);
    }, [part])

    useEffect(() => {
        if (!id || !part) return;
        setDialog(null);
        setLoading(true);
        let url;
        switch (part) {
            case 'informations':
                url = 'get_team_info';
                break;
            case 'games':
                url = 'get_teams_tournaments';
                break;
            case 'players':
                url = 'get_team_players';
                break;
            default:
                break;
        }
        (async () => {
            try {
                const fetchedData = await dynamicApi({ teamId: id }, token, url)
                if (!fetchedData.success) {
                    setDialog(<ErrorDialog type="error">{fetchedData.data.message}</ErrorDialog>)
                    setLoading(false)
                    return;
                }
                setTeam({ image: fetchedData.data.data.image, title: fetchedData.data.data.name, ownerId: fetchedData.data.data.ownerId })
                setData(fetchedData.data.data)
            } catch (error) {
                setLoading(false)
                setDialog(<ErrorDialog type="error">{stringFa.error_occured}</ErrorDialog>)

            }
        })()
        setLoading(false);
    }, [id, part])
    return <div className='team-page-wrapper'>
        {dialog}
        <Header
            title={team?.title}
            image={team?.image ? <img src={`${baseUrl}uploads/teams/${team.image}`} alt='' /> : <img src={DEFAULT_LOGO} alt="logo" />}
            owner={team?.ownerId}
            id={id}
            loading={loading}
            filterSelectors={filterSelectors}
            onSelectorClick={onSelectorClick}
        />
        {
            part === "informations" ?
                <MemberShipInfo
                    data={data}
                    setData={setData}
                    teamId={id}
                    setDialog={setDialog}

                />
                :
                part === "games" ?
                    <TeamTournaments
                        data={data}
                    /> :
                    <TeamPlayers
                        data={data}
                        loading={loading}
                        setDialog={setDialog}
                        itemId={item}
                        teamId={id}
                        create={create}
                        createAccess={createAccess}
                    />
        }
        <Footer />
    </div>;

};

export default TeamPage;
