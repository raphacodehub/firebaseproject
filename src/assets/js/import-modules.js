const { ipcRenderer, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { exec } = require('child_process');