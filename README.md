# Private BlockChain Notary Service"

Web service for a simple private Blockchain implemented using `Node.js` and `Express` framework  -- project @ Udacity's Blockchain Developer Nanodegree

Follow this step below to deployment and test this project.


![Alt text](https://github.com/wleandrooliveira/private_blockchain_rest_api/blob/master/src/images/shutterstock_749922058.jpg)

# Get started

1) Download project

```
$ git clone https://github.com/wleandrooliveira/private_blockchain_notary_service.git
```
2) Install dependencies

```
$ cd private_blockchain_notary_service
$ npm install
```
3) Run application

```
$ node server.js
when run node server.js by first time.
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
