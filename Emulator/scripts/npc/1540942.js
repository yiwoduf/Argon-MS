/*
@����(aledmfrns4952)
Ʈ���̵���
*/

importPackage(Packages.packet.creators);
importPackage(Packages.packet.skills);
importPackage(Packages.constants);
importPackage(Packages.handler.duey);

var status = -1;
var sel = 0;
var cash = "#fUI/SpiritNPC.img/BtAllReset/mouseOver/0#";
var vote = "#fUI/SpiritNPC.img/BtAllReset/pressed/0#";
var warp = "#fUI/SpiritNPC.img/backgrnd2#";
var shop = "#i5450003#";
var help = "#i4460004#";
var vmsms = "#i9330027#";
var nmsms = "#i4162001#";
var bfd = "#i3994735#";
var kss = "#fUI/UIToolTip/Item/Equip/Star/Star#";
var constants = "#i3994597#";
var bitbox = "#i1002140#";

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
       /// cm.sendOk("��ſ� ���� �Ǽ���.");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
        var rand = Math.random() * 1000;
	var chat = "    #ePlayer Info:#k#d Lv."+cm.getPlayer().getLevel()+" #k#d#h #��#k#d ȯ���մϴ�!#k\r\n";
	chat += "\r\n#L421421#"+kss+"��������������������������Ʈ���̵塪��������������������"+kss+"#l\r\n ";
	var chat = "#k���� �����÷����� #b" + cm.getConnect() + "#k��� �Բ��ϰ��ֽ��ϴ�.\r\n";
	chat += "\r\n\r\n"+bfd+"#L4#"+help+"#r�����ȳ�#l ";
	chat += "#L5#"+constants+"#d��ɰ���#k#l\r\n\r\n\r\n";
	if (cm.getPlayer().hasGmLevel(6)){

}
	cm.sendSimple(chat);
  } else if (status == 1) {
	if(selection == 0) {
		sel = 100;
		cm.sendYesNo("���� #b����#k�� �̿��Ͻðھ��? #r�ٷ� #e��#n�� ���������ֽ��ϴ�.#k");
	} else if (selection == 1) {
		cm.dispose();
		cm.openNpc(9000230);
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(9000011);
	} else if (selection == 774) {
		cm.dispose();
		cm.openNpc(9000357);
	} else if (selection == 3) {
		cm.warp(1000000, 0)
	} else if (selection == 4) {
		var notice = "#e#r[���� ������ �ȳ�]#k#n\r\n"
		notice += "��1. ���� ��� : GM����\r\n"
	notice += "#e#r[���� ��� �ȳ�]#k#n\r\n"
		notice += "��1. �ֿ� ��� ���ǽô� ��� �߾� ���忡 �ֽ��ϴ�.\r\n";
		notice += "��2. �����÷����� �ڵ����� �ý����� ����ϰ� �ֽ��ϴ�.\r\n";
                notice += "��3. �����÷����� �ֽ�ĳ����/�ֽ������� �����Դϴ�.\r\n";
		notice += "��4. �Ŀ��� ���������� �̿�Ǹ� ū���� �ɼ��ֽ��ϴ�.\r\n\r\n";
		notice += "#e#r[���� ���ǻ��� �ȳ�]#k#n\r\n"
		notice += "��1. ������ ��Ӿ� ��� �� �ο�(�ο�����)�� �� ��쿡�� ������ ������ �ʰ� #e���� ����#n�� ���� �� �ֽ��ϴ�.";
        notice += "\r\n\r\n#e#r[���� ����� �ȳ�]#k#n\r\n"
                notice += "��1. �����е鰣�� ���뵵 �ſ� �߿��մϴ� ������ ������� ������� #e�����÷��� ����#n�鿡�� ���� �����Ͻð� ���� �𸣰ڴ� �����ø� ����� ã���ּ���.";
		cm.sendNext(notice);
		cm.dispose();
	} else if (selection == 5) {
		var text = "�������÷��� #bLv."+cm.getPlayer().getLevel()+" #r#h ##k�� ȯ���մϴ�.\r\n\r\n";
		text += "��#e#r< �ΰ� ��� >#n\r\n";
                   text += "#L9001040#�����÷��� ��������#l\r\n";
                   text += "#L9330027#�����÷��� �⼮üũ#l\r\n";
		text += "#b#L9070206#�����÷��� ĳ������#l\r\n";
		text += "#L9070207#�����÷��� ����˻�#l\r\n";
                   text += "#L1012117#�����÷��� �̱⼥#l\r\n";
		text += "#L9000155#�����÷��� ������#l\r\n";
		text += "#L9000453#�����÷��� ��Ÿ��#l\r\n";
		text += "#L1103002#�����÷��� ���̵�#l\r\n";

                 
		cm.sendSimple(text);
	} else if (selection == 6) {
		cm.dispose();
		cm.openNpc(9090008);
	} else if (selection == 7) {
		cm.dispose();
		cm.openNpc(9900002);
	} else if (selection == 8) {
		cm.dispose();
		cm.openNpc(1052013);
	} else if (selection == 9) {
		cm.dispose();
		cm.openNpc(1052012);
	} else if (selection == 10) {
		cm.dispose();
		cm.openNpc(9900001);
	} else if (selection == 11) {
		cm.dispose();
		cm.openNpc(9090102);
	} else if (selection == 12) {
		cm.dispose();
		cm.openNpc(9000056);
	}
  } else if (status == 2) {
	if(sel == 100) {
	cm.dispose();
	cm.enterCS();
	} else {
	sel = selection;
	if (sel > 0) {
	cm.dispose();
	cm.openNpc(sel);
	}
	}
	} else {
		cm.dispose();
	}
}