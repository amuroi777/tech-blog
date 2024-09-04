'use client'

import {createContext, ReactNode, useContext, useEffect, useState,} from 'react'
import {User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'; 

export type GlobalAuthState = {
  user: User | null | undefined
}

const AuthContext = createContext<GlobalAuthState>({user: undefined})

// const initialState: GlobalAuthState = {
//   user: undefined,
// }

type Props = {children: ReactNode}

export const AuthProvider = ({children}: Props) =>{
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthStateChanged:', user)
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

return(
<AuthContext.Provider value={{user}}>
  {children}
  </AuthContext.Provider>
)
  
}

export const useAuthContext = () => {
 const context = useContext(AuthContext);

 return context;
 }
