
const RawData = ({ data }) => {
    return (
        data && Object.entries(data).map(([_, team], index) =>
            `${team.players.map((p) => `${p.player.username}`)}-${team.setWon}-${team.score}${team.server ? '-س' : ''}${index < Object.entries(data).length - 1 ? '-' : ''}`
        )
    );
};

export default RawData;
