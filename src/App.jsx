import logoUTN from './imagenes/utn.png'; // Importa el logo de UTN
import ListaDeTareas from './components/ListaDeTareas'; // Importa el componente ListaDeTareas
import './App.css'; // Importa los estilos CSS para el componente App

// Componente funcional App
const App = () => {
  // Renderiza la aplicación
  return (
    <div className="App">
      {/* Contenedor del logo de UTN */}
      <div className='contenedor-logo'>
        {/* Muestra el logo de UTN */}
        <img src={logoUTN} className='logo' alt="Logo UTN" />
      </div>
      {/* Encabezado principal */}
      <h1>Lista de Tareas</h1>
      {/* Renderiza el componente ListaDeTareas */}
      <ListaDeTareas />
    </div>
  );
};

export default App;
