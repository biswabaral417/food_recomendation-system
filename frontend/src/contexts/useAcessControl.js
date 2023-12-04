import { useState, useEffect } from 'react'

function useAcessControl() {


    const [loginModal, setLoginModal] = useState(false);
    const [userlogInfo, setUserlogInfo] = useState(false);
    const [logBtntxt, setLogbtnTxt] = useState("Login");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState(null);
    const [userType, setUserType] = useState("customer");



    const getUserInfo = async () => {
        if (document.cookie) {
            try {
                const res = await fetch('/api/logs', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"

                },
                credentials: "include",
            });
            const data = await res.json();
            
            if ((res.status === 401)) {
                setUserType("customer")
                setUserlogInfo(false)
            }
            else if (res.status===200){
                if (data.userIs === "admin") {
                    setUserType("admin")
                }
                else if(data.userIs==="dvg"){
                    setUserType("dvgw")

                }
                else {
                    setUserType("customer")
                }
                setUserlogInfo(true)
                setLogbtnTxt("Log out");
            }

            else  {
                const error = new Error(res.error)
                throw error;
            }
        } catch (error) {
            setUserType("customer")
            console.log(error)
        }
    }
}


    //logout functions
    const logout = async () => {
        const res = await fetch("/api/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert(data.error);
        }
        else if (res.status === 200) {
            window.alert(data.success);
            console.log(data.success);
            setLogbtnTxt("Login")
            setUserlogInfo(false);
            window.location.reload();
        }
        else {
            window.alert("connection error")
        }
        


    }


    //login 
    ///this is used to logging in user throgh login modal


    const PostData_Login = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userEmail, userPassword })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert(data.error);

        }
        else if (res.status === 201) {
            window.alert(data.success);
            console.log(data.success);
            setLogbtnTxt("Log out")
            setUserlogInfo(true);
            closeLoginModal();
            window.location.reload();

        }
        else {
            window.alert("connection error")
        }
        // Location.reload()
      
    }



    //   this sets loging button press as user log info
    const logInOutBtnFunc = () => {
        if (userlogInfo) {
            logout();
        }
        else {
            openLoginModal();
        }
    }


    const [signUpModal, setSignUpModal] = useState(false);
    //  opening and closing signup modal 
    const openSignUpModal = () => {
        document.body.style.overflowY = "hidden";
        setSignUpModal(true);
    }

    const closeSignUpModal = () => {
        setSignUpModal(false);
        document.body.style.overflowY = "scroll";
    }


    //opening and cloding login modals
    const openLoginModal = () => {
        document.body.style.overflowY = "hidden";
        setLoginModal(true);

    }

    const closeLoginModal = () => {
        setLoginModal(false);
        document.body.style.overflowY = "scroll";
    }


    //get userinfo every 90000ms
    useEffect(() => {
        getUserInfo();
        setInterval(() => {
            getUserInfo();
        }, 90000)

    }, [])
    return {
        logInOutBtnFunc, userlogInfo, openLoginModal, logout, logBtntxt,
        closeLoginModal, getUserInfo, loginModal, signUpModal, openSignUpModal
        , closeSignUpModal, setUserEmail, setUserPassword, PostData_Login, setUserlogInfo, setLogbtnTxt, userType


    }
}
export default useAcessControl;