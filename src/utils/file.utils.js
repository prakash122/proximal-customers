const fs = require('fs');

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

module.exports = {
  isReadablePath
};