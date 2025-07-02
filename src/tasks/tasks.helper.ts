export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export const UUID_REGEX: RegExp = new RegExp(
  '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
  'i',
);

/*
ESLint thinks `UUID_REGEX` might be an `error` type or `any` type, making `.test()` call unsafe.
so that why we used RegExp DataTyp
*/
