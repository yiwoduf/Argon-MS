var status = 0;
var sel = -1;

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
	cm.sendSimple("#fn나눔고딕 Extrabold#나는 고대에서부터 내려온.. 칼.. 한자루..\r\n선택 받은자들에게 나의 특별한 힘을 개방해주고 있지..\r\n\r\n#d* 지금 바로 이너 어빌리티를 개방 하시겠습니까?#k\r\n\r\n#r[+] 소모 아이템 :#k #b썸머리밋 코인#k #r200 개#k\r\n#L0##b지금 바로.. 이너 어빌리티를 개방할게요..#k");
} else if (status == 1) {
if (selection == 0) {
	if (cm.getPlayer().getInnerLevel() >= 4) {
		cm.sendOk("#fn나눔고딕 Extrabold##r현재 모든 이너 어빌리티가 개방되어 있습니다.#k");
		cm.dispose();
		return;
	}
	     if (cm.haveItem(4310129, 200)) {
		cm.gainItem(4310129, -200);
		cm.getPlayer().innerLevelUp();
		cm.sendOk("#fn나눔고딕 Extrabold##b성공적으로 이너 어빌리티 +1 칸이 개방 되었습니다.#k");
		cm.dispose();
            } else {
                cm.sendOk("#fn나눔고딕 Extrabold##r썸머리밋 코인이 부족하신 것 같은데요?#k");
                cm.dispose();
            }
} 
}
}
}