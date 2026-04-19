import { APIRequestContext, APIResponse } from "@playwright/test";
import { QAItemEdit, type QAItem } from "../models/qaIssue.model";

export class QAItemsClient {
  constructor(private request: APIRequestContext) {
    this.request = request;
  }

  async getQAItems(params?: Record<string, string | number | boolean>): Promise<APIResponse> {
    return await this.request.get("/api/qa-items", { params });
  }

  async getQAItem(id: string): Promise<APIResponse> {
    return await this.request.get(`/api/qa-items/${id}`);
  }

  async createItem(payload: QAItem): Promise<APIResponse> {
    return await this.request.post("/api/qa-items", {
      data: payload,
    });
  }

  async createItemRaw(payload: Record<string, unknown>) {
    return await this.request.post("/api/qa-items", {
      data: payload,
    });
  }

  async editItemById(id: string, payload: QAItemEdit): Promise<APIResponse> {
    return await this.request.patch(`/api/qa-items/${id}`, {
      data: payload,
    });
  }

  async deleteItemById(id: string): Promise<APIResponse> {
    return await this.request.delete(`/api/qa-items/${id}`);
  }
}
