import React, { useState, useMemo } from "react";

const Table = ({ data, onDelete, timestamp }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="table-wrapper">
      <table className="table-container">
        <thead>
          <tr>
            <th onClick={() => requestSort("bankName")}>Nombre del Banco</th>
            <th onClick={() => requestSort("description")}>Descripción</th>
            <th onClick={() => requestSort("age")}>Edad</th>
            <th>Imagen</th>
            <th>Fecha y Hora de Carga</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <tr key={index}>
                <td>{item.bankName}</td>
                <td>{item.description}</td>
                <td>{item.age}</td>
                <td>
                  <img
                    src={item.url}
                    alt={item.bankName}
                    className="table-image" // Clase para aplicar estilos
                  />
                </td>
                <td>{timestamp}</td>
                <td>
                  <button onClick={() => onDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
