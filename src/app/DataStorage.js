const level = require('level');
const chainDB = './data/chain';

class DataStorage {
  // Declaring the class constructor
  constructor(){
      this.db = level(chainDB);
  }

  addBlockToDATA(key, value) {
      let self = this;
      return new Promise((resolve, reject) => {
        self.db.put(key, value, (error) => {
          if (error) {
            reject(error)
          }

          console.log(`Added block #${key}`)
          resolve(`Added block #${key}`)
        })
      })
    }

  getBlockFromDATA(key) {
    let self = this;
    return new Promise((resolve, reject) => {
      self.db.get(key, (error, value) => {
        if (value === undefined) {
          return reject('Not found')
        } else if (error) {
          return reject(error)
        }
        value = JSON.parse(value)

        if (parseInt(key) > 0){
          value.body.star.storyDecoded = new Buffer(value.body.star.story, 'hex').toString()
        }

        return resolve(value)

      })
    })
  }

  getBlockHeightFromDATA() {
    let self = this;
    return new Promise((resolve, reject) => {
      let height = -1;

      self.db.createReadStream().on('data', (data) => {
        height++
      }).on('error', (error) => {
        reject(error)
      }).on('close', () => {
        resolve(height)
      })
    })
  }

  // Get block by address
  getBlockByAddressData(address) {
    const blocks = [];
    let block;

    return new Promise((resolve, reject) => {
      let self = this;
      self.db
        .createReadStream()
        .on('data', data => {
          block = JSON.parse(data.value);
          if (block.body.address === address) {
            block.body.star.storyDecoded = new Buffer(
              block.body.star.story,
              'hex',
            ).toString();
            blocks.push(block);
          }
        })
        .on('error', error => {
          return reject(error);
        })
        .on('close', () => {
          return resolve(blocks);
        });
    });
  }

  isGenesis(key) {
    return parseInt(key) === 0
  }

  // Get block by Hash
  getBlockByHashData(hash) {
    let block;
    let self = this;
    return new Promise((resolve, reject) => {
      self.db
        .createReadStream()
        .on('data', data => {
          block = JSON.parse(data.value);
          if (block.hash === hash) {
            console.log(data.key);
            if (data.key != 0) {
              block.body.star.storyDecoded = new Buffer(
                block.body.star.story,'hex'
              ).toString();
              return resolve(block);
            } else {
              return resolve(block);
            }
          }
        })
        .on('error', error => {
          return reject(error);
        })
        .on('close', () => {
          return reject('Not found')
        });
    });
  }
  
}

module.exports = DataStorage;