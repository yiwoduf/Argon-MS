var status = 0;
별빨 = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
별파 = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
별보 = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
별회 = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"
왕별 = "#fUI/FarmUI.img/objectStatus/star/whole#"
별검 = "#fUI/GuildMark.img/Mark/Pattern/00004001/16#"
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";

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
    } if (mode == 1)
        status++;
     else status--;

    if (status == 0) {
	var chat =       "       #fUI/UIWindowBT.img/MonsterBattle/backgrnd##fn나눔고딕 Extrabold##fs17#                                                                                                    "+ServerConstants.serverName+"에 오신 것을 환영합니다. \r\n#fs10#                                  #Cgray#즐거운 시간 되시기 바랍니다.#k\r\n\r\n#fs12#";
	chat += "#L1##r▶ "+ServerConstants.serverName+"의 서버가이드를 읽어보겠습니다.#k\r\n"; 
	chat += "#L2##b▶ "+ServerConstants.serverName+"의 일일퀘스트를 보겠습니다.#k\r\n\r\n";
	chat += "#L7#"+별회+"#d워프#k 시스템#l\r\n";
	chat += "#L3#"+별보+"#d행정#k 시스템#l\r\n";
        chat += "#L4#"+별빨+"#r에플#k 컨텐츠#l\r\n";
        chat += "#L5#"+별파+"#b팡#k 트레이드#l\r\n";
        chat += "#L6#"+별회+"#Cgray#후원#k 시스템#l\r\n";
	cm.sendSimple(chat);	

   } else if (status == 1) {

      if (selection == 1) {
      var chat = "			#fn나눔고딕 Extrabold##b"+ServerConstants.serverName+"#k의 서버가이드를 알려드리겠습니다.\r\n\r\n";
      chat += "---------------------------------------------------------------------------------\r\n";
      chat += "#d[알림 1]#k - 배율은 경험치 : "+ServerConstants.defaultExpRate+"  드롭 : "+ServerConstants.defaultDropRate+" 메소 : "+ServerConstants.defaultMesoRate+"의 배율입니다.\r\n";
      chat += "#d[알림 2]#k - 공식도메인은 #b["+ServerConstants.serverName+".com]#k입니다.\r\n";
      chat += "#d[알림 3]#k - 후원은 1대1오픈카톡 으로 문의 부탁드립니다.\r\n\r\n";
      chat += "										 - "+ServerConstants.serverName+" - #k#l\r\n";
      chat += "---------------------------------------------------------------------------------";
      cm.sendSimple(chat);

      } else if (selection == 2) {
      cm.dispose();
      cm.openNpc(3003104);

      } else if (selection == 3) {
      cm.dispose();
      cm.openNpc(9001137);

      } else if (selection == 4) {
      cm.dispose();
      cm.openNpc(2400018);

      } else if (selection == 5) {
      cm.dispose();
      cm.openNpc(9300000);

      } else if (selection == 6) {
      cm.dispose();
      cm.openNpc(1540010);

      } else if (selection == 7) {
      cm.dispose();
      cm.openNpc(1540103);


			}
		}
	}
}