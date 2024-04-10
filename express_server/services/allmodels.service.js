const prismaQuery = require("../utils/prisma");

module.exports = async (limit, thisUser) => {
  const models = await prismaQuery.user.findMany({
    where: {
      is_model: true,
      NOT: {
        id: thisUser.id
      }
    },
    take: limit,
    orderBy: {
      id: "desc",
    },
  });
  const modelsWithoutPassword = models.map(({ password, ...rest }) => rest);
  return modelsWithoutPassword;
};
