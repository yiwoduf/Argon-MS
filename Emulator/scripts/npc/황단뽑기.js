load('nashorn:mozilla_compat.js');
importPackage(Packages.tools.RandomStream);

var status = -1;
var 물음표상자 = 2430026;  
var 황단 = 4033247;
var S등급 = [[1182200, 1], [2434710, 1], [1032232, 1], [1402180, 1], [1382235, 1], [1122280, 1], [1032110, 1], [1113231, 1], [2431023, 1]];
var A등급 = [[1142078, 1], [2431011, 1], [1182191, 1], [2431012, 1], [1113149, 1], [1402224, 1], [1113070, 1]];
var B등급 = [[1142922, 1], [3700347, 1], [1142032, 1], [1122254, 1], [1012283, 1], [1022232, 1], [1113055, 1], [2430686, 1], [2434981, 1]];
var C등급 = [[1142099, 1], [1142472, 1], [3700346, 1], [1112662, 1], [3700345, 1]];

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
	cm.sendSimple("저는 뽑기 전용 엔피시 입니다. \r\n\r\n#b#L1#황금단풍잎 전용뽑기");
    } else if(status == 1) {
	sel = selection;
	if(sel == 0) {
		cm.sendSimple("무슨 뽑기를 진행하시겠습니까?\r\n\r\n#b#L0#S 등급#l #L1#A 등급#l #L2#B 등급#l");
	} else if(sel == 1) {
		cm.sendSimple("무슨 뽑기를 진행하시겠습니까?\r\n\r\n#b#L0#A 등급#l #L1#B 등급#l #L2#C 등급#l");
	}
    } else if(status == 2) {
	state = selection;
	if(sel == 0) {
		if(state == 0) {
			cm.sendYesNo("S 등급 뽑기를 선택하셨습니다. 필요한 후원포인트는 7000  입니다. 계속 진행하시겠습니까?");
		} else if(state == 1) {
			cm.sendYesNo("A 등급 뽑기를 선택하셨습니다. 필요한 후원포인트는 4000 입니다. 계속 진행하시겠습니까?");
		} else { 
			cm.sendYesNo("B 등급 뽑기를 선택하셨습니다. 필요한 후원포인트는 2000 입니다. 계속 진행하시겠습니까?");
		}
	} else {
		if(state == 0) {
			cm.sendYesNo("A 등급 뽑기를 선택하셨습니다. 필요한 황금단풍잎은 50개 입니다. 계속 진행하시겠습니까?");
		} else if(state == 1) {
			cm.sendYesNo("B 등급 뽑기를 선택하셨습니다. 필요한 황금단풍잎은 30개 입니다. 계속 진행하시겠습니까?");
		} else { 
			cm.sendYesNo("C 등급 뽑기를 선택하셨습니다. 필요한 황금단풍잎은 10개 입니다. 계속 진행하시겠습니까?");
		}
	}
    } else if(status == 3) {
	if(sel == 0) {
		if(state == 0) {
			var rand = Randomizer.rand(0, S등급.length-1);
			var item = S등급[rand];
			if(cm.getPlayer().getRC() < 7000) {
				cm.sendOk("후원 포인트가 부족합니다."); cm.dispose(); return;
			}
			cm.sendSimple("아래의 아이템 중 하나를 선택하십시오.\r\n\r\n#L0##i"+물음표상자+"##l  #L1##i"+물음표상자+"##l  #L2##i"+물음표상자+"##l");
		} else if(state == 1) {
			var rand = Randomizer.rand(0, A등급.length-1);
			var item = A등급[rand];
			if(cm.getPlayer().getRC() < 4000) {
				cm.sendOk("후원 포인트가 부족합니다."); cm.dispose(); return;
			}
			cm.sendSimple("아래의 아이템 중 하나를 선택하십시오.\r\n\r\n#L0##i"+물음표상자+"##l  #L1##i"+물음표상자+"##l  #L2##i"+물음표상자+"##l");
		} else { 
			var rand = Randomizer.rand(0, B등급.length-1);
			var item = B등급[rand];
			if(cm.getPlayer().getRC() < 2000) {
				cm.sendOk("후원 포인트가 부족합니다."); cm.dispose(); return;
			}
			cm.sendSimple("아래의 아이템 중 하나를 선택하십시오.\r\n\r\n#L0##i"+물음표상자+"##l  #L1##i"+물음표상자+"##l  #L2##i"+물음표상자+"##l");
		}
	} else {
		if(state == 0) {
			var rand = Randomizer.rand(0, A등급.length-1);
			var item = A등급[rand];
			if(!cm.haveItem(황단, 50)) {
				cm.sendOk("황단이 부족합니다."); cm.dispose(); return;
			}
			cm.sendSimple("아래의 아이템 중 하나를 선택하십시오.\r\n\r\n#L0##i"+물음표상자+"##l  #L1##i"+물음표상자+"##l  #L2##i"+물음표상자+"##l");
		} else if(state == 1) {
			var rand = Randomizer.rand(0, B등급.length-1);
			var item = B등급[rand];
			if(!cm.haveItem(황단, 30)) {
				cm.sendOk("황단이 부족합니다."); cm.dispose(); return;
			}
			cm.sendSimple("아래의 아이템 중 하나를 선택하십시오.\r\n\r\n#L0##i"+물음표상자+"##l  #L1##i"+물음표상자+"##l  #L2##i"+물음표상자+"##l");
		} else { 
			var rand = Randomizer.rand(0, C등급.length-1);
			var item = C등급[rand];
			if(!cm.haveItem(황단, 10)) {
				cm.sendOk("황단이 부족합니다."); cm.dispose(); return;
			}
			cm.sendSimple("아래의 아이템 중 하나를 선택하십시오.\r\n\r\n#L0##i"+물음표상자+"##l  #L1##i"+물음표상자+"##l  #L2##i"+물음표상자+"##l");
		}
	}
    } else if(status == 4) {
	box = selection;
	if(sel == 0) {
		if(state == 0) {
				var item = S등급[Randomizer.rand(0, S등급.length-1)]; var item1 = S등급[Randomizer.rand(0, S등급.length-1)]; var item2 = S등급[Randomizer.rand(0, S등급.length-1)];
				cm.sendOk("S 등급 아이템 뽑기 결과입니다.\r\n\r\n#i"+item[0]+"#["+item[1]+"개]  #i"+item1[0]+"#["+item1[1]+"개]  #i"+item2[0]+"#["+item2[1]+"개]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4032838, 1);
				cm.getPlayer().loseRC(7000);
				cm.dispose(); return;
		} else if(state == 1) {
				var item = A등급[Randomizer.rand(0, A등급.length-1)]; var item1 = A등급[Randomizer.rand(0, A등급.length-1)]; var item2 = A등급[Randomizer.rand(0, A등급.length-1)];
				cm.sendOk("A 등급 아이템 뽑기 결과입니다.\r\n\r\n#i"+item[0]+"#["+item[1]+"개]  #i"+item1[0]+"#["+item1[1]+"개]  #i"+item2[0]+"#["+item2[1]+"개]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4001530, 1);
				cm.getPlayer().loseRC(4000);
				cm.dispose(); return;
		} else { 
				var item = B등급[Randomizer.rand(0, B등급.length-1)]; var item1 = B등급[Randomizer.rand(0, B등급.length-1)]; var item2 = B등급[Randomizer.rand(0, C등급.length-1)];
				cm.sendOk("B 등급 아이템 뽑기 결과입니다.\r\n\r\n#i"+item[0]+"#["+item[1]+"개]  #i"+item1[0]+"#["+item1[1]+"개]  #i"+item2[0]+"#["+item2[1]+"개]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4032125, 1);
				cm.getPlayer().loseRC(10);
				cm.dispose(); return;
		}
	} else {
		if(state == 0) {
				var item = A등급[Randomizer.rand(0, A등급.length-1)]; var item1 = A등급[Randomizer.rand(0, A등급.length-1)]; var item2 = A등급[Randomizer.rand(0, A등급.length-1)];
				cm.sendOk("A 등급 아이템 뽑기 결과입니다.\r\n\r\n#i"+item[0]+"#["+item[1]+"개]  #i"+item1[0]+"#["+item1[1]+"개]  #i"+item2[0]+"#["+item2[1]+"개]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4001530, 1);
				cm.gainItem(황단, -50);
				cm.dispose(); return;
		} else if(state == 1) {
				var item = B등급[Randomizer.rand(0, B등급.length-1)]; var item1 = B등급[Randomizer.rand(0, B등급.length-1)]; var item2 = B등급[Randomizer.rand(0, B등급.length-1)];
				cm.sendOk("B 등급 아이템 뽑기 결과입니다.\r\n\r\n#i"+item[0]+"#["+item[1]+"개]  #i"+item1[0]+"#["+item1[1]+"개]  #i"+item2[0]+"#["+item2[1]+"개]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4032125, 1);
				cm.gainItem(황단, -30);
				cm.dispose(); return;
		} else { 
				var item = C등급[Randomizer.rand(0, C등급.length-1)]; var item1 = C등급[Randomizer.rand(0, C등급.length-1)]; var item2 = C등급[Randomizer.rand(0, C등급.length-1)];
				cm.sendOk("C 등급 아이템 뽑기 결과입니다.\r\n\r\n#i"+item[0]+"#["+item[1]+"개]  #i"+item1[0]+"#["+item1[1]+"개]  #i"+item2[0]+"#["+item2[1]+"개]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4033571, 1);
				cm.gainItem(황단, -10);
				cm.dispose(); return;
		}
	}
    }
}	


