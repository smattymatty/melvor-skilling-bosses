export function getImageUrlByItemID(ctx, itemId) {
  const item = game.items.getObjectByID(itemId);
  if (!item) {
    console.warn(`Item not found: ${itemId}`);
    return "https://via.placeholder.com/25"; // Default placeholder
  }

  if (item.media.startsWith("assets/")) {
    // This is a custom item from the mod
    return ctx.getResourceUrl(item.media);
  } else {
    // This is a standard game item
    return item.media;
  }
}
