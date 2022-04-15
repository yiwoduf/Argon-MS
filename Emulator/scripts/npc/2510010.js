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
		var jessica = "#fn나눔고딕 Extrabold#정말 고맙군.. 우리 행방불명 된 딸 #r아린#k 을.. 구해줘서..\r\n";
		jessica += "자네가 아니였다만.. 우리의 딸 #r아린#k 을 평생 보지 못했을거라네..\r\n";
		jessica += "자네가.. 우릴 위해 한번만 더 힘을 써주겠는가..?\r\n";
                jessica += "얼마전.. 우리 오로라를 약탈해 가려는 움직임이 포착되었지..\r\n";
		jessica += "헌데, 그 자의 계획에.. 우리의 오로라와 #b가족 사진#k 이 필요하더군..\r\n";
		jessica += "왜 그게 필요한지.. 전혀.. 납득이 가지 않는 경우지만..\r\n";
		jessica += "우리는 오로라를 지켜야기에.. 그 자를 퇴치 준비 중 이라네..\r\n";
		jessica += "자네도.. 목적이 같은 것 같으니 나를 도우지 않겠는가?\r\n";
		jessica += "그 자를 퇴치 하기 위해선 아래의 물품들이 필요하다네..\r\n\r\n";
                jessica += "#i4033220# #b#z4033220##k " + cm.itemQuantity(4033220) + "/1\r\n#d * 마르스 바로 오른쪽 포탈 - 하얀 마법사#k\r\n\r\n#i4033972# #b#z4033972##k " + cm.itemQuantity(4033972) + "/20\r\n#d* 로비 맨 왼쪽 포탈 → 앞쪽 숲 사냥터의 몬스터 드롭템#k\r\n\r\n#i4009155# #b#z4009155##k " + cm.itemQuantity(4009155) + "/20\r\n#d * 로비 맨 오른쪽 포탈 → 뒤쪽 숲 사냥터의 몬스터 드롭템#k\r\n#L0##r요청하신대로.. 모두.. 모아왔습니다.#k";
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
               if(cm.haveItem(4033220,1) && cm.haveItem(4033972,20) && cm.haveItem(4009155,20)){
               cm.gainItem(4033220,-1);
               cm.gainItem(4033972,-20);
               cm.gainItem(4009155,-20);
               cm.warp(302050020,0);
               cm.getPlayer().dropMessage(-1,"이 곳에서 매우 심상치 않은 기운이 느껴진다..");
               cm.getPlayer().dropMessage(5,"이 곳에서 매우 심상치 않은 기운이 느껴진다..");
               cm.sendOk("#fn나눔고딕 Extrabold##r으악..!!...#k\r\n그.. 그 자의 습격이야...\r\n\r\n#d(왼쪽의 포탈을 통해 로비로 나가 마르스를 찾자..)#k");
	       cm.showEffect(false,"adventureStory/brokenSeal");
	       cm.showEffect(false,"balog/clear/stone");
               cm.playSound(false,"Field.img/cannonshooter/bang");
               cm.dispose();
               } else {
               cm.sendOk("#fn나눔고딕 Extrabold##r자네.. 얼른가서 모아오게나..\r\n우리에게는 시간이 별로 없다네...#k");
               cm.dispose();
                }
}    
}
}
}