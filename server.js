const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Blockchain = require('./src/app/BlockChain');
const Block = require('./src/app/Block');
const StarValidation = require('./src/app/starValidation');
const config = require('./src/config/config')
// App setup
const app = express();

// Logging incoming requests
app.use(morgan('combined'));

// Parse incoming requests
app.use(bodyParser.json({ type: '*/*' }));

validateAddressParameter = async (req, res, next) => {
  try {
    const starValidation = new StarValidation(req);
    starValidation.validateAddressParameter();
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

validateSignatureParameter = async (req, res, next) => {
  try {
    const starValidation = new StarValidation(req);
    starValidation.validateSignatureParameter();
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

validateNewStarRequest = async (req, res, next) => {
  try {
    const starValidation = new StarValidation(req);
    starValidation.validateNewStarRequest();
    next();
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

// Routes

app.post('/block', [validateNewStarRequest], async (req, res) => {
  const starValidation = new StarValidation(req);
  starValidation.validateNewStarRequest();
  //check if request is valid
  try {
    const isValid = await starValidation.isValid();
    if (!isValid) {
      throw new Error('There was an error');
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
    return;
  }

  const body = ({ address, star } = req.body);
  const story = star.story;
  body.star = {
    dec: star.dec,
    ra: star.ra,
    story: new Buffer(story).toString('hex'),
    mag: star.mag,
    con: star.con,
  };

  let add = await Blockchain.addBlock(new Block(req.body));
  starValidation.invalidate(req.body.address);
  res.json(add);
});

app.get('/block/:block', async (req, res) => {
  let block = await Blockchain.getBlock(req.params.block);
  res.json(block);
});

app.get('/stars/address:address', async (req, res) => {
  let response = await Blockchain.getBlockByAddress(
    req.params.address.slice(1),
  );
  res.json(response);
});

app.get('/stars/hash:hash', async (req, res) => {
  let response = await Blockchain.getBlockByHash(req.params.hash.slice(1));
  res.json(response);
});

app.post('/requestValidation', [validateAddressParameter], async (req, res) => {
  const starValidation = new StarValidation(req);
  const address = req.body.address;

  try {
    data = await starValidation.getPendingAddressRequest(address);
  } catch (error) {
    data = await starValidation.saveNewRequestValidation(address);
  }

  res.json(data);
});

app.post(
  '/message-signature/validate',
  [validateAddressParameter, validateSignatureParameter],
  async (req, res) => {
    const starValidation = new StarValidation(req);
    const address = req.body.address;
    const signature = req.body.signature;
    try {
      const response = await starValidation.validateSignature(
        address,
        signature,
      );
      if (response.registerStar) {
        res.json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      res.status(404).json({
        status: 404,
        message: error.message,
      });
    }
  },
);

// Server setup

const server = http.createServer(app);
server.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
});