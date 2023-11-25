import apiClient from "./config";
import type GanhoInterface from "@/types/GanhoInterface";

class GanhosAPI {
  listarTodos(): Promise<any> {
    return apiClient.get("/ganhos");
  }

  buscar(id: number): Promise<any> {
    return apiClient.get(`/ganhos/${id}`);
  }

  adicionar(data: GanhoInterface): Promise<any> {
    return apiClient.post("/ganhos", data);
  }

  atualizar(id: number, data: GanhoInterface) {
    return apiClient.put(`/ganhos/${id}`, data);
  }

  deletar(id: number): Promise<any> {
    return apiClient.delete(`/ganhos/${id}`);
  }
}

export default new GanhosAPI();