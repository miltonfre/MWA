module.exports.sum = function (req, res) {
    const num1=parseInt(req.params.num1);
    const num2=parseInt(req.query.num2);
    const result=num1+num2;
    console.log(result);
    res.status(200).json({ 'data': result });
}