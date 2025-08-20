import { AbstractHandler } from "../AbstractHandler";
import { TransactionRecord } from "../../models/DataRecord";

export class CurrencyNormalizer extends AbstractHandler {
  protected process(record: TransactionRecord): TransactionRecord {
    const {currency} = record
    if (typeof currency !== "string" || currency.trim()=== "")throw new Error("Currency incorrect")
    
    return { ...record, currency: String(currency).toUpperCase()}
  }
}
