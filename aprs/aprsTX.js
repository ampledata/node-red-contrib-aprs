#!/usr/bin/env node
/*
APRS RX Node-RED Nodes.

Author:: Greg Albrecht W2GMD <oss@undef.net> & Jan Janak (OK2JPR) <jan@janakj.org>
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

const aprsLib = require("./aprsLib");

// APRSTXNode: Node for transmitting data to APRS-IS.
const makeAPRSTXNode = (RED) => {
  function APRSTXNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.aprsConfig = RED.nodes.getNode(config.aprsConfig);
    node.user = node.aprsConfig.credentials.user;
    node.pass = node.aprsConfig.credentials.pass;

    node.from = config.from;
    node.to = config.to;
    node.via = config.via;
    node.server = config.server;
    node.port = config.server;

    node.status({ fill: "green", shape: "dot", text: "Idle" });

    node.on("input", (msg) => {
      node.status({ fill: "yellow", shape: "dot", text: "Transmitting" });

      const pl = typeof msg.payload === "object" ? msg.payload : {};
      const from = pl.from || pl.name || node.from;
      const to = pl.to || node.to || "APYSNR";
      const via = pl.via || node.via;

      try {
        let data;
        
        let server = node.server;
        let port = node.port;

        switch (typeof pl) {
          case "string":
            data = pl;
            break;

          case "object":
            let rootPl;

            server = pl.server || node.server;
            port = pl.port || node.port;

            if (pl.data) {
              rootPl = pl.data;
            } else {
              rootPl = pl;
            }

            if (rootPl.weather) {
              data = aprsLib.formatWxReport(rootPl);
              server = pl.server || node.server || "cwop.aprs.net";
            } else {
              data = aprsLib.formatPosData(rootPl);
            }

            break;
          default:
            throw new Error("Invalid payload type", msg);
            break;
        }

        const packet = aprsLib.formatPacket(from, to, via, data);

        aprsLib.sendPacket(node.user, node.pass, packet, 20, server, port)
          .then(() => {
            node.status({ fill: "green", shape: "dot", text: "Idle" });
          })
          .catch((error) => {
            node.status({ fill: "red", shape: "dot", text: `Error: ${error}` });
            this.error(error, msg);
          });

      } catch (error) {
        node.status({ fill: "red", shape: "dot", text: `Error: ${error}` });
        this.error(error, msg);
      }
    });
  }

  RED.nodes.registerType("aprs tx", APRSTXNode, {
    credentials: {
      user: { type: "text" },
      pass: { type: "text" },
    },
  });
};

module.exports = makeAPRSTXNode;
