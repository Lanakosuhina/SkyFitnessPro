'use client'
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import loadingGif from '../assets/gogi-running.gif'
import Image from 'next/image';

export default function withPrivateRoute(Component: any) {
  return (props: any) => {
    const Router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      });
    }, []);

    if (loading) {
      return <div className="block ml-[auto] mr-[auto] lg:w-[300px] lg:h-[300px] w-[150px] h-[150px]">
        <Image src={loadingGif} alt="wait until the page loads" width={300} height={300} />
      </div>
    }

    if (!isAuthenticated) {
      Router.replace('/signin');
      return null;
    }

    return <Component {...props} />;
  };
};