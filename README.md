# Simple-Device-Tracking-System
Project connected to Web Applications Technology course.

Project contains:
 1. Simple Android app that allow device to send its localization to server.
 2. Server stores all data and provide endpoints to read them.
 3. Web Client provides possibility to monitor position of devices in real time.


Maps and localization are provided by Google API.

# Installation

## Web server
Web server is a Node.js application. To install and run it, type following commands:
```
npm install
node app.js
```

## Web client
Web client is an AngularJS application. To install it, type following commands:
```
npm install
bower install

```
To run client application, open an ```index.html``` file in your web browser. After successful run, on the console should be
visible "Client application started successfully." log.

Note that if you are building on Windwos OS and ```npm install``` command gives you an error, you need have installed at least MS Visual C++ Build Tools.

## Android application
