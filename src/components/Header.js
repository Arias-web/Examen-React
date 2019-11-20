import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <Link to="/tareas" className="navbar-brand">
                Examen - React    
            </Link>

            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink
                        to="/tareas"
                        className="nav-link"
                        activeClassName="active"
                    >Tareas</NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/nueva-tarea"
                        className="nav-link"
                        activeClassName="active"
                    >Nuevas Tareas</NavLink>
                </li>

            </ul>
        </div>
    </nav>
);

export default Header;