import { useEffect, useRef, useState } from "react"
import "./DropDown.scss"
import { BiChevronDown } from "react-icons/bi";

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

    const divRef = useRef();
    const inRef = useRef();
    useOnClickOutside(inRef, divRef, () => {
        setDrop(false);
    });

    const itemClickHandler = (item) => {
        props.onChange(item)
        setDrop(false)
    }

    useEffect(() => {
        if (drop)
            divRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }, [drop])

    return (
        <div {...props.elementConfig} className='dropdown-container' >
            <p className='title-class-name'>{props.title}</p>
            <div ref={inRef} className='dropdown-input'
                onClick={() => setDrop(!drop)}
            >
                {props.value ? props.value : 'انتخاب کنید'}
                <div className={`dropdown-indicator-icon ${drop && "rotate"}`}>
                    <BiChevronDown />
                </div>
            </div>
            <div ref={divRef} className={`dropdown-list ${drop && "drop"}`}>
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
