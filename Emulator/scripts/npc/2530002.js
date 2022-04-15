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
		var jessica = "#fn나눔고딕 Extrabold#저 철창안에.. 당신을 기다리는 분이 있어요..\r\n";
		jessica += "많이 급해 보이던데.. 만약 좋은 일이라면 도움을 드릴게요..\r\n";
		jessica += "보안 장치를 해제 하기 위해서는 아래의 아이템이 필요해요..\r\n";
		jessica += "아래의 사냥터로 가서 몬스터를 잡고 구해오세요!..\r\n\r\n";
                jessica += "#i4033976# #b#z4033976##k " + cm.itemQuantity(4033976) + "/50 #i4033977# #b#z4033977##k " + cm.itemQuantity(4033977) + "/50\r\n#L0##d아이템을 모두 모아왔습니다..#l#k";
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
               if(cm.haveItem(4033976,50) && cm.haveItem(4033977,50)){
               cm.gainItem(4033976,-50);
               cm.gainItem(4033977,-50);
               cm.warp(304020010,0);
               cm.sendOk("#fn나눔고딕 Extrabold#성공적으로 보안 장치를 해제 하였어요..\r\n앞에 #r듀나미스#k 님을 만나보세요..");
               cm.dispose();
               } else {
               cm.sendOk("#fn나눔고딕 Extrabold##r보안 장치를 해제하기 위한 아이템이 모자라는걸요..?#k");
               cm.dispose();
                }
}    
}
}
}