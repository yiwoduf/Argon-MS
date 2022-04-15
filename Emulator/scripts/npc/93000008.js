load('nashorn:mozilla_compat.js');
importPackage(Packages.tools.RandomStream);
var status = -1;
var state, amount;
var needitem = 4033247;
var num = 20;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

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

    if (status == 0) {
	cm.sendSimple("안녕하세요, 저는 일반 강화 엔피시 입니다.\r\n\r\n#b#L0#올스텟을 강화하겠습니다.\r\n#L1#공 마를 강화하겠습니다.");
    } else if (status == 1) {
	slot = selection;
	sel = selection == 0 ? "올스텟" : "공마";
	var itemid = 0;
	var text = "#b#e"+sel+" 강화#n#k를 선택 하셨습니다.\r\n강화할 아이템을 선택 해 주세요.\r\n";
	for(i = 1; i < 101; i ++) {
		if(cm.getEquip(i)) {
			itemid = cm.getEquip(i).getItemId();
			text += "\r\n#L"+i+"##b#i"+itemid+"##t"+itemid+"##k";
		}
	}
	cm.sendSimple(text);
    } else if (status == 2) {
	if(!cm.haveItem(needitem, num)) {
		cm.sendOk("강화에 필요한 #b#z"+needitem+"##k이 부족합니다.");
		cm.dispose(); return;
	}
	eq = cm.getEquip(selection);
	state = owner(eq);
	if(check(eq)) {
		cm.sendYesNo("현재 강화상태 : #b"+state+"#k\r\n선택한 스텟 : "+sel+"\r\n다음 강화로 올라갈때 실패확률은 없으며 랜덤으로 수치가 주어집니다. 강화를 진행하시겠습니까?");
	}
    } else if (status == 3) {
	if(Randomizer.rand(1, 100) > chance(eq)) {
		cm.sendOk("아이템 강화에 실패했습니다.");
		cm.dispose(); return;
	}
	amount = java.lang.Integer.parseInt(stat(eq, sel));
	level = level(eq);
		eq.setOwner(level);
		if(sel.equals("올스텟")) {
			eq.setStr(eq.getStr() + amount); 
			eq.setDex(eq.getDex() + amount); 
			eq.setInt(eq.getInt() + amount); 
			eq.setLuk(eq.getLuk() + amount);
			cm.sendOk("강화에 성공하여 올스텟 "+amount+" 이 추가되고 "+level+" 이 되었습니다."); 
			cm.dispose(); return;
		} else {
			eq.setMatk(eq.getMatk() + amount);
			eq.setWatk(eq.getWatk() + amount);
			cm.sendOk("강화에 성공하여 공마 "+amount+" 이 추가되고 "+level+" 이 되었습니다."); 
			cm.dispose(); return;
		}
    }
}

function chance(eq) {
var chance;
	if(eq.getOwner().equals("1★")) {
 		chance = 90; // 1강에서 2강갈때 확률 ex) 10 : 10%
	} else if(eq.getOwner().equals("2★")) {
		chance = 80; // 2강에서 3강갈때 확률 ex) 10 : 10%
	} else if(eq.getOwner().equals("3★")) {
		chance = 70; // 3강에서 4강갈때 확률 ex) 10 : 10%
	} else if(eq.getOwner().equals("4★")) {
		chance = 60; // 4강에서 5강갈때 확률 ex) 10 : 10%
	} else if(eq.getOwner().equals("5★")) {
		chance = 50; // 5강에서 6강갈때 확률 ex) 10 : 10%
	} else if(eq.getOwner().equals("6★")) {
		chance = 40; // 6강에서 7강갈때 확률 ex) 10 : 10%
	} else {
		chance = 100; // 1강갈때 확률 ex) 10 : 10%
	}
	return chance;
}

function level(eq) {
var lev;
	if(eq.getOwner().equals("1★")) {
		lev = "2★";
	} else if(eq.getOwner().equals("2★")) {
		lev = "3★";
	} else if(eq.getOwner().equals("3★")) {
		lev = "4★";
	} else if(eq.getOwner().equals("4★")) {
		lev = "5★";
	} else if(eq.getOwner().equals("5★")) {
		lev = "6★";
	} else if(eq.getOwner().equals("6★")) {
		lev = "7★";
	} else {
		lev = "1★";	
	}
	return lev;
}
function stat(eq, sel) {
	var stat;
	if(eq.getOwner().equals("1★")) { // 1강 - 2강 넘어갈때 스텟
		stat = sel == "올스텟" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);
						//	↑↑↑ 이것들 처럼 밑에거도 동일하게

	} else if(eq.getOwner().equals("2★")) { // 2강 - 3강 넘어갈때 스텟
		stat = sel == "올스텟" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);	

	} else if(eq.getOwner().equals("3★")) { // 3강 - 4강 넘어갈때 스텟
		stat = sel == "올스텟" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);
	
	} else if(eq.getOwner().equals("4★")) { // 4강 - 5강 넘어갈때 스텟
		stat = sel == "올스텟" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);
	
	} else if(eq.getOwner().equals("5★")) { // 5강 - 6강 넘어갈때 스텟
		stat = sel == "올스텟" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);	

	} else if(eq.getOwner().equals("6★")) { // 6강 - 7강 넘어갈때 스텟
		stat = sel == "올스텟" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);	

	} else { // 1강으로 갈때 스텟
		stat = sel == "올스텟" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);	
	}
	return stat;	
}
function check(eq) {
	if(eq.getUpgradeSlots() > 0) {
		cm.sendOk("업그레이드 가능 횟수를 모두 소진해야 강화를 할 수 있습니다.");
		cm.dispose(); return;
	}
	if(eq.getOwner().equals("7★")) {
		cm.sendOk("해당 아이템은 강화를 더이상 할 수 없습니다.");
		cm.dispose(); return;
	}
	return true;
}

function owner(eq) {
	for(i = 1; i < 7; i++) {
		if(eq.getOwner().equals(i+"★")) {
			return eq.getOwner();
		}
	} 
	if(state == null) {
		return "#r강화안함#k";
	}
}

