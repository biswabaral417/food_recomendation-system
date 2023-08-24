import React, { useContext, useState, useEffect } from 'react';
import ManagePendingAdmins from './ManagePendingAdmins';
import ManageExistingAdmins from './ManageExistingAdmins';
import CombinedContext from '../../contexts/CombinedContext';

export default function AdminManagement() {
  const { mode } = useContext(CombinedContext);
  const [showManageAdmins, setShowManageAdmins] = useState(false);
  const [showPendingAdmins, setShowPendingAdmins] = useState(true);
  const [isSuperUser, setIsSuperUser] = useState(false);

  const toggleManage = (e) => {
    if (e.target.id === 'pendingAdmins') {
      setShowPendingAdmins(true);
      setShowManageAdmins(false);
    } else {
      setShowManageAdmins(true);
      setShowPendingAdmins(false);
    }
  };

  const [existingAdmins, setExistingAdmins] = useState([]);
  const [pendingAdmins, setPendingAdmins] = useState([]);

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
        } else {
          if (data) {
            const filteredExistingAdmins = data.filter(admin => admin.isAdmin === "true" && !admin.isSuperUser);
            const filteredPendingAdmins = data.filter(admin => admin.isAdmin === "pending" && !admin.isSuperUser);
            setExistingAdmins(filteredExistingAdmins);
            setPendingAdmins(filteredPendingAdmins);
          }
        }

      } catch (error) {
        console.log(error)
      }
    }

    getAdmins();
  }, []);

  const checkAuthority = async () => {
    try {
      const res = await fetch('/api/Admins/super/Issuperuser', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      setIsSuperUser(data.isSuperUser);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    checkAuthority();
  }, []);

  if (!isSuperUser) {
    return null;
  }

  return (
    <div>
      <h1>AdminManagement</h1>
      <div style={{ display: 'flex' }}>
        <button id='ManageAdmins' className={`p-2 bg-${mode} text-${mode === "dark" ? "white" : "black"} ${showManageAdmins ? 'selected' : ''}`} onClick={toggleManage} style={{ border: '1px solid #DCDCDC', borderBottom: showManageAdmins ? 'none' : '1px solid #DCDCDC', borderTopLeftRadius: "15px" }}>
          Manage Admins
        </button>
        <button id='pendingAdmins' className={`p-2 bg-${mode} text-${mode === "dark" ? "white" : "black"} ${showPendingAdmins ? 'selected' : ''}`} onClick={toggleManage} style={{ border: '1px solid #DCDCDC', borderBottom: showPendingAdmins ? 'none' : '1px solid  #DCDCDC', borderTopRightRadius: "15px" }}>
          Pending Admin Requests
        </button>
      </div>
      <div className={`p-3 bg-${mode}   pendingAdmins ${showPendingAdmins ? 'active' : ''}`} style={{ display: showPendingAdmins ? 'block' : 'none' }}>
        <ManagePendingAdmins pendingAdmins={pendingAdmins} setPendingAdmins={setPendingAdmins} setExistingAdmins={setExistingAdmins} existingAdmins={existingAdmins} />
      </div>
      <div className={`p-3 bg-${mode} ManageAdmins ${showManageAdmins ? 'active' : ''}`} style={{ display: showManageAdmins ? 'block' : 'none' }}>
        <ManageExistingAdmins existingAdmins={existingAdmins} setExistingAdmins={setExistingAdmins} />
      </div>
    </div>
  );
}
