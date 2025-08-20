import { AbstractHandler } from "../AbstractHandler";
import { AccessLogRecord } from "../../models/DataRecord";

export class UserIdValidator extends AbstractHandler {
  protected process(record: AccessLogRecord): AccessLogRecord {
    const userId = record.userId?.trim()
    if (!userId) throw new Error("User id is empty")
    return record
    
  }
}
