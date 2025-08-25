import { Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoutes, privateRoutes } from "./config/routesConfig";

function App() {
  const allRoutes = [...publicRoutes, ...privateRoutes];

  return (
    <Routes>
      {allRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
