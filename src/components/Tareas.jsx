import PropTypes from 'prop-types';// Importa PropTypes para definir el tipo de las propiedades
import Swal from 'sweetalert2';// Importa SweetAlert2 para mostrar ventanas emergentes de confirmación y alerta
import { MdDelete, MdEdit, MdDone } from 'react-icons/md';// Importa íconos de react-icons para los botones de eliminar, editar y marcar como realizada

import './Tareas.css';// Importa estilos CSS específicos para el componente Tarea

// Componente funcional Tarea que representa una tarea en la lista
const Tarea = ({ tarea, eliminarTarea, marcarComoRealizada, editarTarea }) => {
  // Función para mostrar la confirmación antes de eliminar la tarea
  const mostrarConfirmacionEliminar = () => {
    // Verifica si la tarea está marcada como realizada
    if (tarea.realizada) {
      // Muestra una ventana emergente de confirmación para eliminar la tarea
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        // Si el usuario confirma, ejecuta la función de eliminarTarea y muestra un mensaje de éxito
        if (result.isConfirmed) {
          eliminarTarea(tarea.id);
          Swal.fire('¡Eliminado!', 'Tu tarea ha sido eliminada.', 'success');
        }
      });
    } else {
      // Si la tarea no está marcada como realizada, muestra una alerta indicando que no se puede eliminar
      Swal.fire({
        title: 'Alerta',
        text: 'La tarea debe estar marcada como realizada para poder eliminarla.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
      });
    }
  };

  // Función para mostrar la confirmación antes de editar la tarea
  const mostrarConfirmacionEditar = () => {
    // Muestra una ventana emergente de confirmación para editar la tarea
    Swal.fire({
      title: '¿Estás por editar esta tarea?',
      text: 'Se abrirá el formulario de edición.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      // Si el usuario confirma, ejecuta la función de editarTarea
      if (result.isConfirmed) {
        editarTarea(tarea.id);
      }
    });
  };

  // Renderiza el componente Tarea
  return (
    <>
      {/* Elemento de lista que representa la tarea, con la clase 'realizada' si la tarea está marcada como realizada */}
      <li key={tarea.id} className={tarea.realizada ? 'realizada' : ''}>
        <span>{tarea.texto}</span>
      </li>
      
      {/* Contenedor de botones para marcar como realizada, editar y eliminar */}
      <div>
        {/* Botón para marcar la tarea como realizada */}
        <button onClick={() => marcarComoRealizada(tarea.id)} style={{ borderRadius: '50%' }}>
          <MdDone style={{ color: 'white' }} />
        </button>
        
        {/* Botón para mostrar la confirmación antes de editar la tarea */}
        <button onClick={mostrarConfirmacionEditar} style={{ borderRadius: '50%' }}>
          <MdEdit style={{ color: 'blue' }} />
        </button>
        
        {/* Botón para mostrar la confirmación antes de eliminar la tarea */}
        <button onClick={mostrarConfirmacionEliminar} style={{ borderRadius: '50%' }}>
          <MdDelete style={{ color: 'red' }} />
        </button>
      </div>
    </>
  );
};

// Define las propTypes para las props del componente Tarea
Tarea.propTypes = {
  tarea: PropTypes.shape({
    id: PropTypes.string.isRequired,
    texto: PropTypes.string.isRequired,
    realizada: PropTypes.bool,
  }).isRequired,
  eliminarTarea: PropTypes.func.isRequired,
  marcarComoRealizada: PropTypes.func.isRequired,
  editarTarea: PropTypes.func.isRequired,
};

export default Tarea;
