const fs = require('fs');
const fsExtra = require('fs-extra');
const resolve = require('path').resolve;
const join = require('path').join;
const cp = require('child_process');
const os = require('os');

const packageJson = 'package.json';
const initial = resolve(__dirname, '..', packageJson);

// get lambdas path
const lambdaPath = resolve(__dirname, '..', 'src', 'lambdas');

fs.readdirSync(lambdaPath)
  .forEach((eachFolder) => {
    const cwd = join(lambdaPath, eachFolder);
    const eachPathPackageJson = join(lambdaPath, eachFolder, packageJson);

    // copy to folder
    fsExtra.copySync(initial, eachPathPackageJson);

    // npm binary based on OS
    const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

    // install folder
    cp.spawn(npmCmd, ['i'], { env: process.env, cwd, stdio: 'inherit' });
  });
