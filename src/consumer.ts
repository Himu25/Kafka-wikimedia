import { ConsumerFactory } from "./Base/consumer";
import { OpenSearch } from "./Base/open-search";

async function run() {
//   const client = new OpenSearch()
//   await client.createIndex("himu")
const consumer = new ConsumerFactory();
await consumer.startConsumer()

}

run();
