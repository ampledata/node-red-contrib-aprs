#!/usr/bin/env node
/**
 * APRS Node-RED Nodes.
 *
 * Copyright Greg Albrecht and other contributors
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/* jslint node: true */
/* jslint white: true */

const VERSION = "3.0.0";

// Ignore: 800001
module.exports = function (RED) {
  const makeAPRSConfigNode = require("./aprsConfig");
  const makeAPRSRXNode = require("./aprsRX");
  const makeAPRSTXNode = require("./aprsTX");

  makeAPRSConfigNode(RED);
  makeAPRSRXNode(RED);
  makeAPRSTXNode(RED);
};
