import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/CartContext";
import { useContext } from "react";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAddItem={cartItemAddHandler.bind(null, item)}
            onRemoveItem={removeItemHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  const clearCartHander = () => {
    cartCtx.clearCart();
  };

  const onSubmitOrder = (userData) => {
    fetch("https://react-http-16399-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        users: userData,
        orderItems: cartCtx.items,
      }),
    });
  };

  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div>
        <CheckOut
          onHideCart={props.onHideCart}
          onSubmitOrder={onSubmitOrder}
          onClearCart={clearCartHander}
        />
      </div>
    </Modal>
  );
};

export default Cart;
