"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react";
import Axios from "../Axios";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  useEffect(() => {
    const requestIntercept = Axios.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.user.accessToken}`
      }
      return config
    });
    return () => {
      Axios.interceptors.request.eject(requestIntercept);
    }
  }, [session])
  return Axios;
}


export default useAxiosAuth;