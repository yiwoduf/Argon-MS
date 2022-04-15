var status = -1;
itemlist = [[2450042,1000],[2049153,5000],[1122076,10000],[1702737,20000],[1112148,50000],[4032101,50000],[4001254,100000],[2433955,100000],[1142139,100000],[2432068,250000]];
function start() {
    status = -1;
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
		말 = "#fn나눔고딕 ExtraBold##fs15##h0#님의 잔여 보스 포인트는 #r" + cm.getPlayer().getKeyValue2("NormalPoint") + "#k 점 입니다.\r\n#b구매하실 아이템을 선택하여 주세요.#k\r\n\r\n"
		 for(i=0; i<itemlist.length; i++) {
               말+= "#fs15##L"+i+"#  #i"+itemlist[i][0]+"#   "+itemlist[i][1]+"보스포인트 \r\n\r\n";
           }
       cm.sendSimple(말)
	} else if (status == 1) {
		choose = itemlist[selection][0]
		point = cm.getPlayer().getKeyValue2("NormalPoint");
        if (cm.getPlayer().getKeyValue2("NormalPoint") < point) {
            cm.sendOk("#fn나눔고딕 ExtraBold##fs15##h0#님의 보스 포인트가 부족합니다.");
            cm.dispose();
		}else{
			if(!cm.canHold(itemlist[selection][0])){
				cm.sendOk("#fn나눔고딕 ExtraBold##fs15#인벤토리 공간이 부족합니다.");
				cm.dispose();
			}
			cm.sendOk("#fn나눔고딕 ExtraBold##fs15#선택하신 아이템을 구매하셨습니다.");
			cm.gainItem(itemlist[selection][0],1);
			cm.getPlayer().setKeyValue2("NormalPoint", point - itemlist[selection][1]);	
			cm.dispose();
		}
	}
}