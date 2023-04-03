import React from "react";

export default function Card() {
  return (
    <div
      className="card mt-3 bg-secondary"
      style={{ background : "#4169E1"}}
    >
      <img className="card-img-top" src="https://source.unsplash.com/random/900x700/?maggi" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is the text.</p>
        <div className="container w-100">
          <select
            className="ml-2 h-100  rounded"
            style={{ "background" : "#32363d"}}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 rounded"
            style={{ color: "white", cursor: "pointer", background : "#32363d" }}
          >
            <option key="small" style={{ color: "white" }}>
              Small
            </option>
            <option key="medium" style={{ color: "white" }}>
              Medium
            </option>
            <option key="large" style={{ color: "white" }}>
              Large
            </option>
          </select>
          <div className="d-inline h-100 fs-5">Total </div>
        </div>
      </div>
    </div>
  );
}
