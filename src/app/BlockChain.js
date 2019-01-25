/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const Block = require('./Block');
const datastorage = require('./DataStorage');


class BlockChain {
    constructor() {
      this.datastorage = new datastorage();
      this.getBlockHeight().then((height) => {
        if (height === -1) {
          this.addBlock(new Block("First block in the chain - Genesis block")).then(() => console.log("Genesis block added!"))
        }
      })
    }
    async addBlock(newBlock) {
      // Block height
      const height = parseInt(await datastorage.getBlockByHeight());
      newBlock.height = height + 1;
      // UTC timestamp
      newBlock.time = new Date()
        .getTime()
        .toString()
        .slice(0, -3);
      // previous block hash
      if (newBlock.height > 0) {
        const previousBlockHeight = newBlock.height - 1;
        const previousBlock = await this.getBlock(previousBlockHeight);
        newBlock.previousBlockHash = previousBlock.hash;
      }
      // Block hash with SHA256 using newBlock and converting to a string
      newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
      // Adding block object to chain
      await this.datastorage.addBlockToDATA(newBlock.height, JSON.stringify(newBlock));
      //console.log(newBlock)
      return newBlock;
    }

    // get block
    async getBlock(blockHeight) {
      // return object as a single string
      let block = await this.datastorage.getBlockFromDATA(blockHeight);
      block = JSON.parse(block);
      if (blockHeight > 0) {
        block.body.star.storyDecoded = new Buffer(
          block.body.star.story,
          'hex',
        ).toString();
      }
      return block;
    }

    async getBlockHeight() {
      return await this.datastorage.getBlockHeightFromDATA()
    }

    // New Functions

    async getBlockByAddress(address) {
      return await this.datastorage.getBlockByAddressData(address);
    }

    async getBlockByHash(hash) {
      return await this.datastorage.getBlockByHashData(hash);
    }
  
    // validate block

    validateBlock(blockheight) {
      return new Promise((resolve, reject) => {
        this.getBlock(blockheight).then((block)=>{
          let blockHash = block.hash;
          block.hash = '';
          let validBlockHash = SHA256(JSON.stringify(block)).toString();
          if (blockHash === validBlockHash) {
            resolve(true);
          } else {
            reject('Block #' +blockheight+' invalid hash:\n' +blockHash+'<>'+validBlockHash);
          }
        }).catch((err) => {
          console.log('validateBlock: Unable to get block #'+blockHeight);
                reject(err);
        })
      })
    }

    async validateChain() {
      let errorLog = []
      let previousHash = ''
      let isValidBlock = false
  
      const heigh = await this.datastorage.getBlockHeightFromDATA()
  
      for (let i = 0; i <= heigh; i++) {
        await this.getBlock(i).then((block) => {
          isValidBlock = this.validateBlock(block.height)
  
          if (!isValidBlock) {
            errorLog.push(i)
          } 
  
          if (block.previousBlockHash !== previousHash) {
            errorLog.push(i)
          }
  
          previousHash = block.hash
  
          if (i === (heigh -1)) {
            if (errorLog.length > 0) {
              console.log(`Block errors = ${errorLog.length}`)
              console.log(`Blocks: ${errorLog}`)
            } else {
              console.log('No errors detected')
            }
          }
        })
      }
    }
  }

module.exports = BlockChain;
