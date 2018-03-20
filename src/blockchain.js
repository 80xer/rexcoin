class Block {
  constructor(index, hash, previousHash, timestamp, data) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
}

const genesisBlock = new Block(
  0,
  'D2D7E3C53296A2012AAF9051F43353EF607E9F2D62DC7EF1F6292EDB98655231',
  null,
  new Date().getTime(),
  'This is the genesis!!'
);

let blockchain = [genesisBlock];

console.log('====================================');
console.log(blockchain);
console.log('====================================');
