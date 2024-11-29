type Vars = { [k: string]: unknown };

export function cssvars(vars: Vars) {
  return Object.entries(vars).reduce<Vars>((vars, [name, value]) => {
    if (value !== undefined) vars[`--${name}`] = value;
    return vars;
  }, {});
}
