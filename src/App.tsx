import Home from './pages/Home';
import { AppProvider } from './providers/app';

function App() {
    return (
        <AppProvider>
            <Home />
        </AppProvider>
    );
}

export default App;
