export type Errors<T> = [keyof T, string | null][];

export type ActionResult<T> =
  | { status: 'success'; data: unknown }
  | { status: 'error'; errors?: Errors<T>; message?: string }
  | { status: 'idle' };
