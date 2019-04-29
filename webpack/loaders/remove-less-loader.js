module.exports = function(resource) {
  // import chasingDotsLess from './spin/chasing-dots.less';
  const nameLessReg = /import ([a-zA-Z]+) from '[a-zA-Z\/\.\-]+.less';/g
  const lessReg = /import '[a-zA-Z\/\.\-]+.less';/g
  if (nameLessReg.test(resource)) {
    return resource.replace(nameLessReg, 'var $1 = {};')
  }
  if (lessReg.test(resource)) {
    return resource.replace(lessReg, '')
  }
  return resource
}
