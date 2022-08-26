node-red-contrib-aprs
======================

[Node-RED](https://www.nodered.org) Nodes for connecting to a read-only 
[APRS-IS WebSocket](http://www.aprs-is.net/Connecting.aspx) using a 
[reconnecting WebSocket](https://github.com/pladaria/reconnecting-websocket). 
Received APRS Frames are parsed using [aprs-parser](https://github.com/adriann0/npm-aprs-parser) 
and output as `msg.payload` JSON.

Install
-------

Run the following command in your Node-RED user directory - typically `~/.node-red`

```bash
npm install node-red-contrib-aprs
```

# Copyright

aprs.js is Copyright 2022 Greg Albrecht
cwop.js is Copyright 2021 Jan Janak

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
