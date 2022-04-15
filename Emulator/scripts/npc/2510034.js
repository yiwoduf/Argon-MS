var status = 0;

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
		var jessica = "#fn나눔고딕 Extrabold#으... 무서워.... 끝난건가..\r\n";
		jessica += "저.. #r탈레스#k 님의 부탁을 받으셨다고 들었는데..\r\n";
		jessica += "제가 조금은 단서를 갖고 있어요..\r\n";
		jessica += "그런데.. #d오멘#k 이 아직도 저를 감시하고 있지 않은거지요?\r\n";
                jessica += "#L0#* #d오멘#k 을 성공적으로 퇴치 하였습니다.#l\r\n\r\n      #i4009157# " + cm.itemQuantity(4009157) + "/1 + #i4009158# " + cm.itemQuantity(4009158) + "/1\r\n";
		cm.sendSimple(jessica);

	} else if (status == 1) {

	if (selection == 0) {
               if(cm.haveItem(4009157,1) && cm.haveItem(4009158,1)){
               cm.gainItem(4009157,-1);
               cm.gainItem(4009158,-1);
               cm.warp(302040000,0);
               cm.sendOk("#fn나눔고딕 Extrabold##b가족 사진#k 이라면 이 곳 어딘가에 분명 있을거예요..\r\n대신전의 관리자이신 #r마르스#k 님을 찾아가보세요!..\r\n\r\n#d(대신전 오른쪽에 있는 마르스를 찾아가자..)#k");
               cm.dispose();
               } else {
               cm.sendOk("#fn나눔고딕 Extrabold#당신에게는.. #d오멘#k 을 퇴치한 증거가 없어요..\r\n아직도 감시 받는 저를 시험에 들게 하지 마세요..#k");
               cm.dispose();
                }
} 
}    
}    
}       