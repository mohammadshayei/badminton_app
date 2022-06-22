import "./InputForm.scss";
import CustomInput from "../CustomInput/CustomInput";
import { onChange } from "../../../utils/authFunction";

const InputForm = ({ order, setOrder, setFormIsValid, wrapperStyle }) => {

    return <div className="inputs-wrapper"
        style={wrapperStyle}>
        {Object.entries(order).map(([k, v]) =>
            <div
                key={k}
                className="input-item"
                style={v.style}
            >
                <CustomInput
                    {...v}
                    onChange={(e) => onChange(e, k, order, setOrder, setFormIsValid)}
                />
            </div>)
        }
    </div>;
};

export default InputForm;