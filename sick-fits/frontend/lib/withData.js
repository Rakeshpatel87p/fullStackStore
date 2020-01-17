import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart";
import { LOCAL_CART_ITEMS_QUERY } from "../components/AddToCart";

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === "development" ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: "include"
        },
        headers
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            // Write the cart State to the opposite
            const data = {
              data: { cartOpen: !cartOpen }
            };
            cache.writeData(data);
            return data;
          },
          addToCart(_, { id, title, price, image }, { cache }) {
            const { cartItems } = cache.readQuery({
              query: LOCAL_CART_ITEMS_QUERY
            });

            let data;

            cartItems.find(item => item.id === id)
              ? (data = {
                  cartItems: cartItems.map(item => {
                    let returnVal = { ...item };
                    if (item.id === id) {
                      returnVal.quantity = returnVal.quantity + 1;
                    }
                    return returnVal;
                  })
                })
              : (data = {
                  cartItems: [
                    ...cartItems,
                    { id, title, price, image, quantity: 1 }
                  ]
                });

            cache.writeQuery({ query: LOCAL_CART_ITEMS_QUERY, data });
            return data.cartItems;
          },
          removeFromCart(_, { id }, { cache }) {
            //read from cartItems
            const { cartItems } = cache.readQuery({
              query: LOCAL_CART_ITEMS_QUERY
            });
            //find and remove cartItem with that id
            const updatedCartItems = cartItems.filter(item => item.id !== id);

            const data = {
              cartItems: [...updatedCartItems]
            };
            //rewrite fresh cartItems
            cache.writeData({ query: LOCAL_CART_ITEMS_QUERY, data });
          }
        }
      },
      defaults: {
        cartOpen: true,
        cartItems: []
      }
    }
  });
}

export default withApollo(createClient);
