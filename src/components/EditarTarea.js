import React, { useState, useRef } from 'react'
import Error from './Error';

import axios from 'axios';
import Swal from 'sweetalert2';

import { withRouter } from 'react-router-dom';



function EditarTarea({ tarea, history, guardarRecargarTareas }) {


    // generar los ref
    const nombreProyectoRef = useRef('');
    const nombreApellidoRef = useRef('');
    //const fechaYhoraRef = useRef('');


    const [error, guardarError] = useState(false);
    const [tipo, guardarTipoTarea] = useState('');


    const editarTarea = async e => {
        e.preventDefault();

        // validacion
        const nuevoNombreApellido = nombreApellidoRef.current.value,
            nuevoNombreProyecto = nombreProyectoRef.current.value;
            //nuevaFechaYhora = fechaYhoraRef.current.value;

        //if (nuevoNombreApellido === '' || nuevoNombreProyecto === '' || nuevaFechaYhora === '' || tipo === '') {
        if (nuevoNombreApellido === '' || nuevoNombreProyecto === '' || tipo === '') {

            guardarError(true);
            return;
        }

        guardarError(false);

        //revisar si cambio  la categoria, delo contrario asignar el mismo  valor
        let tipoTarea = (tipo === '') ? tarea.tipo : tipo;
        console.log(tipoTarea);


        // editamos el producto
        const editarTarea = {
                nombreApellido: nuevoNombreApellido,
                nombreProyecto: nuevoNombreProyecto,
                //fechaYhora: nuevaFechaYhora,
                tipo: tipoTarea

            }
            //enviamos el Request
        const url = `http://localhost:4000/pm/${tarea.id}`;

        try {
            const resultado = await axios.put(url, editarTarea);

            // console.log(resultado);
            if (resultado.status === 200) {
                Swal.fire(
                    'Tarea editada',
                    'La Tarea se edito correctamente',
                    'success'
                )
            }

        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Hubo un error, vuelve a intentarlo'
            })

        }

        // redirigir al usuario y consultar la api
        guardarRecargarTareas(true);
        history.push('/tareas');

    }

    // metodo para el button-radio
    const leerValorRadio = e => {
        guardarTipoTarea(e.target.value);
    }

    return(
        <div className="col-md-8 mx-auto ">
        <h1 className="text-center">Editar Tarea</h1>
        {/* injectamos como ternario el componente del error */}
        {(error) ? <Error mensaje='Todos los campos son obligatorios' /> : null }
        <form
            onSubmit={editarTarea}
            className="mt-5"
        >
            <div className="form-group">
                <label>Nombre y Apellido</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="nombre" 
                    placeholder="Nombre Apellido"
                    ref={nombreApellidoRef}
                    defaultValue={tarea.nombreApellido}
                    
                />
            </div>

            <div className="form-group">
                <label>Nombre Poyecto</label>
                <input 
                    type="text" 
                    className="form-control" 
                    name="proyecto"
                    placeholder="Nombre Proyecto"
                    ref={nombreProyectoRef}
                    defaultValue={tarea.nombreProyecto}
                    
                />
            </div>
            
            <div className="form-group">
                <label>Fecha y Hora</label>
                <input 
               //     type="date" 
                 //   className="form-control" 
                 //   name="Fecha y Hora"
                  //  placeholder="Fecha y Hora"
                  //  ref={fechaYhoraRef}
                   // defaultValue={tarea.fechaYhora}
                    
                />
            </div>

            <legend className="text-center">Tipo:</legend>
            <div className="text-center">
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="Desarrollo"
                    onChange={leerValorRadio}
                    defaultChecked={(tarea.tipo === 'Desarrollo')}
                />
                <label className="form-check-label">
                Desarrollo
                </label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="Testing"
                    onChange={leerValorRadio}
                    defaultChecked={(tarea.tipo === 'Testing')}
                />
                <label className="form-check-label">
                Testing
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="Analisis Funcional"
                    onChange={leerValorRadio}
                    defaultChecked={(tarea.tipo === 'Analisis Funcional')}
                />
                <label className="form-check-label">
                Analisis Funcional
                </label>
            </div>

            <div className="form-check form-check-inline">
                <input 
                    className="form-check-input" 
                    type="radio" 
                    name="categoria"
                    value="Estetica"
                    onChange={leerValorRadio}
                    defaultChecked={(tarea.tipo === 'Estetica')}
                />
                <label className="form-check-label">
                Estetica
                </label>
            </div>
            </div>

            <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Guardar Cambios" />
        </form>
    </div>
    );
}

export default withRouter(EditarTarea) ;