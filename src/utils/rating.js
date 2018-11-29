export function getRatingColor(rating) {
  const h = 305 - Math.round((rating / 10) * 15)
  let l
  if (rating < 65) l = 70
  if (rating >= 65 && rating < 80) l = -1.9 * (rating - 102)
  if (rating >= 80) l = 42
  return `hsl(${h}, 100%, ${l}%)`
}
