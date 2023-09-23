import CombinedContext from "./CombinedContext";
import Modal from "../components/userPanel/Modal"
import fetchData from "./useFetchData";
import useAcessControl from "./useAcessControl";
import useFunctoinsFeatures from "./useFunctoinsFeatures";
import useCarts from "./useCarts";




const CombinedState = (props) => {
    const  {jsonData  }=fetchData();//this function fetches foods data from backend server which is connected to db


    const {closeModal,itemToView,viewData,itemSearch,searchStr,mode,Removefoodmodalv,closeRemovefoodModal,openRemovefoodModal,
        toggleMode,addfoodmodalv,closeAddfoodModal,openAddfoodModal}=useFunctoinsFeatures()


    //this is all about login logout and sighnup
    const {
        logInOutBtnFunc,userlogInfo,openLoginModal,setLogbtnTxt,logout,logBtntxt,
        closeLoginModal,getUserInfo,setUserlogInfo,loginModal,signUpModal,openSignUpModal
        ,closeSignUpModal,setUserEmail,setUserPassword,PostData_Login,userType} =  useAcessControl();


 
    const {
        ucart,addToCart,EmptyCart,reduceItem,order
    }=useCarts(openLoginModal,userlogInfo)




    // login button text variables



    //login modal
 


    //signup modal
   




   
  
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
        EmptyCart,
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
        setUserlogInfo,
        setLogbtnTxt,
        userType,order,

        addfoodmodalv,
        closeAddfoodModal,
        openAddfoodModal,
        Removefoodmodalv,closeRemovefoodModal,openRemovefoodModal
        

    }
    return (
        <CombinedContext.Provider value={CombinedState}>
            {props.children}
        </CombinedContext.Provider>
    );
}
export default CombinedState;