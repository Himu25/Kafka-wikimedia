import { Kafka, Producer } from "kafkajs";

export class ProducerFactory {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  async start(): Promise<void> {
    try {
      await this.producer.connect();
      console.log("Producer connected successfully");
    } catch (error) {
      console.error("Error connecting the producer: ", error);
    }
  }

  async shutdown(): Promise<void> {
    try {
      await this.producer.disconnect();
      console.log("Producer disconnected successfully");
    } catch (error) {
      console.error("Error disconnecting the producer: ", error);
    }
  }

  async onMessage(message: any): Promise<void> {
    try {
      await this.producer.send({
        topic: "wikimedia-message",
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: "producer-client",
      brokers: ["127.0.0.1:9092"],
    });
    return kafka.producer();
  }
}
