import './codeql'

export default [{
  id: 'jupyterlab-codeql-highlight',
  autoStart: true,
  activate: function(app) {
    console.log('JupyterLab `jupyterlab-codeql-highlight` extension is activated!');
    console.log(app.commands);
    registerStataFileType(app);
  }
}];

function registerStataFileType(app) {
  app.docRegistry.addFileType({
    name: 'codeql',
    displayName: 'CodeQL',
    extensions: ['ql', 'qll'],
    mimeTypes: ['text/x-codeql'],
  });
}
