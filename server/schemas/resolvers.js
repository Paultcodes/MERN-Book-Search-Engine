const { AuthenticationError } = require("apollo-server-expresss");
const { Book, User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addUser: async (parent, { name, email, password }) => {
      const profile = await User.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },

    saveBook: async (_, { bookInput }) => { },
  },
};
