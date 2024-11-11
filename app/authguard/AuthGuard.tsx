'use client'

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAuthContext } from '../context/AuthContext';

type Props = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  useEffect(() => {
    const handleRedirect = async () => {
      if (user === null) {
        // ログアウト時の処理とリダイレクト
        if (!sessionStorage.getItem('logoutToastShown')) {
          toast({
            id: 'logout-toast',
            title: 'ログアウトしました',
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
          sessionStorage.setItem('logoutToastShown', 'true');
          sessionStorage.removeItem('loginToastShown');
        }
        setTimeout(() => {
          router.replace('/signin');  // replaceを使用してブラウザ履歴に残さない
        }, 0);
      } 
      // ログイン時のトースト表示処理
      else if (user && !sessionStorage.getItem('loginToastShown')) {
        toast({
          id: 'login-toast',
          title: 'ログインしました',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        sessionStorage.setItem('loginToastShown', 'true');
        sessionStorage.removeItem('logoutToastShown');

        setTimeout(() => {
          router.replace('/profile');
        }, 0);
      }
    };


    handleRedirect();
  }, [user, router, toast, pathname]);

  if (user === undefined) {
    return null;
  }

  return <>{children}</>;
};
