import "./InputForm.scss";
import CustomInput, { elementTypes } from "../CustomInput/CustomInput";
import { onChange, onExit } from "../../../utils/authFunction";
import TextComponent from "../TextComponent/TextComponent";

const InputForm = ({ setChanged, createAccess, itemLoading, order, setOrder, setFormIsValid, wrapperStyle }) => {
    return <div className={`inputs-wrapper ${createAccess ? "form" : ""}`}
        style={wrapperStyle}>
        {Object.entries(order).map(([k, v]) =>
            <div
                key={k}
                className="input-item"
                style={v.style}
            >
                {
                    createAccess ?
                        <CustomInput
                            {...v}
                            onChange={(e, indexArray) => {
                                if (setChanged)
                                    setChanged(true)
                                if (v.elementType === elementTypes.switchInput
                                    || v.elementType === elementTypes.datePicker || v.elementType === elementTypes.dropDown)
                                    onChange(e, k, order, setOrder, setFormIsValid)
                                else
                                    onChange(e.target.value, k, order, setOrder, setFormIsValid, indexArray)

                            }}
                            onExit={() => onExit(k, order, setOrder)}
                        />
                        : <TextComponent
                            value={v.elementType === elementTypes.datePicker ? new Date(v.value).toLocaleDateString('fa-IR') : v.value}
                            title={v.title}
                        />
                }

            </div>)
        }
    </div>;
};

export default InputForm;