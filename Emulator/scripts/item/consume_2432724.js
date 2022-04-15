importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.handling.world);
importPackage(Packages.tools.packet);

// ºº∆√
var status = -1;
var own = 1549
var need = 2432724
var name = "∫ÿ∫ÿ∫ÿ ¡÷»≤πˆº∏"
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
	cm.teachSkill(80000000+own, 1, 0)
	cm.gainItem(need, -1);

	cm.getPlayer().dropMessage(-1, "[Ω∫≈≥] "+name+" 30 ¿œ ∂Û¿Ãµ˘¿ª »πµÊ «œø¥Ω¿¥œ¥Ÿ.");
	cm.dispose();
	}
}