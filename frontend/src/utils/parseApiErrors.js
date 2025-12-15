export function parseApiErrors(errOrData) {
  const data =
    errOrData?.response?.data ?? // axios
    errOrData?.data ??           // se você lançar {data: ...}
    errOrData;                   // json direto

  const result = { fieldErrors: {}, globalError: "" };

  if (!data || typeof data !== "object") {
    return result;
  }

  if (typeof data.detail === "string") result.globalError = data.detail;

  for (const [key, value] of Object.entries(data)) {
    if (key === "detail") continue;

    if (Array.isArray(value)) {
      result.fieldErrors[key] = value.join(" ");
    } else if (typeof value === "string") {
      result.fieldErrors[key] = value;
    }
  }

  return result;
}
