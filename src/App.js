import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [numeroPaginas, setNumeroPaginas] = useState(1);

  useEffect(() => {
    if (!busqueda) return;

    const buscarAPI = async () => {
      const imagenesPorPagina = 30;
      const apiKey = "15892069-cc6ef7155a8970eb64f3e719b";
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);
      // Calcular el numero de paginas
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      setNumeroPaginas(calcularTotalPaginas);
      // Al hacer un llamado, ver la pantalla en el inicio
      const jumbotron =  document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'});
    };

    buscarAPI();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if (nuevaPaginaActual === 0) return null;
    setPaginaActual(nuevaPaginaActual);
  };

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    if (nuevaPaginaActual > numeroPaginas) return null;
    setPaginaActual(nuevaPaginaActual);
  };
  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario setBusqueda={setBusqueda} />
      </div>
      <div className="">
        <ListadoImagenes imagenes={imagenes} />
        {paginaActual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo;Anterior
          </button>
        )}
        {paginaActual === numeroPaginas ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaSiguiente}
          >
            Siguiente&raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
