import { processingRequest } from "../backend-route/task";

export default function useCategory(){

  // task crete
  const store = async (payload) => {
    return await processingRequest({
      routeName: 'tasks.store',
      method: 'post',
      payload
    });
  }

  // task category update 
  const update = async (task,destinationId) => {
    return await processingRequest({
      routeName: 'tasks.update',
      method: 'put',
      params: { taskId: task.id},
      payload: {category_id : destinationId}
    });
  }

  return {
    store,
    update
  }
}
