import React from 'react'
import Input from "../../../../components/UI/Input/Input";
import IMAGE from '../../../../assets/images/userIcon.png'
import { HiCamera } from "react-icons/hi";

const CustomInput = ({ info, onChange }) => {
    return (
        <div className="input-line">
            {
                info.withImage &&
                <>
                    <img className="camera" src={info.imagePath === '' ? IMAGE : info.imagePath} alt="avtar" />
                    <div className="avatar">
                        <div className="avatar-upload-btn">
                            <HiCamera />
                        </div>
                    </div>
                </>
            }
            <Input
                value={info.value}
                onChange={onChange}
                isValid={info.isValid}
                error={!info.isValid && info.error} />
            <p> {info.title}</p>
        </div>
    )
}

export default CustomInput
