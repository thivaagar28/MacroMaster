import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { DefaultLayout } from './components/views/layouts/DefaultLayout';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { PublicRoute } from './components/Auth/PublicRoute';
import { AuthRoute } from './components/Auth/AuthRoute';
import { AuthConsumer, AuthProvider} from './context/JWTAuthContext'
import { Flex, Spinner } from '@chakra-ui/react';
import { AccountSettings } from './components/User/AccountSettings';
import { HomePage } from './components/Home/HomePage';
import { StatView } from './components/StatView/StatView.jsx'


function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthConsumer>
            {(auth) => !auth.isInitialized ? ( /* It will auto run the jwt auth context script */
              <DefaultLayout>
                <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
                <Spinner thickness='4px' speed='0.65s' emptyColor='green.200' color='green.500' size={'xl'}></Spinner>
                </Flex>
              </DefaultLayout>
            ) : (
              <DefaultLayout>
                <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path='*' element={<Navigate to={'/'}/>} />
                <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
                <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
                <Route path='/account_settings' element={<AuthRoute><AccountSettings/></AuthRoute>}/>
                <Route path='/stat_view' element={<AuthRoute><StatView/></AuthRoute>}/>
              </Routes>
              </DefaultLayout>
            )}
          </AuthConsumer>
      </Router>
    </AuthProvider>
  );
}

export default App;
