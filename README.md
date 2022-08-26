node-red-contrib-aprs
======================

[Node-RED](https://www.nodered.org) Nodes for sending & receiving [APRS](http://www.aprs.org/) from 
the [APRS-IS](http://www.aprs-is.net/) and [CWOP](http://www.wxqa.com/) networks.

Received APRS Frames are parsed using [aprs-parser](https://github.com/adriann0/npm-aprs-parser) 
and output as `msg.payload` JSON. See Node Help for more information.

Special thansk to Jan Janak OK2JPR for adding CWOP and APRS TX support!

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

```bash
cd ~/.node-red
npm i node-red-contrib-aprs
```

# Copyrights

* aprs.js is Copyright 2022 Greg Albrecht
* cwop.js is Copyright 2021 Jan Janak
* <p><a href="http://www.aprs.org">Automatic Packet Reporting System (APRS)</a> is Copyright Bob Bruninga WB4APR (SK)</p>

# Contributors

* Greg Albrecht W2GMD
* Jan Janak OK2JPR

# License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
