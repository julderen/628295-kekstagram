const dataGenerate = require(`../../dataGenerator/dataGenerate`);

const DATA_FILTER = {
  limit: 10,
  skip: 0
};

const getPosts = async (req, res) => {
  const data = await dataGenerate.generateEntities((req.query && req.query.limit) || DATA_FILTER.limit);

  res.json(data);
};

const getPostByDate = async (req, res) => {
  const data = await dataGenerate.generateEntity(req.params.date);

  res.json(data);
};


const createPost = (async (req, res) => {
  const data = req.body;

  res.send(data);
});

module.exports = {
  getPosts,
  getPostByDate,
  createPost
};
