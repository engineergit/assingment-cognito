let db: any = [];

export function addData(payload: any) {
  console.log(db);
  db = [payload, ...db];
}

export function getData(): any {
  console.log(db);
  return db;
}
