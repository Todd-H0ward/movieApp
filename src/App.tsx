import { Outlet } from 'react-router';

const App = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default App;
