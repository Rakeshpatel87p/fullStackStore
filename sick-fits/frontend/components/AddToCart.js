import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION(
    $id: String!
    $title: String!
    $price: Int!
    $image: String!
  ) {
    addToCart(id: $id, title: $title, price: $price, image: $image) @client {
      id
      title
      price
      image
    }
  }
`;

const LOCAL_CART_ITEMS_QUERY = gql`
  query {
    cartItems @client
  }
`;

class AddToCart extends Component {
  render() {
    const { id, title, price, image } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ id, title, price, image }}>
        {addToCart => <button onClick={addToCart}>Add To Cart</button>}
      </Mutation>
    );
  }
}

export default AddToCart;
export { LOCAL_CART_ITEMS_QUERY };
