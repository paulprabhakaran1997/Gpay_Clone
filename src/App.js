import logo from './logo.svg';
import './App.css';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './redux/reducers/userReducer';
import axios from 'axios';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Transaction from './components/Transaction';

function App() {

  const baseURL = useMemo(() => "http://localhost:3500" ,[]);

  const { users } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch()

  console.log("User Data=  " , users)

  useEffect(() =>{
    const fetchUserData = async() =>{
      try{
        const response = await axios.get(`${baseURL}/user`);
        if(response) { dispatch(addUser(response.data)) }
      }
      catch(err){
        console.log(err.message)
      }
    }
    fetchUserData()
  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='transaction/' element={<Transaction />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
