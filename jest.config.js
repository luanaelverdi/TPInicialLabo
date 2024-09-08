module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: [
      "/node_modules/" // Evita que Jest ignore los archivos en node_modules si es necesario
    ]
  };