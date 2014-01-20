/*
 * GET Главная страница
 */
exports.index = function(req, res, next){
  res.render('index');
};
exports.catalog = function(req, res, next){
  res.render('catalog');
};