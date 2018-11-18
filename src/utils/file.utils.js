const fs = require('fs');
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;

/**
 * Checks if a file path is readable or not
 *  INFO: Using sync in general is not recommended
 *  But doing in sync is very important here as it is for intial user input
 *  I was relying on exists till the time I remember. Realized it is deprecated now.
 * @param {*} path 
 * @param {*} runSync 
 */
function isReadablePath(path, runSync) {

  if (runSync) {
    try {
      fs.accessSync(path, fs.constants.R_OK)
      return true;
    } catch (err) {
      console.error('Error while reading the file\n', path, err);
      return false;
    }
  }

  return new Promise((resolve, reject) => {
    fs.access(file, fs.constants.R_OK, (err) => {
      if (err) {
        console.error('Error while reading the file\n', path, err);
      }
      return resolve(!err);
    });
  });
}

/**
 * Checks a file whether readable or not in a synchronous manner
 *  Usually this will be used during the application start 
 *  when the file's existence is a must for starting the application
 * @param {*} path 
 */
function isReadablePathSync(path) {
  return isReadablePath(path, true);
}

/**
 * Write the contents to a file in filepath.
 * This will create the file
 * @param {*} filePath 
 * @param {*} contents 
 * @param {*} cb 
 */
function saveToFile(filePath, contents, cb) {

  if (!contents || !filePath) {
    throw new Error('Incomplete details to save to a file');
  }

  if (!cb) {
    cb = err => err
      ? console.error(`Error writing to file ${filePath}`)
      : console.log(`Successfully written to file ${filePath}`)
  }

  mkdirp(getDirName(filePath), function (err) {
    if (err) return cb(err);

    fs.writeFile(filePath, contents, cb);
  });
}

module.exports = {
  isReadablePathSync,
  saveToFile
};