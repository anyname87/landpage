var child_process = require('child_process');
var execFile = child_process.execFile;

var systemRoot = process.env.SYSTEMROOT;
if (systemRoot.length == 0){
  systemRoot = "c:\\windows";
}

function exec_command_chain(commandList) {
  if (commandList.length > 0) {
    var command = commandList.shift();
    console.log('executing command: '+ command);
    var child = execFile(systemRoot + '\\system32\\cmd.exe', ['/s', '/c', command],
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
    child.on('exit', function(code) {
      console.log('process '+ command +' exited with exit code: '+code);
      if (code == 0) {
        exec_command_chain(commandList);
      }
      else {
        setTimeout(function(){
          console.log('\nexiting with exit code: '+code);
          process.exit(code);
        }, 2000);
      }
    });
  }
}

exec_command_chain([
  'node -v', 
  'npm -v', 
  'npm install', 
  'node_modules\\.bin\\db-migrate.cmd up initial',
  'node createTestData.js'
]);
