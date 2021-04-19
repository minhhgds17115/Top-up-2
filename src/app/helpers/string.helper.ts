export function contains(source: string, subString: string) {
  return source.toLowerCase().indexOf(subString.toLowerCase()) > -1;
}
