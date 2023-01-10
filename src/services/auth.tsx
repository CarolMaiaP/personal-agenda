export function getAuthUser(){
  const tokenType = localStorage.getItem("tokenType")
  const accessToken = localStorage.getItem("accessToken")

  const headers = {
    Authorization: `${tokenType} ${accessToken}`
  }

  return { headers }
}