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
        if (!cm.haveItem(4033338,1) && cm.haveItem(4034075,1)) {
		var jessica = "#fn나눔고딕 Extrabold#음.. 인간이네...고약한 냄새가 나는군..\r\n";
		jessica += "#r페어리 퀸#k 님의.. 명령이 있었으니.. 특별히 시간을 내주지..\r\n";
		jessica += "긴 말 안하겠어.. 너가 강하다는 걸 보여주길 바래..\r\n\r\n";
		jessica += "#fs14##d * 해당 아이템 드롭 몬스터 서식지#k#fs12#\r\n      엘린숲 침략지 1~2 - 현재맵 맨 오른쪽 아래 \r\n\r\n     #r[보상]#k #i4033338# #b#z4033338##k\r\n\r\n";
                if(cm.haveItem(4009151,30) && cm.haveItem(4009152,30)) {
                jessica += "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L0##i4009151# " + cm.itemQuantity(4009151) + "/30 + #i4009152# " + cm.itemQuantity(4009152) + "/30";
                } else {
                jessica += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##i4009151# " + cm.itemQuantity(4009151) + "/30 + #i4009152# " + cm.itemQuantity(4009152) + "/30";
                }
		cm.sendSimple(jessica);
        } else {
        cm.sendOk("#fn나눔고딕 Extrabold#인간 따위가.. 멀 처다 보니..");
        }
	} else if (status == 1) {

	if (selection == 0) {
               if(cm.haveItem(4009151,30) && cm.haveItem(4009152,30)) {
	       if (cm.canHold(4033338)) {
               cm.gainItem(4009151,-30);
               cm.gainItem(4009152,-30);
               cm.gainItem(4033338, 1);
               cm.sendOk("#fn나눔고딕 Extrabold#너는 다른 나약한 인간과는 좀 다른거 같군..\r\n내키지 않지만.. 강하다는 걸 입증 했으니..\r\n특별히.. 인정해주겠어 자 받으렴..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4033338# #b#z4033338##k");
               cm.dispose();
		} else {		         
			 cm.sendOk("#fn나눔고딕 Extrabold##r기타 창을 비우라고.. 이 인간아!#k");
		         cm.dispose();	
			}
               } else {
               cm.sendOk("#fn나눔고딕 Extrabold##r정말로 다 모아오긴한거야?..\r\n하이간.. 나약한 인간은.. 거짓말 밖에 모른다니까..#k");
               cm.dispose();
                }
}    
}
}
}