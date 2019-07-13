const { addPin } = require("./index");
const { verify, authorize } = require("../authentication");
const db = require("knex")(require("../knexfile"));

const resolvers = {
	Query: {
		pins: () => db.select().from('pins'),
	},
	Mutation: {
		addPin: async (_, { pin }, { token }) => {
			const [user] = await authorize(db, token);
			const { user: updatedUser, pin: createdPin } = await addPin(user, pin);
			await db("pins").insert(createdPin);
			return createdPin;
		},
	}
};

module.exports = resolvers;