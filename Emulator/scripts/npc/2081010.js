var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
var ������ = "#fUI/UIToolTip/Item/Equip/Star/Star#";

importPackage(Packages.constants);

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
	if (cm.getPlayer().getMapId() == 100000000) {
		if (cm.getPlayer().getLevel() >= 150) {
		var jessica = "               #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" ĳ�� ���� "+��+"\r\n#fs10##Cgray#                          ���Ͻô� ĳ�� ���� ������ �������ּ���.#k\r\n#fs12#";
		jessica += "\r\n--------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L0##i2431872#  #b> 1 �� Cash ����#k#l\r\n\r\n       * #i2028048# #r- 3 �鸸 �޼� ����#k\r\n";
		jessica += ������+"#L1##i2431872#  #b> 10 �� Cash ����#k#l\r\n\r\n       * #i2028048# #r- 3 õ�� �޼� ����#k\r\n";
		jessica += ������+"#L2##i2431872#  #b> 100 �� Cash ����#k#l\r\n\r\n       * #i2028048# #r- 3 �� �޼� ����#k\r\n";
		jessica += "\r\n--------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica);
		} else {
		cm.sendOk("#fn������� Extrabold##rĳ�� ���� ���� 150 �̻� �̿� �����մϴ�.");
		cm.dispose();
        	}
	} else {
	cm.sendOk("#fn������� Extrabold##rĳ�� ������ ���忡���� �̿��� �����մϴ�.#k");
	cm.dispose();
	}	
	} else if (status == 1) {
	if (selection == 0) {
           if (cm.getMeso() >= 3000000) {
		cm.gainMeso(-3000000);
		cm.getPlayer().modifyCSPoints(1, parseInt(10000), true);
		cm.getPlayer().fakeRelog();
		cm.sendOk("#fn������� Extrabold##i2431872# #b1 �� Cash#k ������ �Ϸ� �Ǿ����ϴ�.");
		cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �޼Ұ� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 1) {
           if (cm.getMeso() >= 30000000) {
		cm.gainMeso(-30000000);
		cm.getPlayer().modifyCSPoints(1, parseInt(100000), true);
		cm.getPlayer().fakeRelog();
		cm.sendOk("#fn������� Extrabold##i2431872# #b10 �� Cash#k ������ �Ϸ� �Ǿ����ϴ�.");
		cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �޼Ұ� �����մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 2) {
           if (cm.getMeso() >= 300000000) {
		cm.gainMeso(-300000000);
		cm.getPlayer().modifyCSPoints(1, parseInt(1000000), true);
		cm.getPlayer().fakeRelog();
		cm.sendOk("#fn������� Extrabold##i2431872# #b100 �� Cash#k ������ �Ϸ� �Ǿ����ϴ�.");
		cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� �޼Ұ� �����մϴ�.#k");
		cm.dispose();
	   }
	}  
}
}
}