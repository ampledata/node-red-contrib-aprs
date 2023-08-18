## 3.0.0-beta1

- Added ReadTheDocs documentation site: https://node-red-contrib-aprs.rtfd.io/
- Added GitHub workflow actions (CI/CD).
- Updated metadata/copyright/docstrings.
- Ran everything through prettier.
- Fixes [#8](https://github.com/ampledata/node-red-contrib-aprs/issues/8): Missing examples.
- Fixes [#11](https://github.com/ampledata/node-red-contrib-aprs/issues/11): Default filter missing on RX node.
- Fixes [#15](https://github.com/ampledata/node-red-contrib-aprs/issues/15), [#12](https://github.com/ampledata/node-red-contrib-aprs/issues/12) & [#14](https://github.com/ampledata/node-red-contrib-aprs/issues/14): Parameter in APRS TX Node config.
- Fixes [#17](https://github.com/ampledata/node-red-contrib-aprs/issues/17): User & pass parameters in APRS Config Node credentials.
- Fixes [#18](https://github.com/ampledata/node-red-contrib-aprs/issues/18): Move APRS Nodes to 'network' category in palette.
- Fixes [#19](https://github.com/ampledata/node-red-contrib-aprs/issues/19): Add unit tests.

## 2.2.0

Added TX node custom server & port support, available via node config UI.

- Server and port can also be set by passing `msg.payload.server` & `msg.payload.port`.
- Server default: APRS `rotate.aprs2.net`, CWOP `cwop.aprs.net`
- Port default: 14580

Added RX node custom URL support, also available via node config UI.

## 2.1.3

Fixed #9: Aprs is not a constructor.

## 2.1.0

- Added support for APRS TX of Position Packets.
- Refactored code to meet Node-RED recommended layout.
