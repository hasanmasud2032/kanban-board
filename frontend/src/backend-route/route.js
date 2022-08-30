import AXIOS from "../setting/axios";

export const getUrl = (routeList, {routeName, params, queryString}) => {
  let url = routeList.find(route => route.name === routeName)?.path

  if(!url)
    throw {message: 'Invalid Url', code:404};

    for(const param in params)
       url = url.replace(`:${param}`,params[param])

    if(queryString)
    {
        url = url.concat('?'+new URLSearchParams(queryString).toString())
    }

  return url;
}

export const sendRequest = (url, {method, payload = null}) => {
 return  payload ? AXIOS[method.toLowerCase()](url, payload) : AXIOS[method.toLowerCase()](url) 
}



