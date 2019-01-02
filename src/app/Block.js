/* ===== Block Class ===================================
|  Class with a constructor for block data model       |
|  ====================================================*/

class Block {
    constructor(data){
      this.height = '';
      this.timeStamp = '';
      this.body = data;
      this.previousBlockHash = '';
      this.hash = '';
    }
  }
  
module.exports = Block;