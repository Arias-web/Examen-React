import React, {Fragment} from 'react'
import TareaLista from './TareaLista';

function Tareas ({tareas, guardarRecargarTareas}) {

    return(
        <Fragment>
             <h1 className="text-center">Tareas</h1>
             <ul className="list-group mt-5"></ul>
             {tareas.map(tarea =>(
                 <TareaLista
                    key={tarea.id}
                    tarea={tarea}
                    guardarRecargarTareas={guardarRecargarTareas}
                 />

             ))}
        </Fragment>
       
    );
}

export default Tareas;