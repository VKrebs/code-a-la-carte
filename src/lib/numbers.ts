const numberOfDigitsInAWrittenNumber = 4;

export type Format = "tip" | "lesson";

const formatPrefixes: Record<Format, string> = {
  tip: "t",
  lesson: "l",
};

export function formatNumber(number: number): string {
  return number.toString().padStart(numberOfDigitsInAWrittenNumber, "0");
}

export function permalinkOf(format: Format, number: number): string {
  return `/${formatPrefixes[format]}/${formatNumber(number)}`;
}
