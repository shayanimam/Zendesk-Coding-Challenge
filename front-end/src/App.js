import "./App.css";
import React, { useState, useEffect } from "react";
import { Ticket } from "./components/Ticket.js";
import ReactPaginate from "react-paginate";

function App() {
  const [items, setItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    return fetch("http://localhost:8000/")
      .then((response) => response.json())
      .catch((err) => setError(err));
  };

  const fetchPage = async (pageNumber) => {
    return fetch(`http://localhost:8000/page/${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          throw error;
        }
        setItems(data.tickets);
      });
  };

  useEffect(() => {
    try {
      fetchTickets().then((data) => {
        if (data.error) {
          setError(data.error);
          throw error;
        }
        setLoading(false);
        setItems(data.tickets);
        setItemCount(data.count);
      });
    } catch (error) {}

    return () => {
      setItems([]);
      setLoading(true);
      setItemCount(0);
    };
  }, []);

  const showTickets = items.map((ticket) => (
    <Ticket
      id={ticket.id}
      key={ticket.id}
      subject={ticket.subject}
      description={ticket.description}
      status={ticket.status}
      created_at={ticket.created_at}
    />
  ));

  const handlePageChange = ({ selected }) => {
    try {
      fetchPage(selected + 1);
    } catch (error) {
      alert(error);
    }
  };

  const Error = () => {
    return <h3>{error}</h3>;
  };

  const Load = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <div className="App">
      {error !== null ? (
        <Error />
      ) : loading ? (
        <Load />
      ) : (
        <div>
          <h1 className="title">Zendesk Ticket Viewer</h1>
          <div className="ticket-list">{showTickets}</div>
          <ReactPaginate
            previousLabel="prev"
            nextLabel="next"
            pageCount={Math.ceil(itemCount / 25)}
            onPageChange={handlePageChange}
            className="pagination-wrapper"
            pageClassName="page-number"
            previousClassName="previous-page"
            nextClassName="next-page"
            disabledClassName={"disabled-pagination"}
            activeClassName={"active-pagination"}
          />
        </div>
      )}
    </div>
  );
}

export default App;
