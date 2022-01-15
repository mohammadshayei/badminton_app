import './Report.scss'
const PlayerBox = (props) => {
    return (
        <div >
            {
                props.players && props.players.map((name,index) =>
                    <p key={`${name}${index}`}>{name}</p>
                )
            }
            <p>Member Name</p>
        </div>
    )
}

export default PlayerBox
