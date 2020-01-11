import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: String!) {
    addToCart(id: $id) @client {
      id
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
    const { id } = this.props;
    return (
      //<button onClick>Add To Cart</button>
      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }}>
        {addToCart => <button onClick={addToCart}>Add To Cart</button>}
      </Mutation>
    );
  }
}

export default AddToCart;
export { LOCAL_CART_ITEMS_QUERY };
