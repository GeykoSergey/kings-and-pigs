export const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export function checkCollisions(object1, object2) {
  const isColliding =
    object1.hitBox.position.x + object1.hitBox.width >= object2.hitBox.position.x &&
    object1.hitBox.position.x <= object2.hitBox.position.x + object2.hitBox.width &&
    object1.hitBox.position.y <= object2.hitBox.position.y + object2.hitBox.height &&
    object1.hitBox.position.y + object1.hitBox.height >= object2.hitBox.position.y

  if (!isColliding) return null

  const xOverlap = Math.min(
    object1.position.x + object1.width - object2.position.x,
    object2.position.x + object2.width - object1.position.x,
  )

  const yOverlap = Math.min(
    object1.position.y + object1.height - object2.position.y,
    object2.position.y + object2.height - object1.position.y,
  )

  if (xOverlap < yOverlap) {
    return object1.position.x < object2.position.x ? 'right' : 'left'
  } else {
    return object1.position.y < object2.position.y ? 'bottom' : 'top'
  }
}
