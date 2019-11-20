import React,{useState} from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';

import { withRouter } from 'react-router-dom';


function NuevaTarea ({history,guardarRecargarTareas}) {

    //state
    const [nombreApellido, guardarNombreApellido] = useState('');
    const [nombreProyecto, guardarNombreProyecto] = useState('');
    const [fechaYhora, guardarfechaYhora] = useState('');
    const [tipo, guardarTipoTarea] = useState('');
    const [error, guardarError] = useState(true);

    // metodo para el button-radio
    const leerValorRadio =  e => {
        guardarTipoTarea(e.target.value);
    }

    // agregar tarea
    const nuevaTarea = async e => {
        e.preventDefault();

        if(nombreApellido === '' || nombreProyecto === '' || fechaYhora === '' || tipo === '') {
            guardarError(true);
            return;
        }
        guardarError(false);

        // crear nuevo tarea POST

        try {
            const resultado = await axios.post('http://localhost:4000/pm', {
                nombreApellido,
                nombreProyecto,
                fechaYhora,
                tipo
            })
            console.log(resultado);
            if(resultado.status === 201){
                Swal.fire(
                    'La tarea fue creado',
                    'La tarea se creo correctamente',
                    'success'
                )
            }
            
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title:'Oops...',
                text: 'Hubo un error, vuelve a intentarlo'
            })
            
        }

        //redirigir tarea
        guardarRecargarTareas(true);
        history.push('/tareas');
    }

    return(
        <div className="col-md-8 mx-auto ">
        <h1 className="text-center">Agregar Nueva Tarea</h1>
        {/* injectamos como ternario el componente del error */}
        {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null }
        <form
            onSubmit={nuevaTarea}
            className="mt-5"
        >
            <div className="form-group">
                <label>Nombre y Apellido del desarrolador</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    placeholder="Nombre Apellido"
                    onChange={e => guardarNombreApellido(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Nombre de Proyecto</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="Proyecto"
                    placeholder="Nombre Proyecto"
                    onChange={e => guardarNombreProyecto(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Fecha y Hora</label>
                <input 
                    type="date" 
                    className="form-control" 
                    name="Fecha y Hora"
                    placeholder="Fecha y Hora"
                    onChange={e => guardarfechaYhora(e.target.value)}
                />
            </div>

            <legend className="text-center">Tipo de Tarea:</legend>
            <div className="text-center">
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="tipo"
                    value="Desarrollo"
                    onChange={leerValorRadio}
                />
                <label className="form-check-label">
                    Desarrollo
                </label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="tipo"
                    value="Testing"
                    onChange={leerValorRadio}
                />
                <label className="form-check-label">
                    Testing
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="tipo"
                    value="Analisis Funcional"
                    onChange={leerValorRadio}
                />
                <label className="form-check-label">
                    Analisis Funcional
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="tipo"
                    value="Estetica"
                    onChange={leerValorRadio}
                />
                <label className="form-check-label">
                    Estetica
                </label>
            </div>
            </div>

            <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Tarea" />
        </form>
    </div>
    );
}

export default withRouter(NuevaTarea);