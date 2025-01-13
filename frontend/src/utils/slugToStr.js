export default function slugToStr(slug) {
  const str = slug.split("-").join(" ");

  if (str.endsWith("t shirt")) {
    return str.replace(/t shirt$/, "t-shirt");
  }
  return str;
}
