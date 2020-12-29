const { remote } = require('electron');
const { join } = require('path');
const { BrowserWindow } = remote;

/*STARTING A BROWSER TO VIEW ELECTIONS RESULTS*/

let view;

exports.view = () => {
  return view;
};

exports.initialize = (bounds) => {
  view = new BrowserWindow({
    parent: remote.getCurrentWindow(),
    frame: false,
    resizable: false,
    maximizable: false,
    show: false,
    fullscreenable: false,
    acceptFirstMouse: true,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  view.webContents.session.protocol.registerFileProtocol(
    'assets',
    (req, cb) => {
      const url = req.url.replace(new URL(req.url).protocol, '');
      if (url.includes('..')) {
        cb(join(__dirname, '../election/california'));
      } else {
        cb(join(__dirname, '../election/election_results'));
      }
    },
    () => {}
  );
};

view.webContents.on('console-message', (e, level, message) => {
  console.log('search window says:', message);
});

const address = require('url').format({
  pathname: join(__dirname, '../election/president_results'),
  protocol: 'file:',
  slashes: true
});

view.loadURL(address);
view.on('blur', () => view.hide());
return view;

exports.show = (text, bounds) => {
  view.setBounds(bounds);
  view.showInactive();
  view.webContents.send('update', text);
};

exports.hide = () => {
  view.hide;
};

exports.close = () => {
  view.close();
  view = null;
};
