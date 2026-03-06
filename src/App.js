import './App.css'; // App.js에 스타일 적용
import AppRouter from './router/Router';
import Sidebar from "./components/Sidebar/Sidebar";
import './components/Sidebar/Sidebar.css';
import { ToastProvider } from "./context/ToastContext";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation(); 

  return (
      <ToastProvider>
        <div className="app">
          <Sidebar />
          <div className="content">
            <AppRouter />
          </div>
        </div>
      </ToastProvider>
  );
}

export default App;