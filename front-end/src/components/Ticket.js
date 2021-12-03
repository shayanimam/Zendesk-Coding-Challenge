import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";

const Ticket = ({ id, subject, description, status, created_at }) => {
  const date = new Date(created_at).toLocaleString("en-US");
  const [expand, setExpand] = useState(false);

  const toggleDialog = () => {
    setExpand((prev) => !prev);
  };

  return (
    <div
      className="ticket-wrapper"
      onClick={toggleDialog}
      data-testid="ticket-wrapper"
    >
      <Dialog
        open={expand}
        onClose={toggleDialog}
        onBackdropClick={toggleDialog}
        fullWidth
        className="dialog"
      >
        <div className="ticket-header">
          <h3>ID: {id}</h3>
          <h3>{subject}</h3>
          <h3>[{status}]</h3>
        </div>
        <h4 className="ticket-description">{description}</h4>
        <h4 className="ticket-date">Date created: {date}</h4>
      </Dialog>
      <div className="list-view">
        <h4>#{id}</h4>
        <h4>{subject}</h4>
      </div>
    </div>
  );
};
export { Ticket };
