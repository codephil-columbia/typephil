const {app, BrowserWindow} = require('electron')    
const path = require('path')

function createWindow () {   
  // Create the browser window.     
	win = new BrowserWindow(
		{
			width: 1200, 
			height: 900,
			minWidth: 1200,
			minHeight: 900
			icon:__dirname + './favicon.ico'
		}
	) 
       
	// and load the index.html of the app.     
	// win.loadFile('index.html')
	//win.loadURL('http://localhost:3000/selectGames')   
	win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
}   

app.on('ready', createWindow)
