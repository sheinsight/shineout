module.exports = function(resource) {
  // import chasingDotsLess from './spin/chasing-dots.less';
  const nameLessReg = /import ([a-zA-Z]+) from '[a-zA-Z\/\.\-]+.less';/g
  const lessReg = /import '[a-zA-Z\/\.\-]+.less';/g
  if (nameLessReg.test(resource)) {
    resource = resource.replace(nameLessReg, 'var $1 = {};')
  }
  if (lessReg.test(resource)) {
    resource = resource.replace(lessReg, '')
  }
  return resource
}
