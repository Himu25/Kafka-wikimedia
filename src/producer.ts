import EventSource from "eventsource";
import { ProducerFactory } from "./Base/producer";

const url = "https://stream.wikimedia.org/v2/stream/recentchange";
const eventSource = new EventSource(url);
const topic = "wikimedia-message"
const producer = new ProducerFactory(topic);

eventSource.onopen = async() => {
  console.info("Opened connection.");
  await producer.start();
};

eventSource.onerror = async(event) => {
  console.error("Encountered error", event);
  await producer.shutdown()
};

eventSource.onmessage = async(event) => {
  const data = JSON.parse(event.data);
  console.log(data);
  await producer.onMessage(data)
};


