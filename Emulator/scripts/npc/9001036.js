var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
var status = 0;
var ad = new Array(10000000,15000000,20000000,25000000,30000000);
var tsd = 1000;

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
		var jessica = "#fn������� Extrabold##b�߰� ������#k �� ��ȭ�Ͽ� ���� ������ ���� �����غ�����.\r\n\r\n";
		jessica += "                                      #b�ʿ� ����Ʈ#k : #r"+cm.getTSD()+" P#k\r\n\r\n";
		jessica += "�� ��ȭ ����� �� #b�ʿ� ����Ʈ#k #r"+tsd+" P#k �� �ʿ��ϸ�#k\r\n     #r�ּ� + 1 õ�� ~ �ִ� + 3 õ��#k ���� #d���鸸 ����#k �� ��ȭ�˴ϴ�.\r\n";
		jessica += "#L0##b�߰� ������ ��ȭ�� �����ϰڽ��ϴ�.#k\r\n";
		cm.sendSimple(jessica);
} else {
cm.sendOk("#fn������� Extrabold##r�߰� ������ ��ȭ�� ���� 200 �̻� �̿� �����մϴ�.#k",9062004);
cm.dispose();
}
	} else if (status == 1) {
		if (selection == 0) {
			var adinfo = ad[Math.floor(Math.random() * ad.length)];
			if (cm.getTSD() >= tsd) {
				cm.gainTSD(-tsd);
                                cm.getPlayer().gainAddDamagein(adinfo,true);
				cm.showEffect(false,"mercedes/frame");
				cm.showEffect(false,"mercedes/elfElder");
                                cm.playSound(false,"Field.img/StarPlanet/cashTry");
				cm.sendOk("#fn������� Extrabold##b��ȭ�� �߰� ������#k : #r+ "+adinfo+"#k\r\n\r\n#d* ���� �߰� ������ �հ� : "+cm.getPlayer().getAddDamage()+"#k");
                                cm.dispose();
	                } else {
				cm.sendOk("#fn������� Extrabold##r����� �ʿ� ����Ʈ�� �����մϴ�.#k");
				cm.dispose();
		        } 
}
}
}
}