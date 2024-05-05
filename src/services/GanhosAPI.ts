import apiClient from "./config";
import type GanhoInterface from "@/types/FinanceInterface";

class GanhosAPI {
  listarTodos(): Promise<any> {
    return apiClient.get("api/finances/v1");
  }

  buscar(id: number): Promise<any> {
    return apiClient.get(`api/finances/v1/${id}`);
  }

  adicionar(data: GanhoInterface): Promise<any> {
    return apiClient.post("api/finances/v1", data);
  }

  atualizar(id: number, data: GanhoInterface) {
    return apiClient.put(`api/finances/v1/${id}`, data);
  }

  deletar(id: number): Promise<any> {
    return apiClient.delete(`/ganhos/${id}`);
  }
}

export default new GanhosAPI();