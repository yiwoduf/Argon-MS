importPackage(java.sql);
importPackage(java.lang);
importPackage(Packages.database);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

// ¼¼ÆÃ
var status = -1;
var own = 1009
var need = 2431755
var name = "µÕ½ÇµÕ½Ç °í°ø¶óÀÌµù"
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
	cm.teachSkill(80001285, 1, 0)
	cm.gainItem(need, -1);

	cm.getPlayer().send(UIPacket.showInfo("[½ºÅ³] "+name+" ¶óÀÌµù È¹µæ!!"));
			cm.updateChar();
			cm.dispose();
	}
}