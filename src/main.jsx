import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from './authConfig'
import App from './App'; 
import './index.css'; 

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MsalProvider instance={new PublicClientApplication(msalConfig)}>
      <BrowserRouter>
            <App />
      </BrowserRouter>
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