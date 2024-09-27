export function getImageUrlByItemID(ctx, itemId) {
  const item = game.items.getObjectByID(itemId);
  if (!item) {
    console.warn(`Item not found: ${itemId}`);
    return "https://via.placeholder.com/25";
  }

  if (item.media.startsWith("assets/")) {
    return ctx.getResourceUrl(item.media);
  } else {
    return item.media;
  }
}
