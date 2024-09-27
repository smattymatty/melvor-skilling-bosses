export function createModifier(ctx, game, options) {
  try {
    const {
      namespace,
      id,
      isCombat = false,
      allowEnemy = false,
      isSkill = false,
      allowPositive = true,
      allowNegative = false,
      tiers = 1,
      descriptions,
      scopes = {},
      posAliases = [],
      negAliases = [],
    } = options;

    for (let tier = 1; tier <= tiers; tier++) {
      const tieredId = tier > 1 ? `${id}_${tier}` : id;
      const modifier = new Modifier(
        game.registeredNamespaces.getNamespace(namespace),
        {
          id: tieredId,
          isCombat,
          allowEnemy,
          allowedScopes: [
            {
              scopes,
              descriptions: descriptions.map((desc) => ({
                text: desc.text,
                lang: desc.lang,
                below: desc.below,
                above: desc.above,
                includeSign: desc.includeSign,
              })),
              posAliases: posAliases.map((alias) => ({ key: alias })),
              negAliases: negAliases.map((alias) => ({ key: alias })),
            },
          ],
          isSkill,
          allowPositive,
          allowNegative,
        },
        game
      );
      game.modifierRegistry.registerObject(modifier);
    }
  } catch (error) {
    console.error("Error creating modifier:", error);
    throw error;
  }
}
