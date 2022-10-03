import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "../Header/Header";
import ContinentsPage from "../../pages/ContinentsPage/ContinentsPage";
import ValidationPage from "../../pages/ValidationPage/ValidationPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/continents" />} />
        <Route exact path="/continents" element={<ContinentsPage />} />
        <Route exact path="/validation" element={<ValidationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
