import { SystemErrorRecord } from "../../models/DataRecord";
import * as fs from "fs/promises";

export class ErrorLogWriter {
  private lines: string[] = [];
  write(record: SystemErrorRecord) {
    this.lines.push(JSON.stringify(record))
  }
  async finalize() {
    const content = this.lines.map(line => line + "\n").join("");
    await fs.writeFile("src/output/errors.jsonl", content, {flag:"a"})
  }
}
