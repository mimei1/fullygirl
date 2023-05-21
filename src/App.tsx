import { useAtomValue } from 'jotai'
import dayjs from 'dayjs'
import './App.css';
import Desktop from './components/os/Desktop';
import LoginScreen from './components/login-screen';
import { hasLoggedAtom } from './state';

function App() {
    const hasLogged = useAtomValue(hasLoggedAtom)
    const expired = dayjs(hasLogged.exp).isBefore(dayjs())

    return (
        <div className="App">
            {!expired && hasLogged.value
                ? <Desktop />
                : <LoginScreen />
            }
        </div>
    );
}

export default App;
