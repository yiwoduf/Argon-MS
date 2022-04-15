


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	리플러스 에 의해 만들어 졌습니다.

	엔피시아이디 : 9900002

	엔피시 이름 : 신용협동조합

	엔피시가 있는 맵 : 빅토리아로드 : 엘리니아 (180000000)

	엔피시 설명 : MISSINGNO


*/

var status = -1;

function start() {
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
 별 = "#fUI/UIToolTip/Item/Equip/Star/Star##fs16##fs16# "
var chat ="";
        chat += "#fn나눔고딕 Extrabold##fs16##fs16#"+별+"#b뽑기시스템#k"+별+"#l";
        chat += "\r\n#g#L60# 의자뽑기";  
        chat += "#g#L66# 보스장신구뽑기#l\r\n\r\n#g#L67# 펜던트뽑기 #k#l\r\n";

        cm.sendSimple(chat);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.openNpc(9000019);
        } else if (selection == 1) {
          cm.dispose();
          cm.openNpc (2300000);
  } else if (selection == 62) {
          cm.dispose();
          cm.openNpc(9300011);
} else if (selection == 67) {
		cm.dispose();
                cm.openNpc(2100);
} else if (selection == 66) {
		cm.dispose();
                cm.openNpc(10000);
} else if (selection == 65) {
           cm.dispose();
           cm.openNpc(9300012);
  } else if (selection == 60) {
          cm.dispose();
          cm.openNpc (9300003);
        }
    }
}
