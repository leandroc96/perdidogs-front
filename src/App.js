import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [adopciones, setAdopciones] = useState([]);
  const [loading, setLoading]= useState(false);

  useEffect(()=>{
    try{
      setLoading(true);
    fetch("http://localhost:8080/v1/adopciones/").then(response=>response.json())
    .then(data=>{
      console.log("Data received:", data);
      console.log("Tipo de adopciones:", typeof adopciones);
      const adopcionesArray = Array.isArray(data) ? data : [data];
        setAdopciones(adopcionesArray);
        setLoading(false);
     
    })
  }catch(error){
    console.error("Errror al conectarse con el BE ", error);
  }finally{
    setLoading(false);
  }
  }, []);

  if(loading){
    return <p>Loading</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <div className='App-intro'>
          <h2>Lista de mascotas para adoptar</h2>
        {loading ? (
          <p>Loading</p>
        ) : (
          adopciones.map(adopcion => (
            <div key={adopcion.id}>{adopcion.descripcion}</div>
          ))
        )}
          </div>
      </header>
    </div>
  );
}

export default App;
