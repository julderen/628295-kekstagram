const definePage = async (cursor, skip = 0, limit = 50) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await cursor.count()
  };
};

module.exports = {
  definePage
};
