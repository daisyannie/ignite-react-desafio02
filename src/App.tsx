import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { GlobalContextProvider } from './contexts/GlobalContext';

export function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <GlobalContextProvider>
        <SideBar />
        <Content />
      </GlobalContextProvider>
    </div>
  )
}