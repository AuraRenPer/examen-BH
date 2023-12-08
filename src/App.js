import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListProduct from './components/ProductsList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import './App.css';
function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<ListProduct />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;