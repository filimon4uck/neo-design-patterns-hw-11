import { AbstractHandler } from "../AbstractHandler";
import { SystemErrorRecord } from "../../models/DataRecord";

export class MessageTrimmer extends AbstractHandler {
  protected process(record: SystemErrorRecord): SystemErrorRecord {
    const trimmed = record.message.trim();

    if (!trimmed) {
      throw new Error("Message is empty!");
    }

    return {
      ...record,
      message: trimmed.length > 256 ? trimmed.slice(0, 256) : trimmed,
    };
  }
}
