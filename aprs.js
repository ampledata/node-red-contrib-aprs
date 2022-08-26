#!/usr/bin/env node
/*
APRS Node-RED Nodes.

Author:: Greg Albrecht W2GMD <oss@undef.net>
Copyright:: Copyright 2022 Greg Albrecht
License:: Apache License, Version 2.0
Source:: https://github.com/ampledata/node-red-contrib-aprs

Copyright 2022 Greg Albrecht

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* jslint node: true */
/* jslint white: true */

"use strict";

const makeAPRSTXNode = require("./cwop");

module.exports = function(RED) {
    const WebSocket = require("ws");
    const ReconnectingWebSocket = require("reconnecting-websocket");
    const Aprs = require("aprs-parser");

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

    RED.nodes.registerType("aprs config", APRSConfig, {
        credentials: {
            user: {type: "text"},
            pass: {type: "text"},
        },
    });

  /*
  APRSRXNode
    Node for Receiving (RX) events from APRS.
  */
  function APRSRXNode(config) {
    RED.nodes.createNode(this, config);

    this.user = config.user;
    this.filter = config.filter;
    this.url = config.url || "ws://srvr.aprs-is.net:8080";

    let node = this;

    node.status({fill: "red", shape: "dot", text: "Disconnected"});

    let login = `user ${node.user} pass -1 vers node-red-contrib-aprs 2.0`;

    if (typeof node.filter !== "undefined") {
        login = `${login} filter ${node.filter}`;
    }

    let aprsParser = new Aprs.APRSParser();

    let ws = new ReconnectingWebSocket(node.url, [], {
        WebSocket: WebSocket,
        debug: true
    });

    ws.onopen = function(evt) {
        console.debug(`${new Date().toISOString()} ws.onopen`);
        ws.send(login);
        node.status({fill: 'yellow', shape: 'dot', text: 'Connecting'});
    };

    ws.onping = function(evt) {
        console.debug(`${new Date().toISOString()} ws.onping`);
    };

    ws.onmessage = function(data, flags, number) {

        console.debug(`${new Date().toISOString()} ws.onmessage data="${data.data}"`);

        node.status({fill: 'blue', shape: 'dot', text: 'Receiving'});

        if (typeof data.data === "string" && data.data.startsWith("# ")) {
            if (data.data.includes("verified") ||
                data.data.includes("unverified")) {
                node.status({fill: 'green', shape: 'dot', text: 'Connected'});
            }
        } else {
            let aprsFrame = aprsParser.parse(`${data.data}`);
            node.send({payload: {...aprsFrame}});
        }
    };

    ws.onclose = function (evt) {
        console.log(`${new Date().toISOString()} ws.onclose code=${evt.code}`);

        if (evt.code !== 4158) {
            console.log(`${new Date().toISOString()} Closing.`);
        }
        node.status({fill: 'red', shape: 'dot', text: 'Disconnected'});
    };

    node.on('close', function() {
      node.debug(`Closing APRSRX.`);

      try {
          ws.close(4158);
      } catch(err) {
          console.log(`${new Date().toISOString()} Caught err=${err}`);
      }
      node.status({fill: 'red', shape: 'dot', text: 'Disconnected'});
    });
  }

  RED.nodes.registerType("aprs rx", APRSRXNode);
  
  makeAPRSTXNode(RED);
};
