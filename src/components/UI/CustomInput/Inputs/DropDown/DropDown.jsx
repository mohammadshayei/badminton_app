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
    const [searchValue, setSearchValue] = useState('')
    const [filterItems, setFilterItems] = useState([])
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    const divRef = useRef();
    const inRef = useRef();
    useOnClickOutside(inRef, divRef, () => {
        setDrop(false);
    });

    useEffect(() => {
        if (searchValue) {
            setFilterItems(props.items.filter(item => item.text.includes(searchValue)))
        }
        else {
            setFilterItems(props.items)
        }
    }, [searchValue, props.items])


    const itemClickHandler = (item) => {
        console.log(item)
        props.onChange(item)
        setDrop(false)
    }
    // useEffect(() => {
    //     if (drop)
    //         divRef.current.scrollIntoViewIfNeeded({ behavior: 'smooth', inline: 'center' })
    // }, [drop])
    return (
        <div
            {...props.elementConfig}
            className='dropdown-container'
            style={props.containerStyle}

        >
            <p className='title-class-name'
                style={{ display: props.title ? "flex" : "none" }}
            >{props.title}
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
                    borderColor: (props.invalid && props.shouldValidate && props.touched) ? theme.error : drop ? theme.primary : theme.darken_border_color,
                    ...props.inputStyle,
                }}
                onClick={() => setDrop(!drop)}
                tabIndex="0"
                // onKeyDown={(e) => { console.log(e) }}
                onKeyDown={e => {
                    if (e.key === "Backspace")
                        setSearchValue(searchValue.substring(0, searchValue.length - 1))
                }}
                onKeyPress={(e) => { setSearchValue(searchValue + e.key) }}
                onBlur={() => setSearchValue('')}
            >
                <p
                    style={{
                        opacity: props.value ? 1 : 0.5
                    }}
                >
                    {props.value ? props.value : props.placeHolder ? props.placeHolder : 'انتخاب کنید'}
                </p>
                <div className={`dropdown-indicator-icon ${drop && "rotate"}`}>
                    <BiChevronDown />
                </div>
            </div>
            <div className="drop-down-list-top">
                <div ref={divRef} className={`dropdown-list ${drop && "drop"}`}
                    style={{
                        backgroundColor: theme.surface,
                        color: theme.on_surface,
                        borderColor: theme.darken_border_color,
                        ...props.listStyle
                        // top: props.dropUp ? "unset" : "5rem", bottom: props.dropUp ? "3rem" : "unset"
                    }}
                >
                    <ul>
                        {filterItems.length > 0 ?
                            (filterItems.map((i, k) =>
                                <li key={k} onClick={() => itemClickHandler(i)}>{i.text}</li>))
                            :
                            <p className="no-item">موردی تعریف نشده</p>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DropDown
