import { useState, useEffect } from 'react'; // Importa useState y useEffect de React
import PropTypes from 'prop-types'; // Importa PropTypes desde la librería prop-types
import './TareaFormulario.css'; // Importa los estilos CSS para el componente TareaFormulario

// Componente funcional TareaFormulario
const TareaFormulario = ({ agregarTarea, tareaActual, actualizarTarea }) => {
  // Define el estado local para el texto de la tarea
  const [texto, setTexto] = useState('');

  // Efecto secundario para actualizar el texto cuando cambia la tarea actual
  useEffect(() => {
    // Verifica si la tarea actual tiene un identificador y establece el texto correspondiente
    if (tareaActual.id !== null) {
      setTexto(tareaActual.texto);
    } else {
      setTexto('');
    }
  }, [tareaActual]);

  // Función para manejar el envío del formulario
  const manejarSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Verifica si la tarea actual tiene un identificador
    if (tareaActual.id !== null) {
      // Actualiza la tarea existente con el nuevo texto
      actualizarTarea(tareaActual.id, texto);
    } else {
      // Agrega una nueva tarea con el texto proporcionado
      agregarTarea(texto);
    }

    // Reinicia el estado del texto a una cadena vacía
    setTexto('');
  };

  // Renderiza el componente
  return (
    <form onSubmit={manejarSubmit} className="formulario-container">
      {/* Input para ingresar el texto de la tarea */}
      <input 
        type="text"
        placeholder="Agregar tarea"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className={`input-tarea ${tareaActual.realizada ? 'realizada' : ''}`}
      />
      {/* Botón para enviar el formulario */}
      <button type="submit" className="btn-submit">
        {tareaActual.id !== null ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};

// Define las propTypes para el componente TareaFormulario
TareaFormulario.propTypes = {
  agregarTarea: PropTypes.func.isRequired,
  tareaActual: PropTypes.shape({
    id: PropTypes.string,
    texto: PropTypes.string,
    realizada: PropTypes.bool, 
  }).isRequired,
  actualizarTarea: PropTypes.func.isRequired,
};

export default TareaFormulario;
