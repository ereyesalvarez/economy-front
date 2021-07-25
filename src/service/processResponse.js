export function processResponse(value){
  if(value == null){
    return []
  }
  return value.data;
}
