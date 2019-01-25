# Private BlockChain Notary Service"

Web service for a simple private Blockchain implemented using `Node.js` and `Express` framework  -- project @ Udacity's Blockchain Developer Nanodegree

Follow this step below to deployment and test this project.


![Alt text](https://github.com/wleandrooliveira/private_blockchain_rest_api/blob/master/src/images/shutterstock_749922058.jpg)

The API project file server.js include two endpoints:

Get block

```
app.get('/block/:height', async (req, res) => {
  try {
    const response = await chain.getBlock(req.params.height)
    res.send(response)
  } catch (error) {
    res.status(404).json({
      "status": 404,
      "message": "Block not found"
    })
  }
})
```
Post block
```
app.post('/block', async (req, res) => {
  if (req.body.body === '' || req.body.body === undefined) {
    res.status(400).json({
      "status": 400,
      "message": "Fill the body parameter"
    })
  }

  await chain.addBlock(new Block(req.body.body))
  const height = await chain.getBlockHeight()
  const response = await chain.getBlock(height)

  res.status(201).send(response)
})
```

# Get started

1) Download project

```
$ git clone https://github.com/wleandrooliveira/private_blockchain_rest_api.git
```
2) Install dependencies

```
$ cd private_blockchain_rest_api
$ npm install
```
3) Run application

```
$ node server.js
when run node server.js by first time, you see this messagem in prompt or terminal

Server listening on port 8000, Ctrl+C to stop
New hash: 128dbb2a737629eba57c1dffd15facdf7ddd69f8d2145d5c5f241c604b95a3e1
Added block #0
Genesis block added!
```

# RESTful API Endpoint 

## Test Endpoints

## Get Block

**Method**: GET

**URL**: `/block/:blockHeight`

In this this project i used postman to make a test request.
[Postman](https://www.getpostman.com) is a powerful tool used to test web services. It was developed for sending HTTP requests in a simple and quick way.

Example:
```
http://localhost:8000/block/0
```

![Alt text](https://github.com/wleandrooliveira/private_blockchain_rest_api/blob/master/src/images/getblock_genesis.PNG)


**Method**: GET

**URL**: `/block/:blockHeigh_nonexistentt`

Example:
```
http://localhost:8000/block/11
```

![Alt text](https://github.com/wleandrooliveira/private_blockchain_rest_api/blob/master/src/images/404_by_id.PNG)


## Add Block

Add a new block with string data to the Blockchain

**Method**: POST

**URL**: `/block`

**Data**:
* key: body
* value: string

Example:
```
http://localhost:8000/block
```
![Alt text](https://github.com/wleandrooliveira/private_blockchain_rest_api/blob/master/src/images/insertBlock.PNG)


# License

Copyright (c) 2019 Wanderson Leandro de Oliveira
