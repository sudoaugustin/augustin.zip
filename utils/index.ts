export type Vars = { [k: string]: unknown };

export function cssvars(vars: Vars, prefix = '') {
  return Object.entries(vars).reduce<Vars>((vars, [name, value]) => {
    if (value !== undefined) vars[`--${prefix ? `${prefix}-` : ''}${name}`] = value;
    return vars;
  }, {});
}
