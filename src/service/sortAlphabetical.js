export default () => {
  var textA = a.DepartmentName.toUpperCase();
  var textB = b.DepartmentName.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}
