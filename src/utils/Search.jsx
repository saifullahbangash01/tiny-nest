
export function searchProducts(list, query) {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);

  if (!words.length) return list;

  return list.filter((p) => {
    const text = [
      p.name,
      p.type,
      p.category,
      p.tag,
      p.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return words.every((word) => text.includes(word));
  });
}
