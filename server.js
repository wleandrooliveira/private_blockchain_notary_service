const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express()
const Block = require('./src/app/Block')
const Blockchain = require('./src/app/BlockChain')
const config = require('./src/config/config')
const RegisterStarValidation = require('./src/app/StarRegisterValidation')
//const dataStorage = require('./src/app/DataStorage');
//const data = new dataStorage();

// Logging incoming requests
app.use(morgan('combined'));

// Parse incoming requests
app.use(bodyParser.json({ type: '*/*' }));

validateAddressParameter = async (req, res, next) => {
  try {
    const registerStarValidation = new RegisterStarValidation(req)
    registerStarValidation.validateAddressParameter()
    next()
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
}

validateSignatureParameter = async (req, res, next) => {
  try {
    const registerStarValidation = new RegisterStarValidation(req)
    registerStarValidation.validateSignatureParameter()
    next()
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
}

validateNewStarRequest = async (req, res, next) => {
  try {
    const registerStarValidation = new RegisterStarValidation(req)
    registerStarValidation.validateNewStarRequest()
    next()
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message
    })
  }
}


// Server setup
const server = http.createServer(app);
server.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
});

app.use(bodyParser.json())

//Routes 

app.post('/block', [validateNewStarRequest], async (req, res) => {
  const registerStarValidation = new RegisterStarValidation(req);
  registerStarValidation.validateNewStarRequest();
  //check if request is valid
  try {
    const isValid = await registerStarValidation.isValid();
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
  registerStarValidation.invalidate(req.body.address);
  res.json(add);
});



app.get('/block/:height', async (req, res) => {
  try {
    const response = await Blockchain.getBlock(req.params.height)
    res.send(response)
  } catch (error) {
    res.status(404).json({
      "status": 404,
      "message": "Block not found"
    })
  }
})


app.get('/stars/address:address', async (req, res) => {
  try {
    const address = req.params.address.slice(1)
    const response = await Blockchain.getBlocksByAddress(address);

    res.send(response)
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: 'Block not found'
    })
  }
})

app.get('/stars/hash:hash', async (req, res) => {
  try {
    const hash = req.params.hash.slice(1)
    const response = await Blockchain.getBlockByHash(hash);

    res.send(response)
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: 'Block not found'
    })
  }
})


app.post('/requestValidation', [validateAddressParameter], async (req, res) => {
  const registerStarValidation = new RegisterStarValidation(req)
  const address = req.body.address

  try {
    data = await registerStarValidation.getPendingAddressRequest(address);
  } catch (error) {
    data = await registerStarValidation.saveNewRequestValidation(address);
  }

  res.json(data)
})

app.post('/message-signature/validate', [validateAddressParameter, validateSignatureParameter], async (req, res) => {
  const registerStarValidation = new RegisterStarValidation(req)

  try {
    const { address, signature } = req.body
    const response = await registerStarValidation.validateSignature(address, signature)

    if (response.registerStar) {
      res.json(response)
    } else {
      res.status(401).json(response)
    }
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message
    })
  }
})

app.get('/', (req, res) => res.status(404).json({
  "status": 404,
  "message": "Accepted endpoints: POST /block or GET /block/{BLOCK_HEIGHT}"
}))
