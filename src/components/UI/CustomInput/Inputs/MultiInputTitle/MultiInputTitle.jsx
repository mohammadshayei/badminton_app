import './MultiInputTitle.scss'
const MultiInputTitle = (props) => {
    return (
        <div className='multi-input-title-wrapper'>
            <p className='title-class-name'>{props.title}</p>
            <div className="input-box-warpper">
                {
                    props.count > 0 && [...new Array(parseInt(props.count))].map((_, index) => (
                        <div className='box-wrapper' key={index}>
                            <input
                                type="text"
                                value={props.value[index]}
                                onChange={(e) => {
                                    props.onChange(e, index)
                                }}
                            />
                        </div>
                    ))

                }
            </div>
        </div>
    )
}

export default MultiInputTitle
