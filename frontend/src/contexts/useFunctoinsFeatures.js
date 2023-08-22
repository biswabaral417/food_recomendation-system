import { useState } from 'react'

export default function useFunctoinsFeatures() {
    //view 

    const [itemToView, setItemToview] = useState("");
    const viewData = (item) => {
        document.body.style.overflowY = "hidden";
        setItemToview(item);
    };
    const closeModal = () => {
        document.body.style.overflowY = "scroll";
        setItemToview("")
    }
    //searching
    const [searchStr, setSearchStr] = useState("");
    const itemSearch = (item) => {
        setSearchStr(item);
    };
    //dark mode
    const [mode, setMode] = useState("light");

    const toggleMode = () => {
        if (mode === "light") {
            setMode("dark");
            document.querySelector('body').style.cssText = "background-color:black;color:white;";
        } else {
            setMode("light");
            document.querySelector('body').style.cssText = "background-color:white;color:black;";
        }
    };


    return {
        itemToView, viewData, closeModal,searchStr,itemSearch,toggleMode,mode
    }
}
