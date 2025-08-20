import { DataRecord } from "../../models/DataRecord";
import * as fs from "fs/promises";

export class RejectedWriter {
  private lines: string[] = [];
  write(record: DataRecord, error: string) {
    this.lines.push(JSON.stringify({ record :record, error:error }))
  }
  async finalize() {
    const content = this.lines.map(line => line + "\n").join("");
    await fs.writeFile("src/output/rejected.jsonl", content, {flag:"w"} )
  }
}
