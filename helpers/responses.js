exports.notFound = (record, res) => {
  return res.status(404).json({
    success: false,
    message: `${record} not found!`
  });
}