var status = -1;
	       // 앞자리 코드 , 뒷자리 환생 포인트
var itemlist = [[4001126,1],[4001126,1],[4001126,1]];// 판매하시는게 아이템이랑 뭐 있나요 ?아이템이랑 환생포인트로 후원포인트 교환이영


function start() {
    status = -1;
    action (1, 0, 0);
}function action(mode, type, selection) {  //환생 퐁
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {

	var texts = "환생 포인트 상점점입니다. 메뉴를 선택해주세요\r\n";
	
	texts += "#L0#환생 포인트 아이템을 구매하겠습니다.\r\n";
		
	cm.sendSimple(texts);

	} else if (status == 1) {
		sel = selection;
		if (sel  == 0) {
                    cm.dispose();
                    cm.openNpc(2007);
		} else if (sel == 1) {
			cm.sendGetText("교환하실 액수를 적어주세요 현재 환생 포인트 : #e" + cm.getPlayer().getGP());+"#n"
	}

     } else if (status == 2) {
	sele = selection;
			if (sel == 0) {
			cm.sendYesNo("선택하신 아이템이 : #i" +  itemlist[sele][0] + " # #b#z"+itemlist[sele][0] + "##k 이 맞습니까?");
		} else if (sel == 1) {
				if (cm.getPlayer().getGP() > 10000) {
			
					cm.sendYesNo(cm.getText()+" 를 후원포인트 " + ( cm.getText() * 8 / 10 )+ " 로 교환하시겠습니까?");

				} else {
					cm.sendOk("환생 포인트가 최소 1만 이상 이여야 합니다.");
					}

		      } 
	} else if (status == 3) {
		money = cm.getText();
		   if (sel == 0) {
		       if (cm.getPlayer().getGP() > itemlist[sele][1]) {

			cm.getPlayer().gainGP(itemlist[sele][1]);
			cm.gainItem(itemlist[sele][0],1);
			cm.sendOk("구매가 정상적으로 완료 되었습니다.");
		 	cm.dispose();return;
	                  	       } else {
				cm.sendOk("환생 포인트가 부족합니다.");
		 		cm.dispose();return;
				}
			} else if (sel == 1) {
                            if (cm.getPlayer().getGP() > money) {
			cm.getPlayer().gainGP(cm.getPlayer().getGP() - money);
			cm.getPlayer().gainRC(cm.getPlayer().getRC() + money * 8 / 10 );
			cm.sendOk("정상적으로 교환 되었습니다. ");	
			cm.dispose();return;
                        } else {
				cm.sendOk("환생 포인트가 부족합니다.");
		 		cm.dispose();return;
                        }
		       }
		}
}