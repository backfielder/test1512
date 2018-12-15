# D3/Websockets Experiment

## Overview

Just a learning experiment cobbled from pieces of
[this excellent websockets tutorial](http://martinsikora.com/nodejs-and-websocket-simple-chat-tutorial) and [these excellent d3 tutorials](https://github.com/mbostock/d3/wiki/Tutorials).

## Dependencies

    $ npm install websocket
    $ pip install confluent-kafka numpy scipy kafka tornado hdfs

## Setup
Update this line of index.html to wherever the websocket server is running:

    var wsServer = 'ws://localhost:1337/';

## Running

Websocket & HTTP server:

    $ node server/websocket-server.js

Kafka Consumer:

    $ python kafka_gendata_test_socket.py

Kafka Producer:

    $ python producer.py
