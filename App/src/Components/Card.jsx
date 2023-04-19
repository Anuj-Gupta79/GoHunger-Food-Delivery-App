import React from "react";

export default function Card(props) {
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;

  return (
    <div
      className="card mt-3 bg-danger"
      style={{ width: "16rem", maxHeight: "360px" }}
    >
       <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
      <div className="card-body">
      <h5 className="card-title">{props.foodName}</h5>
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
