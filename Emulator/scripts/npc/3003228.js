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
		
		var chat = "              #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 환생시스템 "+별+"\r\n#fs10##Cgray#                                "+ServerConstants.serverName+"의 환생시스템입니다.#k\r\n\r\n#fs12##b▶ #h # 님의 환생횟수는 "+cm.Comma(cm.getReborns())+" 회입니다.#k\r\n#r▶ #h #님의 레벨은 "+cm.getPlayer().getLevel()+" 레벨 입니다.#k\r\n\r\n";
	        chat += "#L1#"+별빨+" #r환생시스템#k을 이용하겠습니다.\r\n";
	        if (cm.getPlayer().getJob() == 10112) {
                chat += "#L2#"+별파+" #b제로전용#k 환생시스템을 이용하겠습니다.\r\n";
}
	 	chat += "#L3#"+별보+" #d환생포인트#k로 추가데미지를 구매하겠습니다.\r\n";
		chat += "#L4#"+별회+" #Cgray#환생포인트#k로 상점을 이용하겠습니다.";
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