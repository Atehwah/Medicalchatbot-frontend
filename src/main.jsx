import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
// Amplify.configure(amplifyconfig);
// Amplify.configure({
//   ...Amplify.getConfig(),
//   Interactions: {
//     LexV2: {
//       'MedicalChatbot': {
//         aliasId: 'TSTALIASID',
//         botId: 'JHEMNRFAXS',
//         localeId: 'en_US',y
// });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)



