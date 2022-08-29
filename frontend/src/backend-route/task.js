import { getUrl, sendRequest } from './route';

const routerList = [
  {
    path: 'tasks',
    name: 'tasks.store',
  },
  {
    path: 'tasks/:taskId',
    name: 'tasks.update',
  },
]

export function processingRequest(object){
  return sendRequest(getUrl(routerList, object), object);
} 



