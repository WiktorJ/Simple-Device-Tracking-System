# Simple-Device-Tracking-System
The Simple-Device-Tracking-System is an application built for tracking mobile devices using GPS signals. This project contains:
 1. An Android app that allows a device to send its GPS locations to a web server.
 2. A web server, which stores all the data and provides an API to read them.
 3. A web client, which provides a possibility to monitor positions of devices on a map in real time.

Maps and localization services are provided by the Google API.
  
This project has been created within the Internet Applications Technologies classes held at the AGH University of Science and Technology, Cracow.

## Installation

### Web server
The web server is a Node.js application. To install and run it locally, type following commands:
```
npm install
npm start
```
Now type in your web browser: 
```
http://localhost:3000
``` 
The server is running there.

### Web client
The web client is an AngularJS application. To install and run it, type the following command:
```
npm start
```
Now type in your web browser: 
```
http://localhost:8000
```
The client-side web application is running there. Please note that the `npm start` script executes `npm install` and `bower install` commands. You don't have to call them explicitly.

Note that if you are building on a Windwos OS and the `npm install` command gives you an error, you need to have at least MS Visual C++ Build Tools installed.

### Android application
Android application has been created using the Android Studio development tool, so we encourage you to run or emulate this application using the same environment. However the way of running a mobile client is up to you.

## Documentation

### Web server
The web server documentation is written using the JSDoc library. In order to generate docs, please enter the server repository and type:
```
jsdoc -c conf.json -r
```
If you didn't install the JSDoc globally, please specify an explicit path to the JSDoc executable in project files.

### Web client
The web client documentation is written using the JSDoc library, too. In order to generate docs, please type:
```
cd Web-Client
jsdoc -c conf.json -r
```
If you didn't install the JSDoc globally, please specify an explicit path to the JSDoc executable in project files.

