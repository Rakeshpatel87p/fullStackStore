const Query = {
    dogs(parent, args, ctx, info) {
        return [{name: "Doggie"}, {name: "Robert"}]
    }
};

module.exports = Query;
