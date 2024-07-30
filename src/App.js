import './App.css';
import CurrencyConvertor from './Components/CurrencyConvertor';

function App() {
  return (
     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center"> 
        <div className="container">
          <CurrencyConvertor />          
        </div>
     </div>
  );
}

export default App;
