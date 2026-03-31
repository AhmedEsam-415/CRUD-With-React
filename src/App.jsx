import './app.css';
import { Navbar } from './components/Navbar';
import { SideBar } from './components/SideBar';

// Router
import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <Navbar />
      <div className="row">
        <div className="col-2 sidebar">
          <SideBar />
        </div>
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
