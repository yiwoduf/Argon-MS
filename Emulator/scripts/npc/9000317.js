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
	    if (cm.getPlayer().getLevel() >= 200) {
		var jessica = "            #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" �Ǽ��縮 ���� "+��+"\r\n#fs10##Cgray#                                  ���Ͻô� ��� �������ּ���.#k#fs12#\r\n\r\n";
		jessica += "--------------------------------------------------------------------------------\r\n";
		jessica += ������+"#L0##i1122017# #b#z1122017##k #d1 �ϱ�#k#l\r\n\r\n       * #i4310129# #r- 100 �� ����#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica);
	} else {
	cm.sendOk("#fn������� Extrabold##r�Ǽ��縮 ������ ���� 200 �̻� �̿� �����մϴ�.",9062004);
	cm.dispose();
        }
	} else if (status == 1) {
	if (selection == 0) {
           if(cm.haveItem(4310129, 100)) {
	   if (cm.canHold(1122017)) {
              cm.gainItem(4310129, -100);
              cm.gainItemPeriod(1122017, 1, 1);
	      cm.sendOk("#fn������� Extrabold##i1122017# #b#z1122017##k #d1 �ϱ�#k ������ �Ϸ� �Ǿ����ϴ�.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##r���Ÿ� ���� ��Ӹ��� ������ �����մϴ�.#k");
		cm.dispose();
	   }
}
}
}
}