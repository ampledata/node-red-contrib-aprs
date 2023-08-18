/**
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

var net = require("net");
var should = require("should");
var stoppable = require("stoppable");
var helper = require("node-red-node-test-helper");

const APRSNode = require("../aprs/aprs");
const { init } = require("node-red");

describe("test APRS Nodes", () => {
  beforeEach((done) => helper.startServer(done));

  afterEach((done) => {
    helper.unload();
    helper.stopServer(done);
  });

  it("Should load APRS Config Node with credentials", (done) => {
    const flow = [{ id: "c1", type: "aprs config", name: "aprs config" }];
    const creds = {
      c1: { filter: "f/SUNSET/50", pass: "10xxx", user: "SUNSET" },
    };
    helper.load(APRSNode, flow, creds, () => {
      const c1 = helper.getNode("c1");
      // console.log(c1)
      c1.should.have.property("name", "aprs config");
      c1.should.have.property("credentials", {
        filter: "f/SUNSET/50",
        pass: "10xxx",
        user: "SUNSET",
      });
      done();
    });
  });

  it("Should serialize APRS position packet", (done) => {
    const txNode = {
      id: "n1",
      type: "aprs tx",
      name: "aprs tx node",
      aprsConfig: "confNode",
      port: 10101,
      server: "Server.test",
    };

    const helperNode = { id: "n2", type: "helper" };

    const confNode = {
      id: "confNode",
      type: "aprs config",
      name: "aprs config node",
      filter: "Filter.test",
      user: "User.test",
      name: "Name.test",
      pass: "Pass.test",
    };

    const testFlow = [txNode, confNode, helperNode];

    let creds = { confNode: confNode };

    helper.load(APRSNode, testFlow, creds, () => {
      const n1 = helper.getNode("n1");
      const testPayload = {
        unitTest: true,
        lat: 1.2,
        lon: 2.3,
        from: "TESTFROM",
        to: "TESTTO",
        comment: "Test Comment",
      };
      const testPacket =
        "TESTFROM>TESTTO,TCPIP*:!0112.00N/00218.00E0 Test Comment";

      n1.receive({ payload: testPayload });

      n1.on("call:warn", (call) => {
        let pl = {
          user: "User.test",
          pass: "Pass.test",
          server: "Server.test",
          port: 10101,
          timeOut: 20,
          unitTest: true,
          packet: testPacket,
        };
        call.should.be.calledWithExactly(pl);
        done();
      });
    });
  });

  it("Should serialize CWOP packet", (done) => {
    const txNode = {
      id: "n1",
      type: "aprs tx",
      name: "aprs tx node",
      aprsConfig: "confNode",
      port: 10101,
      server: "Server.test",
    };

    const helperNode = { id: "n2", type: "helper" };

    const confNode = {
      id: "confNode",
      type: "aprs config",
      name: "aprs config node",
      filter: "Filter.test",
      user: "User.test",
      name: "Name.test",
      pass: "Pass.test",
    };

    const testFlow = [txNode, confNode, helperNode];

    let creds = { confNode: confNode };

    helper.load(APRSNode, testFlow, creds, () => {
      const n1 = helper.getNode("n1");
      const testPayload = {
        unitTest: true,
        from: { call: "CALL", ssid: "6" },
        data: {
          latitude: 51.8355,
          longitude: 19.228,
          extension: { courseDeg: 239, speedMPerS: 1.543333332 },
          weather: {
            windGust: 4.4704,
            temperature: 5.555555555555555,
            rain1h: 0,
            rain24h: 2.794,
            rainSinceMidnight: 2.794,
            pressure: 996.9,
            humidity: 83,
            luminosity: 0,
          },
          comment: "Node-RED WX Station",
          timestamp: "2021-01-23T18:21:00.000Z",
        },
      };
      const testPacket =
        "CALL-6>APYSNR,TCPIP*:@231821z5150.13N/01913.68E_239/003g010t042r000p011P011b09969h83L000Node-RED WX Station";

      n1.receive({ payload: testPayload });

      n1.on("call:warn", (call) => {
        let pl = {
          user: "User.test",
          pass: "Pass.test",
          server: "Server.test",
          port: 10101,
          timeOut: 20,
          unitTest: true,
          packet: testPacket,
        };
        call.should.be.calledWithExactly(pl);
        done();
      });
    });
  });

  it("Should serialize shorthand CWOP packet", (done) => {
    const txNode = {
      id: "n1",
      type: "aprs tx",
      name: "aprs tx node",
      aprsConfig: "confNode",
      port: 10101,
      server: "Server.test",
    };

    const helperNode = { id: "n2", type: "helper" };

    const confNode = {
      id: "confNode",
      type: "aprs config",
      name: "aprs config node",
      filter: "Filter.test",
      user: "User.test",
      name: "Name.test",
      pass: "Pass.test",
    };

    const testFlow = [txNode, confNode, helperNode];

    let creds = { confNode: confNode };

    helper.load(APRSNode, testFlow, creds, () => {
      const n1 = helper.getNode("n1");
      const testPayload = {
        unitTest: true,
        latitude: 51.8355,
        longitude: 19.228,
        extension: { courseDeg: 239, speedMPerS: 1.543333332 },
        weather: {
          windGust: 4.4704,
          temperature: 5.555555555555555,
          rain1h: 0,
          rain24h: 2.794,
          rainSinceMidnight: 2.794,
          pressure: 996.9,
          humidity: 83,
          luminosity: 0,
        },
        comment: "Node-RED WX Station",
        timestamp: "2021-01-23T18:21:00.000Z",
      };
      const testPacket =
        "User.test>APYSNR,TCPIP*:@231821z5150.13N/01913.68E_239/003g010t042r000p011P011b09969h83L000Node-RED WX Station";

      n1.receive({ payload: testPayload });

      n1.on("call:warn", (call) => {
        let pl = {
          user: "User.test",
          pass: "Pass.test",
          server: "Server.test",
          port: 10101,
          timeOut: 20,
          unitTest: true,
          packet: testPacket,
        };
        call.should.be.calledWithExactly(pl);
        done();
      });
    });
  });

});
