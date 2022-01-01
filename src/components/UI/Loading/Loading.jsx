import './Loading.scss'
const Loading = (props) => {
    return (
        <div className='loadinig-container'>
            <p className='loading' style={props.style}>
                ... لطفا کمی صبر کنید
            </p>
        </div>
    )
}

export default Loading
