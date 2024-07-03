var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {

	cm.sendSimple ("캐시 교환은 #rLv.30#k부터 가능 하며, 최대 한도는 90만원 입니다.#e#d" +
		  "#k\r\n#L100##r메소로 캐시 구입하기" +
		  "#k\r\n#L200##b캐시로 메소 구입하기");

 
	  } else if (selection == 100) {
                cm.sendSimple ("캐시 교환은 #rLv.30#k부터 가능 하며, 최대 한도는 90만원 입니다.#d" +
                 "#k\r\n#L1##r1,000,000 메소로 10,000 캐시 교환하기" +
                 "#k\r\n#L2##r500,000 메소로 5,000 캐시 교환하기" +
                 "#k\r\n#L3##r250,000 메소로 2,500 캐시 교환하기" +
                 "#k\r\n#L4##r100.000 메소로 1,000 캐시 교환하기" +
                 "#k\r\n#L5##r50,000 메소로 500 캐시 교환하기");

 
	  } else if (selection == 200) {
                cm.sendSimple ("캐시 교환은 #rLv.30#k부터 가능 하며, 최대 한도는 90만원 입니다.#d" +
                 "#k\r\n#L6##b10,000 캐시로 900,000 메소 교환하기" +
                 "#k\r\n#L7##b5,000 캐시로 400,000 메소 교환하기" +
                 "#k\r\n#L8##b2,500 캐시로 200,000 메소 교환하기" +
                 "#k\r\n#L9##b1,000 캐시로 90,000 메소 교환하기" +
                 "#k\r\n#L10##b500 캐시로 50,000 메소 교환하기");

                } else if (selection == 1) {
			 if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 5000000 && cm.getPlayer().getNX() < 399999) {
				cm.sendOk (" 1,000,000 메소를 10,000 캐시로 교환하였습니다!");
                   		cm.gainMeso (-1000000);
                   		cm.gainNX (10000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시는 #rLv.30#k부터 교환 가능 합니다.\r\n메소가 부족하거나 캐시 최대한도량을 넘었습니다.(최대 90만)");
                   		cm.dispose();
			        
			}                  	
                } else if (selection == 2) {
			if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 10000000 && cm.getPlayer().getNX() < 850000) {
		 		cm.sendOk ("500,000 메소를 5,000 캐시로 교환하였습니다!");
                   		cm.gainMeso (-500000);
                   		cm.gainNX (5000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시는 #rLv.30#k부터 교환 가능 합니다.\r\n메소가 부족하거나 캐시 최대한도량을 넘었습니다.(최대 90만)");
                   		cm.dispose();

                   	}

                } else if (selection == 3) {
			if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 1000000 && cm.getPlayer().getNX() < 895000) {
				cm.sendOk ("250,000 메소를 2,500 캐시로 교환하였습니다!");
                   		cm.gainMeso (-250000);
                   		cm.gainNX (2500);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시는 #rLv.30#k부터 교환 가능 합니다.\r\n메소가 부족하거나 캐시 최대한도량을 넘었습니다.(최대 90만)");
                   		cm.dispose();
                   	}
                } else if (selection == 4) {
			if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 100000 && cm.getPlayer().getNX() < 899500) {
				cm.sendOk ("100,000 메소를 1000 캐시로 교환하였습니다!");
                   		cm.gainMeso (-100000);
                   		cm.gainNX (1000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시는 #rLv.30#k부터 교환 가능 합니다.\r\n메소가 부족하거나 캐시 최대한도량을 넘었습니다.(최대 90만)");
                   		cm.dispose();
                   	}
                } else if (selection == 5) {
			if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 10000 && cm.getPlayer().getNX() < 899950) {
				cm.sendOk ("50,000 메소를 500 캐시로 교환하였습니다!");
                   		cm.gainMeso (-50000);
                   		cm.gainNX (500);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시는 #rLv.30#k부터 교환 가능 합니다.\r\n메소가 부족하거나 캐시 최대한도량을 넘었습니다.(최대 90만)");
                   		cm.dispose();

			}
                } else if (selection == 6) {
			 if (cm.getPlayer().getNX() >= 10000) {
				cm.sendOk ("10,000 캐시를 900,000 메소로 교환하였습니다!");
                   		cm.gainMeso (900000);
                   		cm.gainNX (-10000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시가 부족합니다!");
                   		cm.dispose();
			        
			}                  	
                } else if (selection == 7) {
			if (cm.getPlayer().getNX() >= 5000) {
				cm.sendOk ("5,000 캐시를 400,000 메소로 교환하였습니다!");
                   		cm.gainMeso (400000);
                   		cm.gainNX (-5000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시가 부족합니다!");
                   		cm.dispose();
                   	}
                } else if (selection == 8) {
			if (cm.getPlayer().getNX() >= 2500) {
				cm.sendOk ("2,500 캐시를 200,000 메소로 교환하였습니다!");
                   		cm.gainMeso (200000);
                   		cm.gainNX (-2500);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시가 부족합니다!");
                   		cm.dispose();
                   	}
                } else if (selection == 9) {
			if (cm.getPlayer().getNX() >= 1000) {
				cm.sendOk ("1,000 캐시를 90,000 메소로 교환하였습니다!");
                   		cm.gainMeso (90000);
                   		cm.gainNX (-1000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시가 부족합니다!");
                   		cm.dispose();
                   	}
                } else if (selection == 10) {
			if (cm.getPlayer().getNX() >= 500) {
				cm.sendOk ("500 캐시를 50,000 메소로 교환하였습니다!");
                   		cm.gainMeso (50000);
                   		cm.gainNX (-500);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("캐시가 부족합니다!");
                   		cm.dispose();
             
                		

			}
		}
	}
}


