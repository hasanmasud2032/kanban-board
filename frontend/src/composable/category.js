import { processingRequest } from "../backend-route/category";

export default function useCategory(){

  const getCategories = async () => {
    try {
      const response = await processingRequest({
        routeName: 'categories.index',
        method: 'get',
      });

      return response.data;
      
    } catch (error) {
      console.log('error',error)
    }
  }

  return {
    getCategories,
  }
}
