const CryptoJS = require('crypto-js');

class Block {
  constructor(index, hash, previousHash, timestamp, data) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
}

let blockchain = [genesisBlock];

const genesisBlock = new Block(
  0,
  'D2D7E3C53296A2012AAF9051F43353EF607E9F2D62DC7EF1F6292EDB98655231',
  null,
  new Date().getTime(),
  'This is the genesis!!'
);

const getTimestamp = () => new Date().getTime();

const createHash = (index, previousHash, timestamp, data) =>
  CryptoJS.SHA256(
    index + previousHash + timestamp + JSON.stringify(data)
  ).toString();

const createNewBlock = data => {
  const previousBlock = getLastBlock();
  const newBlockIndex = previousBlock.index + 1;
  const newTimestamp = getTimestamp();
  const newHash = createHash(
    newBlockIndex,
    previousHash.hash,
    newTimestamp,
    data
  );
  const newBlock = new Block(
    newBlockIndex,
    newHash,
    previousHash,
    newTimestamp,
    data
  );
  return newBlock;
};

const getBlocksHash = block =>
  createHash(block.index, block.previousHash, block.timestamp, block.data);

const isNewBlockValid = (candidateBlock, latestBlock) => {
  if (!isNewStructureValid(candidateBlock)) {
    console.log('The candidate block structure is not valid');
    return false;
  } else if (latestBlock.index + 1 !== candidateBlock.index) {
    console.log('The candidate block doesnt have a valid index');
    return false;
  } else if (latestBlock.hash !== candidateBlock.previousHash) {
    console.log(
      'The previousHash of the candidate block is not the hash of latest block'
    );
    return false;
  } else if (getBlocksHash(candidateBlock) !== candidateBlock.hash) {
    console.log('The hash of this block is invalid');
    return false;
  }
  return true;
};

const isNewStructureValid = block => {
  return (
    typeof block.index === 'number' &&
    typeof block.hash === 'string' &&
    typeof block.previousHash === 'string' &&
    typeof block.timestamp === 'number' &&
    typeof block.data === 'string'
  );
};

const isChainValid = candidateChain => {
  const isGenesisValid = block => {
    return JSON.stringify(block) === JSON.stringify(genesisBlock);
  };
  if (!isGenesisValid(candidateBlock)) {
    console.log(
      "The candidateChain's genesisBlock is not the same as our genegisBlock"
    );
    return false;
  }
  for (let i = 1; i < candidateChain.length; i++) {
    if (!isNewBlockValid(candidateChain[i], candidateChain[i - 1])) {
      return false;
    }
  }
  return true;
};
