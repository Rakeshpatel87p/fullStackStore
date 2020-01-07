//Resolve request on database

const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    );

    console.log(item);

    return item;
  },

  updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;

    return ctx.db.mutations.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    // 1. find the item
    const where = { id: args.id };
    const item = await ctx.db.query.item({ where }, `{id title}`);
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async addToCart(parent, args, ctx, info) {
    //Check if item is already in the cart and increment by 1 if it is
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        item: { id: args.id }
      }
    });
    if (existingCartItem) {
      console.log("This item is already in their cart");
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 }
        },
        info
      );
    }
    //if its not, create fresh cartItem for visitor
    return ctx.db.mutation.createCartItem(
      {
        data: {
          item: {
            connect: { id: args.id }
          }
        }
      },
      info
    );
  }
};

module.exports = Mutations;
