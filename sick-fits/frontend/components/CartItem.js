import React from "react";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = props => {
  if (!props)
    return (
      <CartItemStyles>
        <p>This Item has been removed</p>
      </CartItemStyles>
    );
  return (
    <CartItemStyles>
      <img width="100px" src={props.image} alt={props.title} />
      <p>{props.title}</p>
      <p>{formatMoney(props.price)}</p>
      <p>{props.quantity}</p>
    </CartItemStyles>
  );
};

export default CartItem;
