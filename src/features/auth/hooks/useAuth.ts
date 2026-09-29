import {useEffect,useState} from "react";
import {currentUser} from "../api/authApi";
export function useAuth(){const[user,setUser]=useState<any>(currentUser);useEffect(()=>{const onStorage=()=>setUser(currentUser());window.addEventListener("storage",onStorage);return()=>window.removeEventListener("storage",onStorage)},[]);return{user}}
