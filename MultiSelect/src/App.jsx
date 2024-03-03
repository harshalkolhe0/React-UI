import { useEffect, useState, useRef } from "react";
import "./App.css";
import { elements } from "./config";
function App() {
    const [selected, _setSelected] = useState([]);
    const [list, _setList] = useState([]);
    const [search, _setSearch] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(0);
    const [suggestions, setSuggestions] = useState([]);
    const selectedRef = useRef(selected);
    const searchRef = useRef(search);
    const listRef = useRef(list);

    function setList(list) {
        listRef.current = list;
        _setList(list);
    }
    function setSelected(selected) {
        selectedRef.current = selected;
        _setSelected(selected);
    }
    function setSearch(search) {
        searchRef.current = search;
        _setSearch(search);
    }

    function handleClick(user) {
        setSearch("");
        setSelected([...selected, user]);
        setList(list.filter((e) => e.text !== user.text));
        document.getElementById("input").focus();
        setShowSuggestions(0);
    }
    function handleOnChange(e) {
        setSearch(e.target.value);
    }
    function canInclude(user) {
        if (user.text.toLowerCase().includes(search.toLowerCase())) return true;
        return false;
    }
    function handleBackSpace(e) {
        //console.log("Here backspace", e.key);
        if (e.key === "Backspace") {
            //console.log(selectedRef.current.length, searchRef.current.length);
            if (
                selectedRef.current.length > 0 &&
                searchRef.current.length === 0
            ) {
                //console.log("lastif", e.key);
                const last =
                    selectedRef.current[selectedRef.current.length - 1];
                setList([...listRef.current, last]);
                setSelected(
                    selectedRef.current.filter((e) => e.text !== last.text)
                );
            }
        }
    }
    function handleEnter(e) {
        //console.log("Here backspace", e.key);
        if (e.key === "Enter") {
            console.log("home work");
        }
    }

    useEffect(() => {
        setList(elements);
        setSuggestions(elements);

        document
            .getElementById("input")
            .addEventListener("keydown", handleBackSpace);
        document
            .getElementById("input")
            .addEventListener("keydown", handleEnter);
        return () => {
            document
                .getElementById("input")
                .removeEventListener("keydown", handleEnter);
            document
                .getElementById("input")
                .removeEventListener("keydown", handleBackSpace);
        };
    }, []);

    return (
        <div className="inOneLine">
            <div
                className="same-row"
                onClick={() => {
                    document.getElementById("input").focus();
                }}
            >
                {selected?.length > 0 &&
                    selected.map((element, i) => {
                        return (
                            <div key={i} className="multiList">
                                <img
                                    src={element.imgSrc}
                                    alt="image"
                                    className="img"
                                />
                                <span className="text">{element.text}</span>
                            </div>
                        );
                    })}
                <div>
                    <input
                        id="input"
                        type="text"
                        value={search}
                        placeholder="Enter some value"
                        onChange={(e) => {
                            handleOnChange(e);
                            setShowSuggestions(1);
                        }}
                    />
                </div>
            </div>
            <div style={{ width: "100%" }}>
                <div>
                    {showSuggestions > 0 &&
                        list?.length > 0 &&
                        list.map((element, i) => {
                            if (!canInclude(element)) return;
                            return (
                                <div
                                    key={i}
                                    className="multiList"
                                    onClick={() => handleClick(list[i])}
                                >
                                    <img
                                        src={element.imgSrc}
                                        alt="image"
                                        className="img"
                                    />
                                    <span className="text">{element.text}</span>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default App;
