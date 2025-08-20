import * as fs from "fs/promises";
import { buildAccessLogChain } from "./chain/chains/AccessLogChain";
import { buildTransactionChain } from "./chain/chains/TransactionChain";
import { buildSystemErrorChain } from "./chain/chains/SystemErrorChain";
import { ProcessingMediator } from "./mediator/ProcessingMediator";
import { AccessLogWriter } from "./mediator/writers/AccessLogWriter";
import { TransactionWriter } from "./mediator/writers/TransactionWriter";
import { ErrorLogWriter } from "./mediator/writers/ErrorLogWriter";
import { RejectedWriter } from "./mediator/writers/RejectedWriter";
import { DataRecord } from "./models/DataRecord";

const handlerMap = {
  access_log: buildAccessLogChain,
  transaction: buildTransactionChain,
  system_error: buildSystemErrorChain,
};

async function main() {
  const recordsJson = await fs.readFile("src/data/records.json", "utf-8");
  const records: DataRecord[] = JSON.parse(recordsJson);

  console.log(`[INFO] Завантажено записів: ${records.length}`);

  let successCount = 0;
  let rejectedCount = 0;

  const accessLogWriter = new AccessLogWriter();
  const transactionWriter = new TransactionWriter();
  const errorLogWriter = new ErrorLogWriter();
  const rejectedWriter = new RejectedWriter();

  const mediator = new ProcessingMediator(
    accessLogWriter,
    transactionWriter,
    errorLogWriter,
    rejectedWriter
  );

  for (const record of records) {
    const buildChain = handlerMap[record.type as keyof typeof handlerMap];

    if (!buildChain) {
      mediator.onRejected(record, `Not found record type: ${record.type}`);
      rejectedCount++;
      continue;
    }

    const handler = buildChain();

    try {
      handler.handle(record);
      mediator.onSuccess(record);
      successCount++;
    } catch (err: any) {
      mediator.onRejected(record, err.message ?? String(err));
      rejectedCount++;
    }
  }

  await mediator.finalize();

  console.log(`[INFO] Успішно оброблено: ${successCount}`);
  console.log(`[WARN] Відхилено з помилками: ${rejectedCount}`);
  console.log(`[INFO] Звіт збережено у директорії output/`);
}
main()