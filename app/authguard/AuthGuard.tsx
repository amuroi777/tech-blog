'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { Box, useToast } from '@chakra-ui/react'
import { useAuthContext } from '../context/AuthContext';

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const {user} = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();


  useEffect(() => {
    console.log('AuthGuard user:', user); // ユーザー情報を確認

    if(user === undefined) {
      return;
     }

     if(pathname === '/' && user === null) {
      return;
     }

    if (user === null) {
      toast({
        title:'ログアウトしました',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      //ログアウト時にsessionStrageの中身をクリアにする
      sessionStorage.removeItem('login-toast');
      router.push('/signin')
    }

    if (user && !sessionStorage.getItem('login-toast')){
      if(!toast.isActive('login-toast')) {
        toast({
          id: 'login-toast',
          title: 'ログインしました',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        sessionStorage.setItem('login-toast', 'true')
      }
    }
  }, [user, router, toast, pathname])

  if(user === undefined || user === null) {
    return null
  }
  
  return <>{children}</>
}
