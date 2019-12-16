#!/usr/bin/env node
/*
APRS Node-RED Nodes.

Author:: Greg Albrecht W2GMD <oss@undef.net>
Copyright:: Copyright 2019 Greg Albrecht
License:: Apache License, Version 2.0
Source:: https://github.com/ampledata/node-red-contrib-aprs
*/

/* jslint node: true */
/* jslint white: true */
/* jshint esversion: 6 */

'use strict';

var WebSocket = require('ws');
var aprs = require('aprs-parser');

module.exports = function(RED) {
  /*
  APRSConfig
    Meta-Node for containing other Node-level configurations.
  */
  function APRSConfig(config) {
    RED.nodes.createNode(this, config);
    this.user = config.user;
    this.pass = config.pass;
    this.filter = config.filter;
  }

  RED.nodes.registerType('aprs config', APRSConfig, {
    credentials: {
      user: {type: 'text'},
      pass: {type: 'text'},
    },
  });

  /*
  APRSRXNode
    Node for Receiving (RX) events from APRS.
  */
  function APRSRXNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    var ws;
    var login;
    var ws_url = 'ws://srvr.aprs-is.net:8080';

    node.aprs_config = RED.nodes.getNode(config.aprs_config);
    node.user = node.aprs_config.credentials.user;
    node.pass = node.aprs_config.credentials.pass;
    node.filter = node.aprs_config.filter;

    node.status({fill: 'red', shape: 'dot', text: 'Disconnected'});

    login = `user ${node.user} pass ${node.pass} vers node-red-contrib-aprs 1`;

    if (typeof node.filter !== 'undefined') {
        login = `${login} filter ${node.filter}`;
    }

    ws = new WebSocket(ws_url);
    var aprs_parser = new aprs.APRSParser();

    ws.onopen = function(evt) {
        console.debug(`${new Date().toISOString()} ws.onopen`);
        ws.send(login);
        node.status({fill: 'yellow', shape: 'dot', text: 'Connecting'});
    };

    ws.onmessage = function(data, flags, number) {
        console.debug(`${new Date().toISOString()} ws.onmessage data.data=${data.data}`);
        node.status({fill: 'blue', shape: 'dot', text: 'Receiving'});
        if (typeof data.data === 'string' && data.data.startsWith('# ')) {
            if (data.data.includes('verified')) {
                node.status({fill: 'green', shape: 'dot', text: 'Connected'});
            }
        } else {
            node.send({'payload': aprs_parser.parse(`${data.data}`)});
        }
    };

    ws.onclose = function (evt) {
        console.log(`${new Date().toISOString()} ws.onclose err=${evt.code}`);
        if (evt.code !== 4158) {
            console.log(`${new Date().toISOString()} Closing.`);
        }
        node.status({fill: 'red', shape: 'dot', text: 'Disconnected'});
    };

    node.on('close', function() {
      node.debug(`${node.id} Closing APRSRX.`);
      try {
          ws.close(4158);
      } catch(err) {
          console.log(`${new Date().toISOString()} ${node.id} Caught err=${err}`);
      }
      node.status({fill: 'red', shape: 'dot', text: 'Disconnected'});
    });
  }

  RED.nodes.registerType('aprs rx', APRSRXNode, {
    credentials: {
      user: {type: 'text'},
      pass: {type: 'text'},
      filter: {type: 'text'},
    },
  });
};
