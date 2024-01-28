exports.checkUserExist = (userId, food) => {
  return food.reviews.some(
    (item) => item.name.toString() === userId.toString()
  );
};
