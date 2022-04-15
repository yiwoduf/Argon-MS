var status = 0;
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
별빨 = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
별파 = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
별보 = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
별회 = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"
importPackage(Packages.constants);

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) { if (mode == -1) { cm.dispose(); } else { if (mode == 0) { cm.dispose(); return; } if (mode == 1) status++; else status--;

    if (status == 0) {
		
		var chat = "           #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 이벤트시스템 "+별+"\r\n#fs10##Cgray#                             "+ServerConstants.serverName+"의 이벤트시스템입니다.#k\r\n\r\n\r\n#fs12#";
		chat += "#L1#"+별빨+" #r[NEW]#k 오픈기념 홍보이벤트#k\r\n";
		cm.sendSimple(chat);	

	} else if (status == 1) {

	if (selection == 1) {
		cm.dispose();
		cm.openNpc(1032100);
			}
		}
	}
}