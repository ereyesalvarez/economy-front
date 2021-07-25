export default function (reason) {
  let errorMessage = "Generic error"
  if(reason == null){
    errorMessage = "Unknown error: No return"
  } else if(reason.response == null){
    errorMessage = "Unknown error: No response"
  } else if(reason.response.status === 401){
    return {
      errorMessage: "No autorizado",
      clearToken: true
    }
  } else if(reason.response.data === null){
    errorMessage = "Unknown error: No message"
  } else if(reason.response.data.message == null){
    errorMessage = reason.response.data
  } else {
    errorMessage = reason.response.data.message
  }
  return {
    errorMessage: errorMessage,
    clearToken: false
  }
}
