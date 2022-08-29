import { getUrl, sendRequest } from './route';

const routerList = [
  {
    path: 'categories',
    name: 'categories.index',
  },
]


export function processingRequest(object){
  return sendRequest(getUrl(routerList, object), object);
} 



