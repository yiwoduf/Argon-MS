var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
var status = 0;
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
		var jessica = "#fn������� Extrabold#ĳ������ #rMaxHP#k �� #bMaxMP#k �� ��ȭ�Ͻ� �� �ֽ��ϴ�.\r\n\r\n";
		jessica += "                                      #b�ʿ� ����Ʈ#k : #r"+cm.getTSD()+" P#k\r\n\r\n";
		jessica += "#L0##r[+ HP 5000]#k #d��ȭ#k - #b�ʿ� ����Ʈ#k #r"+tsd+" P#k\r\n";
		jessica += "#L1##b[+ MP 5000]#k #d��ȭ#k - #b�ʿ� ����Ʈ#k #r"+tsd+" P#k\r\n";
		cm.sendSimple(jessica);
} else {
cm.sendOk("#fn������� Extrabold##rMaxHP �� MaxMP ��ȭ�� ���� 200 �̻� �̿� �����մϴ�.#k",9062004);
cm.dispose();
}
	} else if (status == 1) {
		if (selection == 0) {
		if (cm.getPlayer().getStat().getMaxHp() <= 495000) {
			if (cm.getTSD() >= tsd) {
				cm.gainTSD(-tsd);
                                cm.setStat_s(5000,"HP");
				cm.showEffect(false,"phantom/back");
				cm.showEffect(false,"phantom/suu");
                                cm.playSound(false,"Field.img/rootabyss/undo");
				cm.sendOk("#fn������� Extrabold#����� #rHP 5000#k �� �����Ͽ����ϴ�.\r\n\r\n#d���� �� MaxHP : "+cm.getPlayer().getStat().getMaxHp()+"#k");
                                cm.dispose();
	                } else {
				cm.sendOk("#fn������� Extrabold##r��ȭ�� ���� �ʿ� ����Ʈ�� �����մϴ�.#k");
				cm.dispose();
		        }
		} else {
				cm.sendOk("#fn������� Extrabold##r����� HP �� �̹� �Ѱ�ġ�� ���� ������ ��ȭ�� �� �����ϴ�.#k");
				cm.dispose();
		}
		} else if (selection == 1) {
		if (cm.getPlayer().getStat().getMaxMp() <= 495000) {
			if (cm.getTSD() >= tsd) {
				cm.gainTSD(-tsd);
                                cm.setStat_s(5000,"MP");
				cm.showEffect(false,"phantom/back");
				cm.showEffect(false,"phantom/suu");
                                cm.playSound(false,"Field.img/rootabyss/undo");
				cm.sendOk("#fn������� Extrabold#����� #bMP 5000#k �� �����Ͽ����ϴ�.\r\n\r\n#d���� �� MaxMP : "+cm.getPlayer().getStat().getMaxMp()+"#k");
                                cm.dispose();
	                } else {
				cm.sendOk("#fn������� Extrabold##r��ȭ�� ���� �ʿ� ����Ʈ�� �����մϴ�.#k");
				cm.dispose();
		        }
		} else {
				cm.sendOk("#fn������� Extrabold##r����� MP �� �̹� �Ѱ�ġ�� ���� ������ ��ȭ�� �� �����ϴ�.#k");
				cm.dispose();
		}

		}
}
}
}