/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./TeamPage.scss"
import { useNavigate, useLocation } from 'react-router-dom'
import Header from "../Header/Header";
import Button from "../../../components/UI/Button/Button";
import DEFAULT_LOGO from '../../../assets/images/team_avatar.png';
import MemberShipInfo from "../MemberShipInfo/MemberShipInfo";
import { dynamicApi } from "../../../api/home";
import ErrorDialog from "../../../components/UI/Error/ErrorDialog";
import { stringFa } from "../../../assets/strings/stringFaCollection";
import { useSelector } from "react-redux";

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
    const [data, setData] = useState(null)
    const { token } = useSelector(state => state.auth)

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
        (async () => {
            try {
                const fetchedData = await dynamicApi({ teamId: id }, token, 'get_team_info')
                if (!fetchedData.success) {
                    setDialog(<ErrorDialog type="error">{fetchedData.data.message}</ErrorDialog>)
                    setLoading(false)
                    return;
                }
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
            title={team.title}
            image={team.image ? team.image : <img src={DEFAULT_LOGO} alt="logo" />}
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
                    "games" :
                    <div className='team-body'>
                    </div>
        }
    </div>;

};

export default TeamPage;
