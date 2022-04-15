
/*

	MapleStory 1.2.246 Varon Team Script Maker	Scripted By Varon Team :: MelnoK


	SCRIPT MAKER : 바론

	NPC ID : 2491000

	NPC NAME : 안내자

*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
비율 = 50; // 메소 몇원당 캐시 1원?
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }
    if (status == -1) {
       cm.dispose();
    }
    if (status == 0) {
        if(cm.getPlayer().getMeso() * 비율 >= 2147483647) {
        한계 = 2147483647 / 비율
        } else {
        한계 = cm.getPlayer().getMeso() / 비율
        }
        cm.sendGetNumber("캐시충전을 하시러 오셨군요!\r\n#r충전하실 캐시 금액을 적어 주세요#k\r\n현재 #b"+비율+" 메소#k당 #b1 캐시#k에 모시고 있습니다!",1,1,한계)
    } else if (status == 1) {
        cm.gainMeso(-selection * 비율);
        cm.gainNX(selection);
        cm.dispose();
    } 
}
