const Query = {
    async items(parent, args, ctx, info) {
        const items = await ctx.db.query.items()
        console.log(items)
        return items
    }
};

module.exports = Query;
