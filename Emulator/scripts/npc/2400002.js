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
	    if (cm.getPlayer().getLevel() >= 150) {
		var jessica = "               #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" â�� �̿� "+��+"\r\n#fs10##Cgray#                          ���Ͻô� â�� �̿� ���θ� �������ּ���.#k#fs12#\r\n\r\n";
		jessica += "#fs14##d�� â�� �̿��� ���ؼ��� �Ʒ��� ������ �ʿ��մϴ�.#k#fs12#\r\n\r\n";
		jessica += "#r1. â�� �̿��� ���忡���� �̿��� �����մϴ�.\r\n";
		jessica += "2. â�� �̿��� ���� 150 �̻� �̿��� �����մϴ�.\r\n";
		jessica += "3. â�� �̿�� 1 ȸ 500 �� �޼Ұ� �����˴ϴ�.#k\r\n";
		jessica += "#L0##b���� �ٷ� â�� �̿��ϰڽ��ϴ�.#k\r\n";

		cm.sendSimple(jessica);
	} else {
	cm.sendOk("#fn������� Extrabold##râ�� �̿��� ���� 150 �̻� �̿� �����մϴ�.");
	cm.dispose();
        }
	} else if (status == 1) {
	if (selection == 0) {
           if(cm.getPlayer().getLevel() >= 150 && cm.getPlayer().getMapId() == 100000000 && cm.getPlayer().getMeso() >= 5000000) {
			cm.gainMeso(-5000000);
			cm.sendStorage();
			cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##dâ�� �̿��� ���ؼ��� �Ʒ��� ������ �ʿ��մϴ�.#k\r\n\r\n#r1. â�� �̿��� ���忡���� �̿��� �����մϴ�.\r\n2. â�� �̿��� ���� 150 �̻� �̿��� �����մϴ�.\r\n3. â�� �̿�� 1 ȸ 500 �� �޼Ұ� �����˴ϴ�.#k");
		cm.dispose();
	   }
	}
}
}
}