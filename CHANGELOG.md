# node-red-contrib-aprs 2.2.0

Added TX node custom server & port support, available via node config UI.
- Server and port can also be set by passing `msg.payload.server` & `msg.payload.port`.
- Server default: APRS `rotate.aprs2.net`, CWOP `cwop.aprs.net`
- Port default: 14580

Added RX node custom URL support, also available via node config UI.

# node-red-contrib-aprs 2.1.3
Fixed #9: Aprs is not a constructor.

# node-red-contrib-aprs 2.1.0
- Added support for APRS TX of Position Packets.
- Refactored code to meet Node-RED recommended layout.

