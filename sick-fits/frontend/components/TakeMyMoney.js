import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { Query } from "react-apollo";
import calcTotalPrice from "../lib/calcTotalPrice";
import { LOCAL_CART_ITEMS_QUERY } from "./Cart";
class TakeMyMoney extends React.Component {
  onToken = res => {
    console.log("On Token Called!");
    console.log(res.id);
  };
  render() {
    return (
      <Query query={LOCAL_CART_ITEMS_QUERY}>
        {data => {
          const { cartItems } = data.data;
          return (
            <StripeCheckout
              amount={cartItems.reduce(
                (tally, currentVal) =>
                  tally + currentVal.price * currentVal.price,
                0
              )}
              name="Sick Fits"
              description={`Order of ${cartItems.reduce(
                (tally, currentVal) =>
                  tally + currentVal.price * currentVal.quantity,
                0
              )} items!`}
              image={cartItems[0] && cartItems[0].image}
              stripeKey="pk_test_ewDeV5z2M97iMnUBD5CnPceY00UzizBuef"
              currency="USD"
              token={res => this.onToken(res)}
            >
              {this.props.children}
            </StripeCheckout>
          );
        }}
      </Query>
    );
  }
}

export default TakeMyMoney;
