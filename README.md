# Simple-Device-Tracking-System
Project connected to Web Applications Technology course.

Project contains:
 1. Simple Android app that allow device to send its localization to server.
 2. Server stores all data and provide endpoints to read them.
 3. Web Client provides possibility to monitor position of devices in real time.


Maps and localization are provided by Google API.

# Installation

## Web server
Web server is a Node.js application. To install and run it locally, type following commands:
```
npm install
npm start
```
Now type in your web browser: ```localhost:3000```. The server is running there.

Please note that server-side code is also deployed on [Heroku](https://devices-tracking-server.herokuapp.com/).

## Web client
Web client is an AngularJS application. To install and run it, type following command:
```
npm start
```
Now type in your web browser: ```localhost:8000```. The client-side web application is running there. Please note that
```npm start``` script executes: ```npm install``` and ```bower install``` commands. You don't have to call these commands explicitly.

Note that if you are building on Windwos OS and ```npm install``` command gives you an error, you need have installed at least MS Visual C++ Build Tools.

## Android application
Android application has been created using Android Studio development tool, so we encourage to run or emulate this application using
Android Studio too. However the way of running mobile client is usually up to you.

# Documentation

## Web Client documentation.
Web Client documentation is written using JSDoc library. In order to generate docs, please type:
```
cd Web-Client
jsdoc -c conf.json -r
```
If you didn't install JSDoc globally, please specify explicit path to JSDoc executable.
