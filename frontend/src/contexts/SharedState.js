
import SharedPropsContext from "./SharedPropsContext";
import { useState } from "react";
import Modal from "../components/Modal";
import { useEffect } from "react";

const SharedState = (props) => {

    //fend stuffs

    //searching
    const [searchStr, setSearchStr] = useState("");
    const itemSearch = (item) => {
        setSearchStr(item);
    };

    //carts
    const [ucart, setUcart] = useState([]);

    const addToCart = (item) => {
        setUcart([...ucart, item]);
    };

    const cancelCart = () => {
        setUcart([]);
    };

    const reduceItem = (item) => {
        const itemIndex = ucart.findIndex((cartItem) => cartItem === item);

        if (itemIndex !== -1) {
            const updatedCart = [...ucart];
            updatedCart.splice(itemIndex, 1);
            setUcart(updatedCart);
        }
    };

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



    //backend to f end stuff
    // use effect is called as soon as this context is run ie at time of webpage start thus gettingAllfoods function is called at start 
    useEffect(() => {
        getallfoods();
        getUserInfo();
        setInterval(() => {
            getUserInfo();
        }, 90000)

    }, [])


    //this updates login logout function 
    const [userlogInfo, setUserlogInfo] = useState(false);
    //jsonData is fooditems data send by backend 
    const [jsonData, setJsonData] = useState([])
    const getUserInfo = async () => {
        try {
            const res = await fetch('/api/logs', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"

            });
            const data = await res.json();
            
            if (!(res.status === 200)) {
                const error = new Error(res.error)
                throw error;
            }
            else {
                if(data){
                    setUserlogInfo(true)
                    setLogbtnTxt("Logout");
                }
                console.log(data)
            }

        } catch (error) {
            // console.log(error) if u ever fell u need to check 

        }
    }

    const [logBtntxt,setLogbtnTxt]=useState("Login")




//this functon fetches data send by backend 
const getallfoods = async () => {
    try {
        const res = await fetch('/api/foodsdata', {
            method: "GET"
        });
        const data = await res.json();

        if (!(res.status === 200)) {
            const error = new Error(res.error)
            throw error;
        }
        else {
            setJsonData(data)
        }

    } catch (error) {
        console.log(error)

    }
}




const SharedState = {
    userlogInfo,
    searchStr,
    itemSearch,
    ucart,
    addToCart,
    cancelCart,
    itemToView,
    viewData,
    mode,
    toggleMode,
    jsonData,
    reduceItem,
    Modal,
    closeModal,
    getUserInfo,
    logBtntxt

};

return (
    <SharedPropsContext.Provider value={SharedState}>
        {props.children}
    </SharedPropsContext.Provider>
);
}
export default SharedState;