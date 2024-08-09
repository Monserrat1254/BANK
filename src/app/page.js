"use client";

import { useState, useEffect, useReducer, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import Table from "./components/Table";
import SearchInput from "./components/SearchInput";
import "./global.styles.css";

const initialState = {
  data: [],
  filteredData: [],
  searchQuery: "",
  originalData: [],
  timestamp: null,
  showReload: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
        filteredData: action.payload,
        originalData: action.payload,
        timestamp: moment().format("DD/MMM/YYYY HH:mm"),
        showReload: false,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
        filteredData: state.originalData.filter((item) =>
          item.bankName.toLowerCase().includes(action.payload.toLowerCase())
        ),
        showReload: state.originalData.length > state.filteredData.length,
      };
    case "DELETE_ITEM":
      const newFilteredData = state.filteredData.filter(
        (_, index) => index !== action.payload
      );
      return {
        ...state,
        filteredData: newFilteredData,
        data: newFilteredData,
        showReload: true,
      };
    case "RELOAD_DATA":
      return {
        ...state,
        filteredData: state.originalData,
        data: state.originalData,
        showReload: false,
        timestamp: moment().format("DD/MMM/YYYY HH:mm"),
      };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/api/challenge/banks");
      const result = response.data;
      localStorage.setItem("data", JSON.stringify(result));
      dispatch({ type: "SET_DATA", payload: result });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: e.target.value });
  };

  const handleDelete = (index) => {
    dispatch({ type: "DELETE_ITEM", payload: index });
  };

  const handleReload = () => {
    dispatch({ type: "RELOAD_DATA" });
  };

  return (
    <div className="container">
      <h1>Lista de Bancos</h1>
      <div className="search-and-reload">
        <SearchInput value={state.searchQuery} onChange={handleSearch} />
        {state.showReload && (
          <button className="reload-button" onClick={handleReload}>
            Restaurar Datos
          </button>
        )}
      </div>
      <div className="table-wrapper">
        <Table
          data={state.filteredData}
          onDelete={handleDelete}
          timestamp={state.timestamp}
        />
      </div>
    </div>
  );
};

export default Home;
