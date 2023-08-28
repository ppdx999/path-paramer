export type Params = {
  key: string;
  start: number;
  end: number;
};

export type Struct = {
  path: string;
  params: Params[];
};

export const parse = (path: string): Struct => {
  const params: Params[] = [];
  let lhs = -1;

  for (let i = 0; i < path.length; i++) {
    if (path[i] === "{") {
      if (lhs !== -1) {
        throw new Error(`Invalid path: ${path} at ${i}`);
      }

      lhs = i;
    }

    if (path[i] === "}") {
      if (lhs === -1) {
        throw new Error(`Invalid path: ${path} at ${i}`);
      }

      params.push({
        key: path.substring(lhs + 1, i),
        start: lhs,
        end: i,
      });

      lhs = -1;
    }
  }

  if (lhs !== -1) {
    throw new Error(`Invalid path: ${path} at ${lhs}`);
  }

  return {
    path,
    params,
  };
};

export const replace = <T extends Record<string, string | number>>(
  path: string,
  params: T,
): string => {
  const struct = parse(path);
  let result = struct.path;

  for (const param of struct.params) {
    const value = params[param.key];

    if (value === undefined) {
      throw new Error(`Missing param: ${param.key}`);
    }

    result = result.replace(`{${param.key}}`, String(value));
  }

  return result;
};
