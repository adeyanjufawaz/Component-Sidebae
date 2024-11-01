"use client"

import { useEffect, useState } from "react"
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";


export default function Blogs() {
       const [currentUserID,setCurrentUserID] = useState()
    
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrentUserID(user.uid)
        } else {
          console.log("No user is signed in.");
        }
      });  
    }, [])
    
  return (
      <div>
          <h2>Blogs</h2>
          <p>{currentUserID }</p>
    </div>
  )
}
