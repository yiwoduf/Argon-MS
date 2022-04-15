importPackage(Packages.tools.RandomStream);
importPackage(Packages.client.items);
importPackage(Packages.server.items);

var potential = [[40041, "STR : 6%"], [40042, "DEX : 6%"], [40043, "INT : 6%"], [40044, "LUK : 6%"], [40086, "올스텟 : 9%"], [10046, "MaxMP : 3%"], [20046, "MaxMP : 6%"], [30046, "MaxMP : 9%"], [40046, "MaxMP : 6%"], [10045, "MaxHP : 3%"], [20045, "MaxHP : 6%"], [30045, "MaxHP : 9%"], [40045, "MaxHP : 6%"], [20048, "회피치 : 6%"], [30048, "회피치 : 9%"], [40048, "회피치 : 6%"]];                                                                   
var status = -1;
var 필요후포 = 5000;
var 필요아이템코드 = 4033247;
var 필요아이템갯수 = 20;
var first = 0, need;
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
 try {
    if (mode == -1) {
	if(status == 2) {
		cm.fakeRelog();
		cm.updateChar();
	}
        cm.dispose();
        return;
    }
    if (mode == 0) {
	if(status == 2) {
		cm.fakeRelog();
		cm.updateChar();
	}
        cm.dispose();
	return;
    }
    if (mode == 1 && selection == 0 && status == 2) {
	status--;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
	var text = "잠재능력을 부여하실 캐시 아이템을 선택해 주세요.\r\n";
		for(i = 1 ; i < 100; i++) {
			if(cm.getEquip(i)) {
				if(ItemInformation.getInstance().isCash(cm.getEquip(i).getItemId())) {
					text += "#L"+i+"##i" + cm.getEquip(i).getItemId() + "#\r\n";
				}
			}
		}
	cm.sendSimple(text);
    } else if (status == 1) {
	se = selection;
	cm.sendSimple("무슨 어떤 것으로 큐브를 돌리시겠습니까?\r\n\r\n#b#L0#후포\r\n#L1##z"+필요아이템코드+"# "+필요아이템갯수+"개");
    } else if (status == 2) {
	if(first == 0) {
		need = selection;
	}
	first = 1;
	item = cm.getEquip(se);
	if(need == 0) {
		if(cm.getPlayer().getRC() < 필요후포) {
			cm.sendOk("후원포인트 5천원이 있는지 확인해주세요.");
			cm.dispose(); return;
		}
		cm.getPlayer().loseRC(필요후포);
	} else if(need == 1) {
		if(!cm.haveItem(필요아이템코드, 필요아이템갯수)) {
			cm.sendOk("황금색 단풍잎이 20개가 있는지 확인해주세요.");
			cm.dispose(); return;
		}
		cm.gainItem(필요아이템코드, -필요아이템갯수);
	}
	var rand1 = Randomizer.rand(0, potential.length-1);
	var rand2 = Randomizer.rand(0, potential.length-1);
	var rand3 = Randomizer.rand(0, potential.length-1);
	item.setState(20);
	item.setLines(3);
	item.setPotential1(potential[rand1][0]);
	item.setPotential2(potential[rand2][0]);
	item.setPotential3(potential[rand3][0]);
	var text = "#L1##fs13##e#r< After >#k#n\r\n";
		text += "#fs11##b첫번째 잠재 : "+potential[rand1][1]+"\r\n";
		text += "두번째 잠재 : "+potential[rand2][1]+"\r\n";
		text += "세번째 잠재 : "+potential[rand3][1]+"\r\n\r\n\r\n";
		text += "#Cgray##L0#큐브를 다시 돌리겠습니다.";
	cm.sendSimple(text);
    } else if(status == 3) {
	cm.fakeRelog();
	cm.updateChar();
	cm.sendOk("또 이용해 주세요~");
	cm.dispose(); return;
    }
}catch(e){
cm.sendOk(e);
cm.dispose();
}
}