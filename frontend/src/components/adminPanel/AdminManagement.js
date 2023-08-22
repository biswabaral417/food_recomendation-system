import React, { useEffect,useState } from 'react'
// import { useContext } from 'react';
// import CombinedContext from '../../contexts/CombinedContext';





export default function AdminManagement() {


  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const getAdmins = async () => {
      try {
        const res = await fetch('/api/Admins', {
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
            const filteredAdmins = data.filter(admin => !admin.isSuperUser);
            setAdmins(filteredAdmins);
          }
        }
        
      } catch (error) {
        console.log(error)
        
      }
    }

    return () => {
      getAdmins();
    }
  }, [])
  
  
  
  // console.log(admins)
  
  
  return (
    <div>
      <h1>
        AdminManagement
      </h1>


    </div>
  )
}
