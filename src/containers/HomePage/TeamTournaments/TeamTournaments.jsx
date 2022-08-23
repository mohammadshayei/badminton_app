import './TeamTournaments.scss'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { useTheme } from '../../../styles/ThemeProvider';
import { useNavigate } from 'react-router-dom';

const TeamTournaments = ({ data }) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const navigate = useNavigate()

    const naviagteTournament = (id) => {
        if (!id) return;
        navigate(`/tournaments/${id}?part=team`)
    }
    return (
        <div className='team-tournaments-wrapper'>
            <div className='team-tournaments-title'>
                <p className='team-tournament-date'>تاریخ</p>
                <p>عنوان مسابقه</p>
            </div>
            <div className="tournamnets-item">
                {
                    data?.tournaments?.map(item =>
                        <div className='item-wrapper' key={item.tournament?._id}>
                            <div className="date">
                                <p>{new Date(item.tournament.game_date?.start).toLocaleDateString('fa-IR')}</p>
                                <p className='date-middle'>تا</p>
                                <p>{new Date(item.tournament.game_date?.end).toLocaleDateString('fa-IR')}</p>

                            </div>
                            <div className="arrow">
                                <HiOutlineArrowNarrowLeft />
                            </div>
                            <div className="title" style={{ color: theme.primary }}
                                onClick={() => naviagteTournament(item.tournament._id)}
                            >
                                {item.tournament.title}
                            </div>
                        </div>)
                }

            </div>
        </div>
    )
}

export default TeamTournaments