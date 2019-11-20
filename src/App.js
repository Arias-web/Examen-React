import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import Tareas from './components/Tareas';
import NuevaTarea from './components/NuevaTarea';
import EditarTarea from './components/EditarTarea';
import Tarea from './components/Tarea';

import Header from './components/Header';


function App() {


  const [tareas, guardarTareas] = useState([]);
  const [recargarTareas, guardarRecargarTareas] = useState(true);

  useEffect(() => {
    
      if(recargarTareas) {
        const consultarApi = async() => {
        // consultar la api de json-server
        const resultado = await axios.get('http://localhost:4000/pm');
  
        //console.log(resultado.data);
        // colocamos en el estate de "guardarProductos"
        guardarTareas(resultado.data);
      }

      consultarApi();
    }
   

    //cambiar a false la recarga de los productos
    guardarRecargarTareas(false);

  }, [recargarTareas])

  return (
    <Router>
      <Header />
      <main className="container mt-5">
      <Switch>
          <Route exact path="/tareas" 
                 render={() => (
                    <Tareas
                      tareas={tareas}
                      guardarRecargarTareas={guardarRecargarTareas}
                    />
                 ) } />
          <Route exact path="/nueva-tarea" 
            render={() => (
                <NuevaTarea
                guardarRecargarTareas={guardarRecargarTareas}
                />
            )}
          />
          <Route exact path="/tarea/:id" component={Tarea} />
          <Route exact path="/tareas/editar/:id" 
                  render={props => {
                    // tomar el id del producto
                    const idTarea = parseInt(props.match.params.id);

                    //el producto que se le pasa al state
                    const tarea = tareas.filter(tarea => tarea.id === idTarea);

                    return (
                      <EditarTarea
                      tarea = {tarea[0]}
                      guardarRecargarTareas={guardarRecargarTareas}
                      />
                    )
                    
                  }} />
      </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  );
}

export default App;
