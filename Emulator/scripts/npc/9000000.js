var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (status == 1 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
	var lucky = "#e#b서버#k 메소버는 컨텐츠!\r\n#e#i4033334##k#n2500개에 #e#b점괘#n#k를 봐준다구.\r\n 한 번 해보는게 어때?\r\n\r\n";
	lucky += "#L1##e#b점괘#n#k를 뽑아본다.\r\n";
	lucky += "#L2##e#b점괘#n#k를 #e#b메소#n#k로 #e#b교환#n#k 받는다.\r\n";
	cm.sendSimple(lucky);
	}
    if (status == 1) {
	if (selection == 1) {
	if (cm.haveItem(4033334, 2500)) {
	 var rand = 1 + Math.floor(Math.random() * 15);
	    if (rand > 0 && rand < 6) {
		cm.gainItem(4031069, 1); //운수 말길 쪽지
		cm.sendOk("음..오늘은 안하는게 좋을거 같은걸");
		cm.gainItem(4033334, -2500);
		cm.dispose(); 
	    } else if (rand > 5 && rand < 10) {
		cm.gainItem(4031068, 1); //운수 길 쪽지 
		cm.sendOk("뭐..원금정돈 괜찮잖아?");
		cm.gainItem(4033334, -2500);
		cm.dispose();
	    } else if (rand > 9 && rand < 13) {
		cm.gainItem(4031067, 1); //운수 소길 쪽지
		cm.sendOk("오~ 열심히 노력한 보람이 있는걸? 축하해");
		cm.gainItem(4033334, -2500);
		cm.dispose();
	    } else if (rand > 12 && rand < 15) {
		cm.gainItem(4031066, 1); //운수 중길 쪽지
		cm.sendOk("와 너 운좀 좋은거 같다? 좀더 노력해봐!");
		cm.gainItem(4033334, -2500);
		cm.dispose();
	    } else if (rand > 14) {
		cm.gainItem(4031065, 1); //운수 대길 쪽지
		cm.sendOk("이야~ 운진짜좋은데? ㅋㅋ니가짱먹어라");
		cm.gainItem(4033334, -2500);
		cm.dispose(); 
	    }
	} else {
	  cm.sendOk("흐음... #e#i4033334##k 가#n 부족한건지 없는건지 #e#b확인#n#k해봐여...");
	  cm.dispose();
	}
    } if (selection == 2) {
		var paper = "\r\n"
		paper += "#L1##e#b[운수 말길 쪽지]#k 교환#n하기 - #e#b10000000#k메소\r\n";
		paper += "#L2##e#b[운수 길   쪽지]#k 교환#n하기 - #e#b15000000#k메소\r\n";
		paper += "#L3##e#b[운수 소길 쪽지]#k 교환#n하기 - #e#b25000000#k메소\r\n";
		paper += "#L4##e#b[운수 중길 쪽지]#k 교환#n하기 - #e#b50000000#k메소\r\n";
		paper += "#L5##e#b[운수 대길 쪽지]#k 교환#n하기 - #e#b100000000#k메소\r\n";
		cm.sendSimple(paper);
   }
} if (status == 2) {
		if (selection == 1){
			if (cm.haveItem(4031069) == true) {
				cm.gainItem(4031069, -1);
				cm.gainMeso(10000000);
				cm.sendOk("#e#b10,000,000#k메소#n로 #e#b교환#n#k이 #e#b완료#n#k되었습니다.");
				cm.dispose();
			}
			else {
				cm.sendOk("#e#b[운수 말길 쪽지]#k#n가 있는지 #e#b확인#n#k하시기 바랍니다.");
				cm.dispose();
			}
		} else if (selection == 2) {
			if (cm.haveItem(4031068) == true) {
				cm.gainItem(4031068, -1);
				cm.gainMeso(15000000);
				cm.sendOk("#e#b15,000,000#k메소#n로 #e#b교환#n#k이 #e#b완료#n#k되었습니다.");
				cm.dispose();
			}
			else {
				cm.sendOk("#e#b[운수 길 쪽지]#k#n가 있는지 #e#b확인#n#k하시기 바랍니다.");
				cm.dispose();
			}
		} else if (selection == 3) {
			if (cm.haveItem(4031067) == true) {
				cm.gainItem(4031067, -1);
				cm.gainMeso(25000000);
				cm.sendOk("#e#b25,000,000#k메소#n로 #e#b교환#n#k이 #e#b완료#n#k되었습니다.");
				cm.dispose();
			}
			else {
				cm.sendOk("#e#b[운수 소길 쪽지]#k#n가 있는지 #e#b확인#n#k하시기 바랍니다.");
				cm.dispose();
			}
		} else if (selection == 4) {
			if (cm.haveItem(4031066) == true) {
				cm.gainItem(4031066, -1);
				cm.gainMeso(50000000);
				cm.sendOk("#e#b50,000,000#k메소#n로 #e#b교환#n#k이 #e#b완료#n#k되었습니다.");
				cm.dispose();
			}
			else {
				cm.sendOk("#e#b[운수 중길 쪽지]#k#n가 있는지 #e#b확인#n#k하시기 바랍니다.");
				cm.dispose();
			}
		} else if (selection == 5) {
			if (cm.haveItem(4031065) == true) {
				cm.gainItem(4031065, -1);
				cm.gainMeso(100000000);
				cm.sendOk("#e#b100,000,000#k메소#n로 #e#b교환#n#k이 #e#b완료#n#k되었습니다.");
				cm.dispose();
			} 
			else {
				cm.sendOk("#e#b[운수 대길 쪽지]#k#n가 있는지 #e#b확인#n#k하시기 바랍니다.");
				cm.dispose();
			}  
		}
	}
}