export function slugify(text) {
  if (!text) return 'wedding';
  const cleaned = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return cleaned || 'wedding';
}

