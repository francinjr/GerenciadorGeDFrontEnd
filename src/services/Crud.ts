import apiClient from "./config";

class Crud {
  listarTodos(endPoint: string): Promise<any> {
    console.log(endPoint);
    return apiClient.get(endPoint);
  }

  buscar(endPoint: string, id: number): Promise<any> {
    console.log(`${endPoint}/${id}`);
    return apiClient.get(`${endPoint}/${id}`);
  }

  adicionar(endPoint: string, data: any): Promise<any> {
    console.log(endPoint);
    return apiClient.post(endPoint, data);
  }

  atualizar(endPoint: string, id: number, data: any): Promise<any> {
    console.log(`${endPoint}/${id}`);
    return apiClient.put(`${endPoint}`, data);
  }

  deletar(endPoint: string, id: number): Promise<any> {
    console.log(`${endPoint}/${id}`);
    return apiClient.delete(`${endPoint}/${id}`);
  }
}

export default new Crud();
