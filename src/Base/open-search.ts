import { Client } from "@opensearch-project/opensearch";

const indexConfig = {
  settings: {
    number_of_shards: 1,
    number_of_replicas: 1,
  },
  mappings: {
    properties: {},
  },
};

export class OpenSearch {
  private client: Client;
  constructor() {
    this.client = this.createClient();
  }

  public async createIndex(indexName: string) {
    try {
      const exists = await this.client.indices.exists({ index: indexName });
      if (exists.body) {
        console.log(`Index ${indexName} already exists`);
      } else {
        const response = await this.client.indices.create({
          index: indexName,
          body: indexConfig,
        });
        console.log("Index created:", response);
      }
    } catch (error) {
      console.error("Error creating index:", error);
    }
  }

  public async addDoc(indexName: string, document: any) {
    try {
        const response = await this.client.index({
          index: indexName,
          body: document,
        });
        console.log("Document added:", response.body._id);
    } catch (error) {
      console.error("Error adding documents:", error);
    }
  }

  private createClient() {
    return new Client({
      node: "http://localhost:9200",
    });
  }
}
