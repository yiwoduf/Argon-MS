var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
var status = 0;
var tsd = 10000;

importPackage(Packages.constants);

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
		var jessica = "#fn������� Extrabold##b�߰� ������ Ÿ�� Ƚ��#k �� ��ȭ�Ͽ� �Ѱ��� ���� �����غ�����.\r\n\r\n";
		jessica += "                                      #b�ʿ� ����Ʈ#k : #r"+cm.getTSD()+" P#k\r\n\r\n";
		jessica += "�� ��ȭ ����� �� #b�ʿ� ����Ʈ#k #r"+tsd+" P#k �� �ʿ��ϸ�#k\r\n  #b�߰� ������ Ÿ�� Ƚ��#k #r+ 1 Ÿ#k �� ��ȭ�˴ϴ�.\r\n";
		jessica += "#L0##b�߰� ������ Ÿ�� Ƚ�� ��ȭ�� �����ϰڽ��ϴ�.#k\r\n";
		cm.sendSimple(jessica);
} else {
cm.sendOk("#fn������� Extrabold##r�߰� ������ Ÿ�� Ƚ�� ��ȭ�� ���� 200 �̻� �̿� �����մϴ�.#k",9062004);
cm.dispose();
}
	} else if (status == 1) {
		if (selection == 0) {
			if (cm.getTSD() >= tsd) {
				cm.gainTSD(-tsd);
                                cm.getPlayer().gainAddDamageSin(1,true,"�ʿ�");
				cm.showEffect(false,"mercedes/frame");
				cm.showEffect(false,"mercedes/elfElder");
                                cm.playSound(false,"Field.img/StarPlanet/cashTry");
				cm.sendOk("#fn������� Extrabold##b��ȭ�� �߰� ������ Ÿ�� Ƚ�� : #r+ 1 Ÿ#k\r\n\r\n#d* ���� �߰� ������ Ÿ�� Ƚ�� : "+cm.getPlayer().getAddDamageS()+" Ÿ#k");
                                cm.dispose();
	                } else {
				cm.sendOk("#fn������� Extrabold##r����� �ʿ� ����Ʈ�� �����մϴ�.#k");
				cm.dispose();
		        } 
}
}
}
}