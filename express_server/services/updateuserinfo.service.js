const prismaQuery = require("../utils/prisma");

module.exports = async ({ name, location, bio, website }, req) => {
  try {
    const updateUser = await prismaQuery.user.update({
      where: {
        user_id: req.user.user_id,
      },
      data: {
        name: name,
        location: location,
        bio: bio,
        website: website,
      },
    });
    prismaQuery.$disconnect();
    return !!updateUser;
    
  } catch (err) {
    console.log(err);
    return false;
  }
};
