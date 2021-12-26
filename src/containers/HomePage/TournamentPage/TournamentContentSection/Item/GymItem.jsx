import { useTheme } from "../../../../../styles/ThemeProvider";

const GymItem = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme
    console.log(props.land_numbers.map(item => item.number))
    let landNumbers = ''
    if (props.land_numbers && props.land_numbers.length > 0) {
        props.land_numbers.forEach((item, index) => {
            if (index + 1 === props.land_numbers.length)
                landNumbers += `${item.number}`
            else
                landNumbers += `${item.number} ,`
        })
    }
    return (
        <div
            className="gym-item-wrapper"
            style={{
                color: theme.on_background,
            }}
        >
            <p> {`نام باشگاه : ${props.title}`}</p>
            <div className="gym-detail-wrapper">
                <p style={{ marginLeft: "2rem" }}>{`تعداد زمین : ${props.land_count}`}</p>
                <p>{`شماره زمین ها : ${landNumbers}`}</p>

            </div>
        </div>
    )
}

export default GymItem
