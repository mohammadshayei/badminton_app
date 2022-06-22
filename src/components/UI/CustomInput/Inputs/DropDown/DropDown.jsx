import { useEffect, useRef, useState } from "react"
import "./DropDown.scss"
import { BiChevronDown } from "react-icons/bi";
import { useTheme } from "../../../../../styles/ThemeProvider";

function useOnClickOutside(ref, reff, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (
                !ref.current ||
                ref.current.contains(event.target) ||
                !reff.current ||
                reff.current.contains(event.target)
            ) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

const DropDown = (props) => {
    const [drop, setDrop] = useState(false)

    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const divRef = useRef();
    const inRef = useRef();
    useOnClickOutside(inRef, divRef, () => {
        setDrop(false);
    });

    const itemClickHandler = (item) => {
        props.onChange(item)
        setDrop(false)
    }

    // useEffect(() => {
    //     if (drop)
    //         divRef.current.scrollIntoViewIfNeeded({ behavior: 'smooth', inline: 'center' })
    // }, [drop])

    return (
        <div {...props.elementConfig} className='dropdown-container' >
            <p className='title-class-name'>{props.title}
                <span className="required"
                    style={{
                        color: theme.error
                    }}
                >
                    {(props.validation) && (props.validation.required && '*')}
                </span>
            </p>
            <div ref={inRef} className='dropdown-input'
                style={{
                    backgroundColor: theme.surface,
                    color: theme.on_surface,
                    borderColor: theme.darken_border_color,
                }}
                onClick={() => setDrop(!drop)}
            >
                {props.value ? props.value : 'انتخاب کنید'}
                <div className={`dropdown-indicator-icon ${drop && "rotate"}`}>
                    <BiChevronDown />
                </div>
            </div>
            <div ref={divRef} className={`dropdown-list ${drop && "drop"}`}
                style={{ top: props.dropUp ? "unset" : "5rem", bottom: props.dropUp ? "3rem" : "unset" }}
            >
                <ul>
                    {props.items.length > 0 ?
                        (props.items.map((i, k) =>
                            <li key={k} onClick={() => itemClickHandler(i)}>{i.text}</li>))
                        :
                        <p className="no-item">موردی تعریف نشده</p>
                    }
                </ul>
            </div>
        </div>
    )
}

export default DropDown
