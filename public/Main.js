const {app, BrowserWindow} = require('electron')      
function createWindow () {   
  // Create the browser window.     
	win = new BrowserWindow(
		{
			width: 1200, 
			height: 900,
			minWidth: 1200,
			minHeight: 900
		}
	) 
       
	// and load the index.html of the app.     
	// win.loadFile('index.html')
	win.loadURL('http://localhost:3000/selectGames')   
}   

app.on('ready', createWindow)