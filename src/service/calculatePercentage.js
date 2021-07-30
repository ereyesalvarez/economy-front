export default (part, total) => {
  if(total === 0) return 100
  return part / total * 100
}
