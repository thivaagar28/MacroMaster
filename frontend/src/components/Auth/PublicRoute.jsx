import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom';

export const PublicRoute = (props) => {
  const {children} = props;
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerified, setIsverified] = useState(false);

  useEffect(() => {
      if (auth?.isAuthenticated){
          navigate('/', {replace: true, state: {from: location}})
      } else{
        setIsverified(true);
      }
  }, [auth.isAuthenticated, location, navigate])

  if(!isVerified) return null; // to prevent auth users from having glimpse of the public content 
  else return <>{children}</>
}
