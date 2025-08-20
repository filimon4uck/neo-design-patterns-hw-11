import { AbstractHandler } from "../AbstractHandler";
import { AccessLogRecord } from "../../models/DataRecord";

const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export class IpValidator extends AbstractHandler {
  protected process(record: AccessLogRecord): AccessLogRecord {
    const ip = record.ip.trim();
    if (ip === "" || !ipv4Regex.test(ip)) {
      throw new Error("Ip invalid");
    }
    return record;
  }
}
