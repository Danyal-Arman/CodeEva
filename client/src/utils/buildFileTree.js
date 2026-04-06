const buildFileTree = (files, parentId = null) => {
  const filterValue = files?.filter(
    (file) => String(file.parent) === String(parentId),
  );
  const tree = filterValue?.map((file) => ({
    ...file,
    Children: buildFileTree(files, file._id),
  }));
  return tree;
};
export default buildFileTree;
