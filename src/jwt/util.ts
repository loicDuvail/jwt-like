const min_ms = 60_000;
const hours_ms = 60 * min_ms;
const day_ms = 24 * hours_ms;
const week_ms = 7 * day_ms;

export const timeStringToInt = (timeString: string) => {
  const [scalarStr, scaleStr] = timeString.split(" ");

  if (!scalarStr || !scaleStr)
    return { status: 400, message: "invalid time string format", data: null };

  const scalar = parseInt(scalarStr);

  switch (scaleStr) {
    case "minute":
    case "minutes":
      return { status: 200, message: "success", data: scalar * min_ms };
    case "hour":
    case "hours":
      return { status: 200, message: "success", data: scalar * hours_ms };
    case "day":
    case "days":
      return { status: 200, message: "success", data: scalar * day_ms };
    case "week":
    case "weeks":
      return { status: 200, message: "success", data: scalar * week_ms };
  }

  return { status: 400, message: "invalid time string format", data: null };
};

export const symetricEncrypt = (data: string, key: string) => {
  let result = "";
  for (let i = 0; i < data.length; i++) {
    const xor = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    let bin = xor.toString(2);
    bin = "00000000".slice(0, -bin.length) + bin;
    result +=
      parseInt(bin.slice(0, 4), 2).toString(16) +
      parseInt(bin.slice(4), 2).toString(16);
  }
  return result;
};

export const symetricDecrypt = (data: string, key: string) => {
  let result = "";
  for (let i = 0; i < data.length / 2; i++) {
    let hex = data.slice(i * 2, i * 2 + 2);
    const bin = parseInt(hex, 16);
    const char = String.fromCharCode(bin ^ key.charCodeAt(i % key.length));
    result += char;
  }
  return result;
};
