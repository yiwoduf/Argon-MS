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
		
		var chat = "           #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" �̺�Ʈ�ý��� "+��+"\r\n#fs10##Cgray#                             "+ServerConstants.serverName+"�� �̺�Ʈ�ý����Դϴ�.#k\r\n\r\n\r\n#fs12#";
		chat += "#L1#"+����+" #r[NEW]#k ���±�� ȫ���̺�Ʈ#k\r\n";
		cm.sendSimple(chat);	

	} else if (status == 1) {

	if (selection == 1) {
		cm.dispose();
		cm.openNpc(1032100);
			}
		}
	}
}