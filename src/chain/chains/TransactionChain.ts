import { TimestampParser } from "../handlers/TimestampParser";
import { AmountParser } from "../handlers/AmountParser";
import { CurrencyNormalizer } from "../handlers/CurrencyNormalizer";
import { AbstractHandler } from "../AbstractHandler";

export function buildTransactionChain(): AbstractHandler {
  const ts = new TimestampParser()
  const amount = new AmountParser()
  const cn = new CurrencyNormalizer()
  ts.setNext(amount).setNext(cn)
  return ts
}
