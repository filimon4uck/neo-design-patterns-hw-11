import { AbstractHandler } from "../AbstractHandler";
import { DataRecord } from "../../models/DataRecord";

export class TimestampParser extends AbstractHandler {
  protected process(record: DataRecord): DataRecord {
    const { timestamp } = record;

    if (timestamp === undefined || timestamp === null || String(timestamp).trim() === "") {
      throw new Error("Timestamp is missing!");
    }

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      throw new Error("Invalid timestamp format!");
    }

    return {
      ...record,
      timestamp: date.toISOString(),
    };
  

  }
}
