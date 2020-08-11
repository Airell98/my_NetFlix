import React, { useState } from "react";

export default () => {
  return (
    <>
      <div className="toast-pf toast-pf-max-width alert alert-warning alert-dismissable">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-hidden="true"
        >
          <span className="pficon pficon-close"></span>
        </button>
        <div className="pull-right toast-pf-action">
          <a href="#">Reload Server</a>
        </div>
        <span className="pficon pficon-ok"></span>
        Your work has been saved.
      </div>
    </>
  );
};
