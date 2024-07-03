/*

제작자 은시경(eunseekyung@nate.com)
	1차 수정 사라센 온라인 스크립트 개발 (projectchiu16@nate.com)

*/

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
            var chat = "#e#b[AURORA ONLINE]#k의 화페 시스템입니다. 기능을 선택해주세요 \r\n";
	    chat += "\r\n#L1##b메소 ↔ 초경량화페 교환하기";
	    cm.sendSimple(chat);

} if (selection == 1) {
	       var chat = "#e#b 저는 [AURORA ONLINE]화폐 엔피시입니다.#k\r\n";
               chat += "\r\n#L100##e#r[#i4000001# 기타 아이템(1:7500) ]  교환#e";
               chat += "\r\n#L200##e[#i4310185# 1개 → #r메소#n#e천만  ]  교환#e";
               chat += "\r\n#L300##e[#i4310184# 1개 → #r메소#n#e5천만  ]  교환#e";
               chat += "\r\n#L400##e[#i4310108# 1개 → #r메소#n#e1억  ]  교환#e";
               cm.sendSimple(chat);


            }  if (selection == 100) {
		cm.dispose();
		cm.openNpc (1012112);


            }  if (selection == 200) {
		if (cm.haveItem(4310185,1)) {
		    if (cm.canHold(4310185)) {
			cm.gainItem(4310185, -1);
			cm.gainMeso(10000000);
		        cm.sendOk("교환완료.");
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 있는지 다시 한번 확인해 주세요!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("화폐가 부족합니다.");
		    cm.dispose();






		}
	}
}



