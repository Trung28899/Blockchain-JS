const getBlockchain = async (req, res, next) => {
  // req.blockchain is set in server.js
  res.json(req.blockchain);
};

const mineBlock = async (req, res, next) => {
  const blockchain = req.blockchain;
  const transaction_data = "stubbed_trans_data";
  // declared the request in server.js
  const pubsub = req.pubsub;

  blockchain.add_block(transaction_data);
  const block = blockchain.chain[blockchain.chain.length - 1];
  pubsub.broadcast_block(block);

  res.json(block);
};

export { getBlockchain, mineBlock };
