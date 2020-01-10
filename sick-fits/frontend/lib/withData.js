import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
import { endpoint } from "../config";
import { LOCAL_STATE_QUERY } from "../components/Cart";

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
          addToCart(_, variables, { cache }) {
            //read cartItems value from cache
            const { cartItems } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            //add new cart item to list
            const data = {
              data: { cartItems: [...cartItems, variables.id] }
            };
            cache.writeData({ data });
            console.log(data.cartItems);
            console.log(cache);
            return data;
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
