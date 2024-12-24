import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/Home";
import CameraList from "./pages/CameraList";
import ClientList from './pages/ClientList';
import RentalList from './pages/RentalList';
import RentalCreate from './components/RentalCreate';
import MovieCreate from "./components/MovieCreate";
import MovieList from "./pages/MovieList";

const App = () => {
  return (
    <Router>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/cameras" element={<CameraList />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/rentals" element={<RentalList />} />
            <Route path="/rentals/create" element={<RentalCreate />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/create" element={<MovieCreate />} />
          {/* Aquí añadiremos las demás rutas más adelante */}
        </Routes>
      </BaseLayout>
    </Router>
  );
};

export default App;
