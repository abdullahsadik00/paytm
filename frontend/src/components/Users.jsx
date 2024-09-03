import React, { useEffect, useState } from 'react';
import axios from "axios"

import User from './User';

const UserList = () => {
  const [users, setUsers] = useState([  ]);
  const [filter,setFilter] = useState("")

  useEffect(()=>{
    axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`).then(res=>{
      console.log(res.data.user)
      setUsers(res.data.user)
    })
      },[filter])

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200" onChange={(e)=>setFilter(e.target.value)}
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

export default UserList;
