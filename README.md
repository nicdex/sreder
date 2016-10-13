# SR&EDER

An opensource SR&ED process/time capture system

![SREDER](Shredder.png)

## Requirements

* [nodejs](https://nodejs.org) v4.5+
* [GoES](http://github.com/nicdex/goes) to store events.
    * Automatically installed in `.deps\goes` with `npm install`

## Requirements to compile native NodeJS modules (i.e. zmq).

### Windows

* windows-build-tools npm package installed
    * npm install --global windows-build-tools (**IMPORTANT: must be run as Administrator**)
* npm config set msvs_version 2015 (run as your user)

This step can be skipped if you can already compile native nodejs modules on your computer.
windows-build-tools is a helper package that will install all requirements for Windows, see [node-gyp](https://www.npmjs.com/package/node-gyp) for details

### Linux

* build-essential distribution package installed
    * sudo apt-get install build-essential

### Mac OSX

**TODO**

## Getting Started

### Install modules

`npm install`

### Start the event store

Windows: `start .deps\goes\bin\goes.exe`
Linux: `.deps/goes/bin/goes > goes.log &`

### Start app

`npm start`
