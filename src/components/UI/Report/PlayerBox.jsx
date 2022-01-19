import './Report.scss'
const PlayerBox = (props) => {
    return (
        <div className='player-box' >
            {
                props.players && props.players.map((name, index) =>
                    <div className='player-name' key={`${name}${index}`}>
                        <p >{name}</p>
                    </div>
                )
            }
            <p>Member Name</p>
            <div className={`base-class ${props.isLeftSide ? 'left' : 'right'}`}>
                <p>
                    {props.positionTeam}
                </p>
            </div>
        </div>
    )
}

export default PlayerBox
