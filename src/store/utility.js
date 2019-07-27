export default (oldObject, updatedObject) => {
  return {
    ...oldObject,
    ...updatedObject
  };
};
