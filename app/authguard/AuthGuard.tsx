'use client'

import { useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { Box, useToast } from '@chakra-ui/react'
import { useAuthContext } from '../context/AuthContext';

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const {user} = useAuthContext();
  const router = useRouter();
  const toast = useToast();


  useEffect(() => {
    if (user === null) {
      toast({
        title:'ログアウトしました',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      router.push('/signin')
    }else if (user){
      toast({
        title: 'ログインしました',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [user, router])

  if(typeof user === 'undefined') {
    return <Box>Loading...</Box>
  }

  if (user === null) {
    return null
  }
  
  return <>{children}</>
}
