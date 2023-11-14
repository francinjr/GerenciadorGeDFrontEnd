import apiClient from "./config";

class GanhosAPI {
  listarTodos(): Promise<any> {
    return apiClient.get("/ganhos");
  }

  buscar(id: number): Promise<any> {
    return apiClient.get(`/ganhos/${id}`);
  }

  adicionar(data: any): Promise<any> {
    return apiClient.post("/ganhos", data);
  }

  atualizar(id: number, data: any) {
    return apiClient.put(`/ganhos/${id}`, data);
  }

  deletar(id: number): Promise<any> {
    return apiClient.delete(`/ganhos/${id}`);
  }
}

export default new GanhosAPI();