export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

//This functions convert this: "12-14" to ["12", "14"]
export function getFromRange(text: string): string[] {
  return text.split("-").map((n) => n);
}

export function setFromRange(array: string[]| number[]): string {
  return array.join("-");
}