import { TransactionRecord } from "../../models/DataRecord";
import * as fs from "fs/promises";

export class TransactionWriter {
  private lines: string[] = ["timestamp,amount,currency"];
  write(record: TransactionRecord) {
    const headers:(keyof TransactionRecord)[] = ["timestamp","amount","currency"]
    const contentLine = headers.map(header => String(record[header]));
    this.lines.push(contentLine.join(","))
  }
  async finalize() {
    const content = this.lines.join("\n") + "\n"
    await fs.writeFile("src/output/transactions.csv", content, { flag: "w" });
  }
}
