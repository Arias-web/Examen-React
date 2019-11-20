import React from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function TareaLista({tarea, guardarRecargarTareas}) {

    const eliminarTarea =  id => {
        console.log('eliminando', id);
        //TODO: Eliminar los registros
        Swal.fire({
            title: 'Estas seguro?',
            text: "Una Tarea eliminado no se podrá recuperar ",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText:'cancelar'
          }).then( async (result) => {
            if (result.value) {
                 try {

                    const url = `http://localhost:4000/pm/${id}`;

                    const resultado = await axios.delete(url);
    
                    //console.log(resultado);
                    if(resultado.status === 200 ){
    
                    Swal.fire(
                        'Eliminado!',
                        'La Tarea se ha eliminado',
                        'success'
                      )
                    }
                    //consultar la api
                    guardarRecargarTareas(true)
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title:'Oops...',
                        text: 'Hubo un error, vuelve a intentarlo'
                    })
                         
                }
            }
          })
        
    }
    return(
        <li data-tipo={tarea.tipo} className="list-group-item d-flex justify-content-between align-items-center">
            <p>
                <span className="font-weight-bold">{tarea.nombreProyecto}</span>
            </p>
            <p>
                <span className="font-weight-bold">{tarea.nombreApellido}</span>
            </p>
            <p>
                <span className="font-weight-bold">{tarea.tipo}</span>
            </p>
            <div>
                <Link
                  to={`/tareas/editar/${tarea.id}`}
                  className="btn btn-success mr-2"
                >Editar</Link>

                <button 
                  type="button"
                  className="btn btn-danger"
                  onClick={() => eliminarTarea(tarea.id)}
                >
                Eliminar &times;
                </button>
            </div>
        </li>
    );
}

export default TareaLista;