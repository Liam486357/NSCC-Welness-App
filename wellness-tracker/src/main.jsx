import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { MsalProvider, useMsal } from '@azure/msal-react'

ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MsalProvider instance={new PublicClientApplication(msalConfig)}>
      <App />
    </MsalProvider>
  </StrictMode>,
)

const { instance, accounts } = useMsal();
const handleLogin = () => {
  instance.loginRedirect(msalRequest).catch(e => { //loginPopup works as well
    console.log(e);
  });
};
const handelLogout = () => {
  instance.logoutRedirect().catch(e => { // logoutPopup works as well
    console.log(e);
  });
};