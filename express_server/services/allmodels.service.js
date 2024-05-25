const prismaQuery = require("../utils/prisma");

module.exports = async (limit, thisUser) => {
  const models = await prismaQuery.$queryRaw`
  SELECT *
  FROM User
  WHERE is_model = true AND id != ${thisUser.id}
  ORDER BY RAND()
  LIMIT ${limit};
`;

  const modelsWithoutPassword = models.map(({ password, ...rest }) => rest);
  return modelsWithoutPassword;
};
