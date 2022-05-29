import { Unit } from "../store/app-context";

export const SAT_DENOMINATOR = 100_000_000;
export const NUM_LOCALE = "en-US";

export function convertSatToBtc(sat: number | null): number | null {
  return sat ? sat / SAT_DENOMINATOR : null;
}

export function convertBtcToSat(btc: number): number {
  return btc * SAT_DENOMINATOR;
}

export function convertMSatToSat(mSat: number | null): number | null {
  return mSat ? mSat / 1000 : null;
}

export function convertMSatToBtc(mSat: number | null): number | null {
  return convertSatToBtc(mSat ? mSat / 1000 : null);
}

export function convertToString(unit: Unit, num: number | null): string {
  if (num === null) {
    return "-";
  }
  if (unit === Unit.SAT) {
    return num.toLocaleString(NUM_LOCALE);
  }
  return num.toFixed(8).toString();
}

export function formatAmount(value: string, unit: Unit): string {
  // replace every character except numbers and separators
  value = value.replace(/[^0-9.,]/, "");
  if (unit === Unit.SAT) {
    // remove all separators to format correctly
    value = value.replace(/,|\./g, "");
    if (value) {
      value = new Intl.NumberFormat("en-US").format(+value);
    }
  } else {
    // remove commas
    value = value.replace(/,/g, "");
    // replace ".." with "."
    value = value.replace(/\.\./g, ".");
    let output = value.split(".");
    // limit to max 8 decimal places
    if (output[1]?.length > 8) {
      output[1] = output[1].substring(0, 8);
    }
    // formatting which respects separator
    // makes either "x.y" or "y"
    value = output.shift() + (output.length ? "." + output.join("") : "");
  }
  return value;
}
