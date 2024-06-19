import { Consumer, ConsumerSubscribeTopics, EachMessagePayload, Kafka,Message } from "kafkajs";
import { OpenSearch } from "./open-search";

export class ConsumerFactory {
  private consumer: Consumer;
  constructor() {
    this.consumer = this.createConsumer();
  }

  public async startConsumer(): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: ["wikimedia-message"],
      fromBeginning: true,
    };

    try {
      await this.consumer.connect();
      await this.consumer.subscribe(topic);
        const indexName = "wikimedia-index";
        const db = new OpenSearch()
        await db.createIndex(indexName)

      await this.consumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload;
          await db.addDoc(indexName,message.value)
        //   const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        //   console.log(`- ${prefix} ${message.key}#${message.value}`);
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  createConsumer(): Consumer {
    const kafka = new Kafka({
      clientId: "consumer-client",
      brokers: ["127.0.0.1:9092"],
    });
    return kafka.consumer({ groupId: "consumer-group" });
  }
}