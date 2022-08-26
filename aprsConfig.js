#!/usr/bin/env node
/*
APRS Node-RED Nodes.

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

const makeAPRSConfigNode = RED => {
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
};

module.exports = makeAPRSConfigNode;