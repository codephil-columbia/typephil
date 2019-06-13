[![Build Status](https://travis-ci.org/codephil-columbia/typephil.svg?branch=master)](https://travis-ci.org/codephil-columbia/typephil)

[TypePhil](typephil.org) can be run locally:

<!-- 1. Get [lavazares](https://github.com/codephil-columbia/lavazares)
2. `go run main.go`
3. Optionally, `sass --watch styles/`
4. `npm start` -->

# Running the app 
Whether or not Typephil runs in online or offline mode is dependent on the `REACT_APP_ENV` variable 
in the `.env` file that gets set when the application runs. Note that if you change this value you have to rerun the app, it will not register a change via normal react hotreload. 

## Offline Version 
The offline version does not require internet connection or a database, so all information gets stored inside 
Chrome's [LocalStorage DB](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). You can see the contents of the DB by opening up the Developer tools, clicking on the 
`Application` tab, and click on the `Local Storage` tab. Most of the DB bootstrapping is done within `index.js`. It is important to note that if you are swapping between testing the offline and online version it is really important you click on the `Clear Storage` tab in the Application pane of the Developer tools to make sure you bootstrap the offline application properly.
In order to add a field inside Local Storage, add a field into 
`initLocalStorage` inside of `index.js`. Local Storage only stores strings, so it is important that you stringify/de-stringify all the values that come in and out. There exists utility functions inside of `services` that can help you automatically to serialization/deserialization when working with objects.

## Online version
The online version requires `Lavazares` to already be running, and of course requires an internet connection.

## Services 
(todo)