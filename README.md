### About

An attempt to teach myself React, Redux and Electron

### Desktop App to search and download YouTube videos
<div style="float:left">
<img src="https://i.imgur.com/Bj6jZ2k.png" width="300">

<img src="https://i.imgur.com/qOfSE9Q.png" width="300">

<img src="https://i.imgur.com/DMw7Q1T.png" width="300">

<img src="https://i.imgur.com/LSnoz77.png" width="300">


</div>

### Built on

 - [Electron](https://github.com/electron/electron) - Build cross platform desktop apps with JavaScript, HTML, and CSS 
 - [React](https://github.com/facebook/react) - A declarative, efficient, and flexible JavaScript library for building user interfaces.
 - [material-ui](https://github.com/mui-org/material-ui) - React components that implement Google's Material Design
 - [electron-react-redux-boilerplate](https://github.com/jschr/electron-react-redux-boilerplate)

With help from
 - [ytdl-core](https://github.com/fent/node-ytdl-core)
 - [electron-config](https://github.com/sindresorhus/electron-store)
 - [react-redux-loading-bar](https://github.com/mironov/react-redux-loading-bar)
 - [react-youtube](https://github.com/troybetz/react-youtube)
 - [simple-youtube-api](https://github.com/HyperCoder2975/simple-youtube-api)

### Enhancements
 - [x] Search, Preview and Download Videos
 - [x] Download multiple videos at once
 - [x] Port to [electron-react-redux-boilerplate](https://github.com/jschr/electron-react-redux-boilerplate) for easier builds
 - [x] Create Linux executable
 - [x] Open Downloads folder in file explorer, browse to download directory
 - [x] Indicate download progress
 - [x] Electron application icon implementation

 ### Future feature ideas
 - [ ] Offline mode
 - [ ] Option to download Audio Only
 - [ ] Option to select video download quality
 - [ ] Display recent searches
 - [ ] Congiure search results count
 
 
 

### Mac and Windows Binaries

[Mac, Windows and Linux binaries](https://github.com/vanzylv/youtube-downloader-electron/releases/)

### Install and Run

```bash
git clone https://github.com/vanzylv/youtube-downloader-electron.git
cd youtube-downloader-electron
```

Update the app/config.js file with your youtube api key

```bash
npm install
npm run develop
```

### License
[MIT License](LICENSE)

 
 