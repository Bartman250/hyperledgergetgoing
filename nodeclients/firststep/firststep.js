

var localServer = "http://localhost:7050";

var blockchainServer = localServer;

function deployit() {

    var request = require('request');
    //Lets configure and request
    request({
        url: blockchainServer + '/chaincode', //URL to hit
        method: 'POST',
        json: {
            "jsonrpc": "2.0",
            "method": "deploy",
            "params": {
                "type": 1,
                "chaincodeID": {
                    "name": "gg"
                },
                "ctorMsg": {
                    "function": "init",
                    "args": ["a", "100", "b", "200"]
                }
            },
            "id": 1
        }
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
        }

    });
}

function invokeit() {

    var request = require('request');

    request({
        url: blockchainServer + '/chaincode', //URL to hit
        method: 'POST',
        json: {
            "jsonrpc": "2.0",
            "method": "invoke",
            "params": {
                "type": 1,
                "chaincodeID": {
                    "name": "gg"
                },
                "ctorMsg": {
                    "function": "invoke",
                    "args": ["a", "b", "10"]
                }
            },
            "id": 2
        }
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
        
        }

    });


};

function queryit() {

    var request = require('request');
    //Lets configure and request
    request({
        url: blockchainServer + '/chaincode', //URL to hit
        //qs: {from: 'blog example', time: +new Date()}, //Query string data
        method: 'POST',
        //Lets post the following key/values as form
        json: {
            "jsonrpc": "2.0",
            "method": "query",
            "params": {
                "type": 1,
                "chaincodeID": {
                    "name": "gg"
                },
                "ctorMsg": {
                    "function": "query",
                    "args": ["a"]
                }
            },
            "id": 3
        }
    }, function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(response.statusCode, body);
        }
    });
};


