var status = 0;
var list = new Array(

/*앱솔랩스 전사 무기*/
new Array(1232109, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 데스페라도 
new Array(1302333, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 세이버
new Array(1312199, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 엑스
new Array(1322250, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 비트해머
new Array(1402251, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 브로드세이버
new Array(1412177, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 브로드엑스
new Array(1422184, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 브로드해머
new Array(1432214, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 피어싱스피어

/*앱솔랩스 전사 방어구*/
new Array(1004422, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 나이트헬름 
new Array(1102775, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 나이트케이프 
new Array(1082636, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 나이트글러브 
new Array(1052882, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 나이트슈트 
new Array(1073030, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 나이트슈즈 
new Array(1152174, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 나이트숄더 

/*앱솔랩스 법사 무기*/
new Array(1212115, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 샤이닝로드 
new Array(1372222, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 스펠링완드 
new Array(1382259, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 스펠링스태프 

/*앱솔랩스 법사 방어구*/
new Array(1004423, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 메이지크라운 
new Array(1102794, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 메이지케이프 
new Array(1082637, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 메이지글러브 
new Array(1052887, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 메이지슈트 
new Array(1073032, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 메이지슈즈 
new Array(1152176, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 메이지숄더 

/*앱솔랩스 궁수 무기*/ 
new Array(1452252, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 슈팅보우
new Array(1462239, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 크로스보우

/*앱솔랩스 궁수 방어구*/ 
new Array(1004424, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 아처후드 
new Array(1102795, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 아처케이프 
new Array(1082638, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 아처글러브 
new Array(1052888, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 아처슈트 
new Array(1073033, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 아처슈즈 
new Array(1152177, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 아처숄더 

/*앱솔랩스 도적 무기*/
new Array(1332274, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 슬래셔 
new Array(1472261, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 리벤지가즈 
new Array(1242116, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 에너지소드 
new Array(1342101, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 블레이드 
new Array(1362135, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 핀쳐케인 

/*앱솔랩스 도적 방어구*/
new Array(1004425, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 시프캡 
new Array(1102796, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 시프케이프 
new Array(1082639, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 시프글러브 
new Array(1052889, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 시프슈트 
new Array(1073034, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 시프슈즈 
new Array(1152178, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 시프숄더 

/*앱솔랩스 해젹 무기*/
new Array(1222109, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 소울슈터 
new Array(1482216, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 블로우너클 
new Array(1492231, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 포인팅건 
new Array(1532144, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // 앱솔랩스 블래스트캐논 

/*앱솔랩스 해젹 방어구*/
new Array(1004426, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 파이렛페도라 
new Array(1102797, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 파이렛케이프 
new Array(1082640, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 파이렛글러브 
new Array(1052890, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 파이렛슈트 
new Array(1073035, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // 앱솔랩스 파이렛슈즈 
new Array(1152179, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000)); // 앱솔랩스 파이렛숄더 

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
		if(cm.getPlayer().getKeyValue("S_1") != null) { cm.getPlayer().setKeyValue("S_1", 5) }
		if(cm.getPlayer().getKeyValue("S_2") != null) { cm.getPlayer().setKeyValue("S_2", 3) }
		var k = "#fUI/UIToolTip/Item/Equip/Star/Star#"
		var yk = "앱솔랩스 무기를 제작할수 있습니다 제작을 원하는 직업군을 선택해 주세요\r\n";

		yk += "#L0#"+k+" #e전사 앱솔랩스 템을 제작한다\r\n";
		yk += "#L1#"+k+" #e법사 앱솔랩스 템을 제작한다\r\n";
		yk += "#L2#"+k+" #e궁수 앱솔랩스 템을 제작한다\r\n";
		yk += "#L3#"+k+" #e도적 앱솔랩스 템을 제작한다\r\n";
		yk += "#L4#"+k+" #e해적 앱솔랩스 템을 제작한다\r\n";
		
		cm.sendSimple(yk);
		} else if (status == 1) {
		var category = selection == 0 ? "전사 앱솔랩스 템을" : selection == 1 ? "법사 앱솔랩스 템을" : selection == 2 ? "궁수 앱솔랩스 템을" : selection == 3 ? "도적 앱솔랩스 템을" : "해적 앱솔랩스 템을"
		var chat = "제작을 원하시는 "+category+" 선택하자. 아이템 위에 마우스를 올리면 아이템의 툴팁을 볼 수 있다.#b\r\n\r\n"
		if (selection == 0) {
		chat += "#e#r[앱솔랩스 전사 무기 제작]#k#n\r\n";
		for (i = 0; i < 8; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r[앱솔랩스 전사 방어구 제작]#k#n\r\n"
		for (i = 9; i < 14; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";

		} else if (selection == 1) {
		chat += "#e#r#e[앱솔랩스 법사 무기 제작]#k#n\r\n";
		for (i = 14; i < 17; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r#e[앱솔랩스 법사 방어구 제작]#k#n\r\n";
		for (i = 17; i < 23; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		}
		else if (selection == 2) {
		chat += "#e#r#e[앱솔랩스 궁수 무기 제작]#k#n\r\n";
		for (i = 23; i < 25; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r#e[앱솔랩스 법사 방어구 제작]#k#n\r\n";
		for (i = 25; i < 30; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		}
		else if (selection == 3) {
		chat += "#e#r#e[앱솔랩스 도적 무기 제작]#k#n\r\n";
		for (i = 31; i < 36; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r#e[앱솔랩스 도적 방어구 제작]#k#n\r\n";
		for (i = 36; i < 42; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		} else if (selection == 4) {
		chat += "#e#r#e[앱솔랩스 도적 무기 제작]#k#n\r\n";
		for (i = 42; i < 46; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r#e[앱솔랩스 도적 방어구 제작]#k#n\r\n";
		for (i = 46; i < 52; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";

		cm.sendSimple(chat);
	}
	
	else if (status == 2) {
		item = selection;
			if(selection < 3000) {
		var chat = "#b#z"+list[selection][0]+"##k를 만드려면 아래에 있는 재료와 약간의 수수료가 필요하다.\r\n\r\n#b"
		chat += "#i"+list[selection][1]+"# #z"+list[selection][1]+"# "+list[selection][2]+"개\r\n";
		chat += "#i"+list[selection][3]+"# #z"+list[selection][3]+"# "+list[selection][4]+"개\r\n";
		chat += "#i"+list[selection][5]+"# #z"+list[selection][5]+"# "+list[selection][6]+"개\r\n";
		chat += "#i4310156# #z4310156# "+list[selection][7]+"개\r\n";
		chat += "#i4031138# "+list[selection][8] / 10000+"만 메소";
		spirit = 1;
			} else {
		var chat = "#b#z"+list[selection][0]+"##k를 만드려면 아래에 있는 재료와 약간의 수수료가 필요하다.\r\n\r\n#b"
		chat += "#i"+list[selection][1]+"# #z"+list[selection][1]+"# "+list[selection][2]+"개\r\n";
		chat += "#i"+list[selection][3]+"# #z"+list[selection][3]+"# "+list[selection][4]+"개\r\n";
		chat += "#i"+list[selection][5]+"# #z"+list[selection][5]+"# "+list[selection][6]+"개\r\n";
		chat += "#i"+list[selection][7]+"# #z"+list[selection][7]+"# "+list[selection][8]+"개\r\n";
		chat += "#i"+list[selection][9]+"# #z"+list[selection][9]+"# "+list[selection][10]+"개\r\n";
		chat += "#i"+list[selection][11]+"# #z"+list[selection][11]+"# "+list[selection][12]+"개\r\n";
		chat += "#i4310156# #z4310156# "+list[selection][13]+"개\r\n";
		chat += "#i4031138# "+list[selection][14] / 10000+"만 메소";
		spirit = 2;
		}

		cm.sendNextS(chat, 2);
	}

	else if (status == 3) {
		if(spirit == 1) {
			if(cm.haveItem(list[item][1], list[item][2]) && cm.haveItem(list[item][3], list[item][4]) && cm.haveItem(list[item][5], list[item][6]) && cm.haveItem(4310156, list[item][7]) && cm.getMeso() > list[item][8]) {
				if(!cm.canHold(list[item][0])) {
				cm.sendNextS("인벤토리에 여유 공간이 없거나 제작하려는 아이템이 고유 아이템인 것 같다.", 2);
				cm.dispose();
				}
				else {
					if(list[item][0] < 1232109 || list[item][0] > 1432214) {
						cm.gainItem(list[item][0], 1);
						cm.gainItem(list[item][1], -list[item][2]);
						cm.gainItem(list[item][3], -list[item][4]);
						cm.gainItem(list[item][5], -list[item][6]);
						cm.gainItem(4310156, -list[item][7]);
						cm.gainMeso(-list[item][8]);
						cm.sendNext("#b#i"+list[item][0]+"# #z"+list[item][0]+"##k 아이템을 제작하는데 성공하였다. 인벤토리를 확인해보자.");

					} else {
						if(cm.getPlayer().getKeyValue("S_1") != 0) {
						cm.gainItem(list[item][0], 1);
						cm.gainItem(list[item][1], -list[item][2]);
						cm.gainItem(list[item][3], -list[item][4]);
						cm.gainItem(list[item][5], -list[item][6]);
						cm.gainItem(4310156, -list[item][7]);
						cm.gainMeso(-list[item][8]);
						cm.sendNext("#b#i"+list[item][0]+"# #z"+list[item][0]+"##k 아이템을 제작하는데 성공하였다. 인벤토리를 확인해보자.");
						} else {
						}
					}
				if(list[item][0] == 1152149 || list[item][0] == 1152150 || list[item][0] == 1152151 || list[item][0] == 1152152 )
					if(cm.getPlayer().getKeyValue("S_1") == 5) { cm.getPlayer().setKeyValue("S_1", 4) }
					else if(cm.getPlayer().getKeyValue("S_1") == 4) { cm.getPlayer().setKeyValue("S_1", 3) }
					else if(cm.getPlayer().getKeyValue("S_1") == 3) { cm.getPlayer().setKeyValue("S_1", 2) }
					else if(cm.getPlayer().getKeyValue("S_1") == 2) { cm.getPlayer().setKeyValue("S_1", 1) }
					else if(cm.getPlayer().getKeyValue("S_1") == 1) { cm.getPlayer().setKeyValue("S_1", 0) }
				cm.dispose();
				}
			}
			else {
			cm.sendNextS("재료가 부족하거나 수수료가 없다. 모두 모아온 후 다시 시도해보자.", 2);
			cm.dispose();
			}
		}
		else if(spirit == 2) {
		if(cm.getPlayer().getKeyValue("S_2") != 0) {
			if(cm.haveItem(list[item][1], list[item][2]) && cm.haveItem(list[item][3], list[item][4]) && cm.haveItem(list[item][5], list[item][6]) && cm.haveItem(list[item][7], list[item][8]) && cm.haveItem(list[item][9], list[item][10]) && cm.haveItem(list[item][11], list[item][12]) && cm.haveItem(4310156, list[item][13]) && cm.getMeso() > list[item][14]) {
				if(!cm.canHold(list[item][0])) {
				cm.sendNextS("인벤토리에 여유 공간이 없거나 제작하려는 아이템이 고유 아이템인 것 같다.", 2);
				cm.dispose();
				}
				else {
				cm.gainItem(list[item][0], 1);
				cm.gainItem(list[item][1], -list[item][2]);
				cm.gainItem(list[item][3], -list[item][4]);
				cm.gainItem(list[item][5], -list[item][6]);
				cm.gainItem(list[item][7], -list[item][8]);
				cm.gainItem(list[item][9], -list[item][10]);
				cm.gainItem(list[item][11], -list[item][12]);
				cm.gainItem(4310156, -list[item][13]);
				cm.gainMeso(-list[item][14]);
				cm.sendNextS("#b#i"+list[item][0]+"# #z"+list[item][0]+"##k 아이템을 제작하는데 성공하였다. 인벤토리를 확인해보자.", 2);
					if(cm.getPlayer().getKeyValue("S_2") == 3) { cm.getPlayer().setKeyValue("S_2", 2) }
					else if(cm.getPlayer().getKeyValue("S_2") == 2) { cm.getPlayer().setKeyValue("S_2", 1) }
					else if(cm.getPlayer().getKeyValue("S_2") == 1) { cm.getPlayer().setKeyValue("S_2", 0) }

				cm.dispose();
				}
			}
			else {
			cm.sendNextS("재료가 부족하거나 수수료가 없다. 모두 모아온 후 다시 시도해보자.", 2);
			cm.dispose();
			}
			}
			else {
			cm.dispose();
			}
		}
	}
}
}
}