#!/usr/bin/env node
/*
APRS RX Node-RED Nodes.

Author:: Greg Albrecht W2GMD <oss@undef.net>
Copyright:: Copyright 2022 Greg Albrecht
License:: Apache License, Version 2.0
Source:: https://github.com/ampledata/node-red-contrib-aprs

Copyright 2022 Greg Albrecht

Licensed under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an 'AS IS' BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/* jslint node: true */
/* jslint white: true */

// APRSRXNode: Node for Receiving (RX) events from APRS.
const makeRXNode = (RED) => {
  function APRSRXNode(config) {
    RED.nodes.createNode(this, config);

    const WebSocket = require('ws');
    const ReconnectingWebSocket = require('reconnecting-websocket');
    const Aprs = require('aprs-parser');
    
    this.user = config.user;
    this.filter = config.filter;
    this.url = config.url || "ws://srvr.aprs-is.net:8080";

    let node = this;

    node.status({ fill: "red", shape: "dot", text: "Disconnected" });

    let login = `user ${node.user} pass -1 vers node-red-contrib-aprs 2.1`;

    if (typeof node.filter !== "undefined") {
      login = `${login} filter ${node.filter}`;
    }

    let aprsParser = new APRSParser();

    let ws = new ReconnectingWebSocket(node.url, [], {
      WebSocket: WebSocket,
      debug: true,
    });

    ws.onopen = () => {
      node.status({ fill: "black", shape: "square", text: "Connecting" });
      ws.send(login);
      node.status({ fill: "yellow", shape: "square", text: "Connecting" });
    };

    ws.onping = () => {
      console.debug(`${new Date().toISOString()} ws.onping`);
      node.status({ fill: "purple", shape: "square", text: "Ping" });
    };

    ws.onmessage = (data) => {
      node.status({ fill: "green", shape: "dot", text: "Receiving" });

      if (typeof data.data === "string" && data.data.startsWith("# ")) {
        if (data.data.includes("verified")) {
          node.status({ fill: "blue", shape: "dot", text: "Connected" });
        }
      } else {
        let aprsFrame = aprsParser.parse(`${data.data}`);

        // FIXME: Node.js has suppored 'object spread' since v5/v8?
        /*jshint -W119*/
        node.send({ payload: { ...aprsFrame } });
        /*jshint +W119*/
      }
    };

    ws.onclose = (evt) => {
      node.status({ fill: "orange", shape: "square", text: "Disconnecting" });

      if (evt.code !== 4158) {
        console.log(`${new Date().toISOString()} WebSocket Closing.`);
      }

      node.status({ fill: "red", shape: "square", text: "Disconnected" });
    };

    node.on("close", () => {
      node.debug(`Closing APRSRX.`);

      try {
        ws.close(4158);
      } catch (err) {
        console.log(`${new Date().toISOString()} Caught err=${err}`);
      }

      node.status({ fill: "red", shape: "dot", text: "Disconnected" });
    });
  }
  RED.nodes.registerType("aprs rx", APRSRXNode);
};

module.exports = makeRXNode;
