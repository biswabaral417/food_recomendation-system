import { useState, useEffect } from "react";
import CombinedContext from "./CombinedContext";
import Modal from "../components/userPanel/Modal"
const CombinedState = (props) => {

    //most important foods data



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




    // login button text variables



    //login modal
    //set up
    const [loginModal, setLoginModal] = useState(false);
    //opening modal
    const openLoginModal = () => {
        document.body.style.overflowY = "hidden";
        setLoginModal(true);

    }
    //closing modal
    const closeLoginModal = () => {
        setLoginModal(false);
        document.body.style.overflowY = "scroll";
    }


    //signup modal
    // setup
    const [signUpModal, setSignUpModal] = useState(false);
    //  opening signup modal
    const openSignUpModal = () => {
        document.body.style.overflowY = "hidden";
        setSignUpModal(true);
    }

    //closing singup modal
    const closeSignUpModal = () => {
        setSignUpModal(false);
        document.body.style.overflowY = "scroll";
    }



    //backend to f end stuff
    // use effect is called as soon as this context is run ie at time of webpage start thus gettingAllfoods function is called at start 
    useEffect(() => {
        getUserInfo();
        setInterval(() => {
            getUserInfo();
        }, 90000)

    }, [])




    //login 
    const [logBtntxt, setLogbtnTxt] = useState("Login");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    ///this is used to logging in user throgh login modal
    const PostData_Login = async (e) => {
        e.preventDefault()
        // console.log((document.getElementById('flexCheckChecked').checked))
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userEmail, userPassword })
        });
        const data = await res.json();
        console.log(res.json);
        if (res.status === 422 || !data) {
            window.alert(data.error);

        }
        else if (res.status === 201) {
            window.alert(data.sucess);
            console.log(data.sucess);
            setLogbtnTxt("Log out")
            setUserlogInfo(true);
            closeLoginModal();
        }
        else {
            window.alert("connection error")
        }
    }



    //this updates login logout function 
    const [userlogInfo, setUserlogInfo] = useState(false);
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
                if (data) {
                    setUserlogInfo(true)
                    setLogbtnTxt("Logout");
                }
                console.log(data)
            }

        } catch (error) {
            // console.log(error) //if u ever feel u need to check 

        }
    }

    //logout functions
    const logout = async () => {
        const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
        });
        const data = await res.json();
        console.log(res.json);
        if (res.status === 422 || !data) {
            window.alert(data.error);

        }
        else if (res.status === 200) {
            window.alert(data.sucess);
            console.log(data.sucess);
            setLogbtnTxt("Login")
            setUserlogInfo(false);
        }
        else {
            window.alert("connection error")
        }
    }


    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        const getallfoods = async () => {
            try {
                const res = await fetch('/api/foodsdata', {
                    method: "GET"
                });
                const data = await res.json();

                if (!(res.status === 200)) {
                    const error = new Error(res.error);
                    throw error;
                } else {
                    setJsonData(data);
                }
            } catch (error) {
                console.log(error);
            }
        };


        getallfoods();
    }, []);


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
    const logInOutBtnFunc = () => {
        if (userlogInfo) {
            logout();
        }
        else {
            openLoginModal();
        }
    }


    const CombinedState = {

        jsonData,
        itemSearch,
        searchStr,
        mode,
        toggleMode,
        logInOutBtnFunc,
        userlogInfo,
        openLoginModal,
        logout,
        ucart,
        addToCart,
        cancelCart,
        itemToView,
        viewData,
        reduceItem,
        Modal,
        closeModal,
        getUserInfo,
        logBtntxt,
        closeLoginModal,
        loginModal,
        signUpModal,
        openSignUpModal,
        closeSignUpModal,
        setUserEmail,
        setUserPassword,
        PostData_Login,

    }
    return (
        <CombinedContext.Provider value={CombinedState}>
            {props.children}
        </CombinedContext.Provider>
    );
}
export default CombinedState;