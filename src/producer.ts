import EventSource from "eventsource";
import { ProducerFactory } from "./Base/producer";

const url = "https://stream.wikimedia.org/v2/stream/recentchange";
const eventSource = new EventSource(url);

eventSource.onopen = () => {
  console.info("Opened connection.");
};
eventSource.onerror = (event) => {
  console.error("Encountered error", event);
};
eventSource.onmessage = async(event) => {
  const data = JSON.parse(event.data);
  console.log(data);
  const producer = new ProducerFactory()
  await producer.start()
  await producer.onMessage(data)
};
