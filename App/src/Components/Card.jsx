import React,{useState, useEffect, useRef} from "react";
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  let dispatch = useDispatchCart(); 
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  let data = useCart();
  const priceRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async() => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
    console.log(data)
  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div
      className="card mt-3 "
      style={{ width: "16rem", maxHeight: "360px" }}
    >
       <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
      <div className="card-body">
      <h5 className="card-title">{foodItem.name}</h5>
        <div className="container w-100">
          <select
            className="ml-2 h-100  rounded bg-danger"
            onChange={(e) => setQty(e.target.value)}
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
            className="m-2 h-100 rounded bg-danger cursor-pointer"
            onChange={(e) => setSize(e.target.value)}
            ref={priceRef}
          >
           {
            priceOptions.map((data) => {
              return <option key={data} value={data}>{data}</option>
            })
           }
          </select>
          <div className="d-inline h-100 fs-5"> ₹{finalPrice}/-</div>
        </div>
        <hr />
        <button className={`btn btn-danger justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
