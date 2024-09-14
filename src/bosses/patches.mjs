export async function init(ctx) {
    patchSkillTicks(ctx);
}

function patchSkillTicks(ctx) {
    console.log("Patching skill ticks...");
    ctx.patch(Skill, 'addXP').before(function(amount, masteryAction) {
        console.log("Skill XP added", Skill.name);
        
      });
}