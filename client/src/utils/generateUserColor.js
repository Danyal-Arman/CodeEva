export function generateUserColor(userId, type = "avatar") {
  let hash = 0;

  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash % 360);

  if (type === "cursor") {
    return `hsl(${hue}, 60%, 50%)`;
  }

  return `hsl(${hue}, 60%, 55%)`;
}
