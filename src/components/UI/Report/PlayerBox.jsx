import './Report.scss'
const PlayerBox = (props) => {
    return (
        <div className='player-box' >
            {props.setWon && <div className="circle" />}
            {
                [...Array(2)].map((item, index) => {
                    return (props.players &&
                        props.players[index] ?
                        <div className='player-name' key={`${props.players[index]}${index}`}>
                            <p >{props.players[index]}</p>
                        </div> :
                        <div className='player-name' key={index}>
                            -
                        </div>)
                })
            }
            <p className='player-name'>Member Name</p>
            <div className={`base-class ${props.isLeftSide ? 'left' : 'right'}`}>
                <p>
                    {props.positionTeam}
                </p>
            </div>
        </div>
    )
}

export default PlayerBox
