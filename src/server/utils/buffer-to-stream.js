const {Duplex} = require(`stream`);

module.exports = (buffer) => {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};
