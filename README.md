# node-red-contrib-aprs

![APRS TX Example](img/screenshot-tx-example.png)

[Node-RED](https://www.nodered.org) Nodes for communicating with [APRS](http://www.aprs.org/)
using the [APRS-IS](http://www.aprs-is.net/) or Citizen Weather Observer Program (NOAA MADIS)
[CWOP](http://www.wxqa.com/) networks.

Received APRS Frames are parsed using [aprs-parser](https://github.com/adriann0/npm-aprs-parser)
and output as `msg.payload` JSON. See Node Help for more information.

Special thanks to Jan Janak OK2JPR for adding CWOP and APRS TX support!

Check me out in the [Node-RED Library](https://flows.nodered.org/node/node-red-contrib-aprs).

[Documentation is available here](http://node-red-contrib-aprs.rtfd.io/)

# License & Copyright

- <p><a href="http://www.aprs.org">Automatic Packet Reporting System (APRS)</a> is Copyright Bob Bruninga WB4APR (SK)</p>

Copyright Greg Albrecht and other contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
