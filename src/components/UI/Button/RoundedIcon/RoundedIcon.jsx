import React, { useEffect, useState } from 'react'
import './RoundedIcon.scss'
import { HiOutlinePlusSm } from 'react-icons/hi'
import { AiOutlineMinus } from 'react-icons/ai'
import { GiWhistle } from 'react-icons/gi'


const RoundedIcon = ({ color, type }) => {
    const [icon, setIcon] = useState(null)
    const iconStyle = {
        fontSize: '20px',
        color
    }
    useEffect(() => {
        switch (type) {
            case 'plus':
                setIcon(<HiOutlinePlusSm style={{ ...iconStyle }} />)
                break;
            case 'minus':
                setIcon(<AiOutlineMinus style={{ ...iconStyle }} />)
                break;
            case 'whistle':
                setIcon(<GiWhistle style={{ ...iconStyle }} />)
                break;
            default:
            case 'plus':
                setIcon(<HiOutlinePlusSm style={{ ...iconStyle }} />)
                break;
        }
    }, [type])
    return (
        <div className='rounded-icon-conatiner' style={{ border: `1px solid ${color}` }}>
            {icon}
        </div>
    )
}

export default RoundedIcon
