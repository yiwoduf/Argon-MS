importPackage(Packages.constants);
importPackage(Packages.client.items);

var status = -1;

var 환포 = 20000; // 환생포인트
var 아이템 = 2431838; // 아이템코드
var 갯수 = 5000; // 갯수
var 직업 = 13100; // 직업코드

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
        var chat = "  #fn나눔고딕 Extrabold#"+ServerConstants.serverName+"의 변생 시스템 (Reinstatement System) 입니다.\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n\r\n";
        chat += "#r▶ 환생포인트  "+환포+" 원, #v"+아이템+"# #z"+아이템+"# 가 "+갯수+" 개 필요합니다.#k\r\n";
        chat += "#b▶ #h0# 님의 환생포인트는 "+cm.getPlayer().getGP()+" 원 입니다.#k\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n";
        chat += "#L0##d 저는 핑크빈으로 직업을 변경하겠습니다.#k#l\r\n\r\n";
        chat += "---------------------------------------------------------------------------------\r\n";
        cm.sendSimple(chat);

     } else if (status == 1) {
        if (cm.getPlayer().getGP() >= 환포) {
	  if (cm.haveItem(아이템, 갯수)) {
	  cm.getPlayer().gainGP(-환포);
          cm.gainItem(아이템, -갯수);
          cm.changeJob(직업);
	  cm.sendOk("#fn나눔고딕 Extrabold##b* 변생이성공적으로 완료하였습니다.");
	  cm.dispose();
	  } else {
	  cm.sendOk("#fn나눔고딕 Extrabold##r* 재료가 부족하여 실패하였습니다.");
	  cm.dispose();

				}
			}
		}
	}
}
