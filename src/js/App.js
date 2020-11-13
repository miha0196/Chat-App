import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StoreProvider from './store/StoreProvider';

import { listenToAuthChanges } from './actions/auth';
import { listenToConnectionChanges } from './actions/app';
import { checkUserConnection } from './actions/connection';
import { loadInitialettings } from './actions/settings';

import HomeView from './views/Home';
import WelcomeView from './views/Welcome';
import SettingsView from './views/Settings';
import ChatView from './views/Chat';
import ChatCreate from './views/ChatCreate';
import LoadingView from './components/shared/LoadingView';

function AuthRoute({children, ...rest}) {  
  const user = useSelector(({auth}) => auth.user)
  const onlyChild = React.Children.only(children)

  return (
    <Route 
      {...rest}
      render={props => 
        user 
          ? React.cloneElement(onlyChild, {...rest, ...props})
          : <Redirect to='/'/>
      }
    />
  )
}

const ContentWrapper = ({children}) => {
  const isDarkTheme = useSelector(({settings}) => settings.isDarkTheme)
  return (
    <div className={`content-wrapper ${isDarkTheme ? 'dark' : 'light'}`}>{children}</div>
  )
}
    
function ChatApp() {
  const dispatch = useDispatch()
  const isChecking = useSelector(({auth}) => auth.isChecking)
  const isOnline = useSelector(({app}) => app.isOnline)
  const user = useSelector(({auth}) => auth.user)

  useEffect(() => {
    dispatch(loadInitialettings())
    const unsubFromAuth = dispatch(listenToAuthChanges()) 
    const unsubFromConnection = dispatch(listenToConnectionChanges())

    return () => {
      unsubFromAuth();
      unsubFromConnection()
    }
  }, [dispatch])

  useEffect(() => {
    let unsubFromUserConnection
    if (user?.uid) {
      unsubFromUserConnection = dispatch(checkUserConnection(user.uid));
    }

    return () => {
      unsubFromUserConnection && unsubFromUserConnection();
    }
  }, [dispatch, user])

  if (isChecking) {
    return <LoadingView />
  }

  if (!isOnline) {
    return <LoadingView message="Application has been disconnected from the internet. Please, reconnect..."/>
  }

  return (
    <Router>
      <ContentWrapper>
        <Switch>
          <AuthRoute path='/home'>
            <HomeView/>
          </AuthRoute>
          <AuthRoute path='/chatCreate'>
            <ChatCreate/>
          </AuthRoute>
          <AuthRoute path='/settings'>
            <SettingsView />
          </AuthRoute>
          <Route path='/' exact>
            <WelcomeView />
          </Route>
          <AuthRoute path='/chat/:id'>
            <ChatView />
          </AuthRoute>
        </Switch>
      </ContentWrapper>
    </Router>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <ChatApp />
    </StoreProvider>
  )
}

 