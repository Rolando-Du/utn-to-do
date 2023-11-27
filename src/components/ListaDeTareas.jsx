import { useState } from 'react';
import Tareas from './Tareas'; // Importa el componente Tareas
import TareaFormulario from './TareaFormulario'; // Importa el componente TareaFormulario
import { MdDelete, MdEdit, MdDone } from 'react-icons/md'; // Importa los íconos de react-icons
import { v4 as uuidv4 } from 'uuid'; // Importa la función uuidv4 para generar identificadores únicos

import './ListaDeTareas.css'; // Importa los estilos CSS para el componente ListaDeTareas

// Componente funcional ListaDeTareas
const ListaDeTareas = () => {
  // Define el estado local para las tareas y la tarea actual
  const [tareas, setTareas] = useState([]);
  const [tareaActual, setTareaActual] = useState({ id: null, texto: '' });

  // Función para agregar una nueva tarea
  const agregarTarea = (texto) => {
    // Verifica si el texto está vacío y retorna si es así
    if (texto.trim() === '') return;

    // Crea una nueva tarea con un identificador único y el texto proporcionado
    const nuevaTarea = { id: uuidv4(), texto };
    // Actualiza el estado de las tareas con la nueva tarea
    setTareas([...tareas, nuevaTarea]);
  };

  // Función para actualizar una tarea existente
  const actualizarTarea = (id, texto) => {
    // Crea un nuevo arreglo de tareas con la tarea actualizada
    const nuevasTareas = tareas.map((t) =>
      t.id === id ? { ...t, texto } : t
    );
    // Actualiza el estado de las tareas y la tarea actual
    setTareas(nuevasTareas);
    setTareaActual({ id: null, texto: '' });
  };

  // Función para eliminar una tarea
  const eliminarTarea = (id) => {
    // Filtra las tareas y crea un nuevo arreglo sin la tarea con el identificador proporcionado
    const nuevasTareas = tareas.filter((t) => t.id !== id);
    // Actualiza el estado de las tareas
    setTareas(nuevasTareas);
  };

  // Función para marcar/desmarcar una tarea como realizada
  const marcarComoRealizada = (id) => {
    // Crea un nuevo arreglo de tareas con la tarea actualizada
    const nuevasTareas = tareas.map((t) =>
      t.id === id ? { ...t, realizada: !t.realizada } : t
    );
    // Actualiza el estado de las tareas
    setTareas(nuevasTareas);
  };

  // Función para editar una tarea
  const editarTarea = (id) => {
    // Encuentra la tarea con el identificador proporcionado
    const tarea = tareas.find((t) => t.id === id);
    // Actualiza el estado de la tarea actual con la tarea encontrada
    setTareaActual({ id: tarea.id, texto: tarea.texto });
  };

  // Renderiza el componente
  return (
    <div>
      {/* Renderiza el componente TareaFormulario */}
      <TareaFormulario
        agregarTarea={agregarTarea}
        tareaActual={tareaActual}
        actualizarTarea={actualizarTarea}
      />
      {/* Renderiza la lista de tareas */}
      <ul>
        {tareas.map((tarea) => (
          <Tareas
            key={tarea.id}
            tarea={tarea}
            eliminarTarea={eliminarTarea}
            marcarComoRealizada={marcarComoRealizada}
            editarTarea={editarTarea}
          />
        ))}
      </ul>
      {/* Utilizando los iconos (actualmente ocultos) */}
      <MdDelete style={{ display: 'none' }} />
      <MdEdit style={{ display: 'none' }} />
      <MdDone style={{ display: 'none' }} />
    </div>
  );
};

export default ListaDeTareas;
