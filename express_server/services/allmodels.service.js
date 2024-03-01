const prismaQuery = require("../utils/prisma");

module.exports = async (limit) => {
  const models = await prismaQuery.user.findMany({
    where: {
      is_model: true,
    },
    take: limit,
    orderBy: {
      id: "desc",
    },
  });
   const modelsWithoutPassword = models.map(({ password, ...rest }) => rest);
   return modelsWithoutPassword;
};
