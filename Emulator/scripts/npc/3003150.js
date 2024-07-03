var status = -1;
별빨 = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
별파 = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
별초 = "#fUI/GuildMark.img/Mark/Pattern/00004001/8#"
별보 = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
별회 = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"

importPackage(Packages.constants);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
    if (status == 0) {
	var chat = " #fn나눔고딕 Extrabold##d[#h #]#k : "+ServerConstants.serverName+"에서 무엇을 선택해볼까?\r\n  아래의 선택사항중 하나를 골라보자.\r\n";
	chat += "#L1#"+별빨+"#r  스우 vs 데미안의 결과는?\r\n";
	chat += "#L2#"+별파+"#b  지뢰찾기#k를 플레이 하겠어.\r\n";
	chat += "#L3#"+별보+"#d  썸머리밋코인#k로 도박을 진행하겠어.\r\n";
	chat += "#L4#"+별회+"#Cgray#  가위바위보#k 도박을 진행하겠어.\r\n";
	chat += "#L5#"+별보+"#d  후원포인트#k로 도박을 진행하겠어.\r\n";
	cm.sendSimpleS(chat,2);

     } else if (status == 1) {

	if (selection == 1) {
	cm.dispose();
	cm.openNpc(1540850);

    } else if (selection == 2) {
	cm.dispose();
	cm.openNpc(9000194);
    } else if (selection == 3) {
	cm.dispose();
	cm.openNpc(3003246);

    } else if (selection == 4) {
	cm.dispose();
	cm.openNpc(9000019);

    } else if (selection == 5) {
	cm.dispose();
	cm.openNpc(9250000);

			}
		}
	}
}