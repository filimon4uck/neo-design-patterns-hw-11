# 📢 Design Patterns – Homework 11: Chain of Responsibility & Mediator
This is a homework assignment for the Design Patterns course.

---

## ✨ Description
The goal of this homework is to implement a data processing system that uses the **Chain of Responsibility** and **Mediator** design patterns.

The system reads an array of JSON records, validates and processes them, and stores the results in the appropriate files based on their type. Errors during processing are recorded in a rejected file.

The system supports three types of records:
- `access_log` → validates timestamp, userId, ip; stores in `output/access_logs.json`.
- `transaction` → validates timestamp, parses amount to number, normalizes currency; stores in `output/transactions.csv`.
- `system_error` → validates timestamp, level, trims message; stores in `output/errors.jsonl`.

Invalid records are stored in `output/rejected.jsonl`.

---

## 🛠 Features

### Chain of Responsibility
Each record type has a dedicated chain of handlers:
- **AccessLogChain**: TimestampParser → UserIdValidator → IpValidator
- **TransactionChain**: TimestampParser → AmountParser → CurrencyNormalizer
- **SystemErrorChain**: TimestampParser → LevelValidator → MessageTrimmer

Handlers implement the `AbstractHandler` class, which allows chaining multiple processors. Each handler validates or transforms the record and throws an error if validation fails.

### Mediator
The `ProcessingMediator` centralizes saving processed records to the appropriate output files:
- `AccessLogWriter` → JSON array
- `TransactionWriter` → CSV file
- `ErrorLogWriter` → JSONL file
- `RejectedWriter` → JSONL file for rejected records

Mediator handles `onSuccess(record)` and `onRejected(record, error)` methods. All writers finalize the files at the end using `await mediator.finalize()`.

### Error Handling
- Invalid records are captured and saved in `output/rejected.jsonl` with an explanation.
- Processing continues for other records despite errors.

---

## 🧩 Design Patterns

- **Chain of Responsibility**: Each handler processes the record or passes it to the next handler.
- **Mediator**: Centralizes coordination of storing successful and rejected records, decoupling chains from output logic.

---

## 📁 File Structure
```
/
├── data/
│   └── records.json            # Input JSON records
├── chain/
│   ├── AbstractHandler.ts      # Base class for chain handlers
│   ├── handlers/               # Individual validation/processing handlers
│   └── chains/                 # Chains for each record type
├── mediator/
│   ├── ProcessingMediator.ts   # Central mediator
│   └── writers/                # Writers for each output format
├── output/                     # Output files
├── models/
│   └── DataRecord.ts           # Type definitions for records
└── main.ts                     # Entry point
```

---

## ⚡ Usage

1. Install dependencies:
```bash
npm install
```

2. Ignore `node_modules/` by adding it to `.gitignore`.

3. Run the application:
```bash
npx ts-node main.ts
```

4. Output files will be created in the `output/` folder:
- `access_logs.json`
- `transactions.csv`
- `errors.jsonl`
- `rejected.jsonl`

The console will display a summary of processed and rejected records.

---

## ✅ Expected Output
- **access_logs.json**: JSON array of valid access_log records.
- **transactions.csv**: CSV with `timestamp,amount,currency` columns.
- **errors.jsonl**: JSONL with system_error records.
- **rejected.jsonl**: JSONL of rejected records with error messages.

Example:
```json
// rejected.jsonl
{"record":{"type":"transaction"},"error":"Missing required field 'amount'"}
{"record":{"type":"access_log","ip":"0.0.0.0"},"error":"Invalid userId"}
```

---

## 📚 Summary
This assignment demonstrates:
- Implementing **Chain of Responsibility** for structured record validation and processing.
- Using a **Mediator** to centralize output handling.
- Handling multiple data formats (JSON, CSV, JSONL) and rejected records.
- Structuring TypeScript code with modular handlers, chains, and writers.

