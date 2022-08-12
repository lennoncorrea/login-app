import './App.css';
import 'reflect-metadata'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/login';
import HomePage from './pages/home';
import { container } from 'tsyringe';
import { HttpService } from './services/http-service/http-service';

container.register("IHttpService", { useClass: HttpService });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage httpService={container.resolve("IHttpService")} />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
