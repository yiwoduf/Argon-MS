var status = 0;
var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
��ȸ = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"
importPackage(Packages.constants);

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) { if (mode == -1) { cm.dispose(); } else { if (mode == 0) { cm.dispose(); return; } if (mode == 1) status++; else status--;

    if (status == 0) {
		
		var chat = "              #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" ȯ���ý��� "+��+"\r\n#fs10##Cgray#                                "+ServerConstants.serverName+"�� ȯ���ý����Դϴ�.#k\r\n\r\n#fs12##b�� #h # ���� ȯ��Ƚ���� "+cm.Comma(cm.getReborns())+" ȸ�Դϴ�.#k\r\n#r�� #h #���� ������ "+cm.getPlayer().getLevel()+" ���� �Դϴ�.#k\r\n\r\n";
	        chat += "#L1#"+����+" #rȯ���ý���#k�� �̿��ϰڽ��ϴ�.\r\n";
	        if (cm.getPlayer().getJob() == 10112) {
                chat += "#L2#"+����+" #b��������#k ȯ���ý����� �̿��ϰڽ��ϴ�.\r\n";
}
	 	chat += "#L3#"+����+" #dȯ������Ʈ#k�� �߰��������� �����ϰڽ��ϴ�.\r\n";
		chat += "#L4#"+��ȸ+" #Cgray#ȯ������Ʈ#k�� ������ �̿��ϰڽ��ϴ�.";
		cm.sendSimple(chat);	

	} else if (status == 1) {

	if (selection == 1) {
		cm.dispose();
		cm.openNpc(2491006);

	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(9000192);

	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(2520002);

	} else if (selection == 4) {
		cm.dispose();
		cm.openNpc(9001165);
			}
		}
	}
}