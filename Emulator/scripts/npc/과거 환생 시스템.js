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
	 	chat += "\r\n#L1##fs 13##s9001005##e#r  ȯ�� �ý���#d ( ȯ��,���� �̿��ϱ� )\r\n";
		chat += "\r\n#L4##fs 13##s80001079##e#r  ȯ�� �����̿�#d ( ȯ������Ʈ ���� )";
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
		cm.openNpc(9090101);

	} else if (selection == 4) {
		cm.dispose();
		cm.openNpc(9001165);
			}
		}
	}
}