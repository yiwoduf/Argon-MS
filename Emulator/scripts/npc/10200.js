/* 	
Author : ������(Yein__@nate.com)
���� ���� ����. �� ������ USFM������ ���������� �˸��ϴ�.
����� �뵵�� ���°� ������� �ϼ���^^
*/
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
var status = -1;
var item = 4033915; // ���� �ǵ� X
var Lucky = 1402224; // ��Ű ������
var trycount = 1001; // �׸���� ����
var mesocount = 100000000; // �޼�
var Item = new Array(2000005, 2000005); // ���Ͻÿ� ������ ������


function action(mode, type, selection) {
    if (mode == 1 && status == 1) {
	trycount = trycount - 1;
	mesocount = mesocount + 50000000; // �߰��Ǵ� �޼�
	status = 0;
    } else if (mode == 1) {
	status++;
    } else {
	status = 999;
    }

    if (status == 0) {
		 text = "#r#e��#k#d�̹� �� ����� ������ : #b#i" + Lucky + "##z" + Lucky + "##k#n\r\n\r\n" + 
			"#r#e�޼ҳ� ������ â�� ������� ������, ü������ ������ ��Ȱ�ϰ� �̷������ ���� ���� �ֽ��ϴ�. �������ּ���.#k#n\r\n\r\n" +
			"���Ͻô� ĭ�� Ŭ���Ͻø� �������� �������� ȹ���մϴ�.\r\n" +
			"#b���Ͻô� ĭ�� Ŭ�� �� ���� �޼Ұ� �����Ǹ�,\r\nȽ���� �����Ҽ��� �޼� �������� ���� �����մϴ�.#k\r\n" +
			"���Ͻô� ĭ�� ����ּ���. \r\n#d#e(���� �޼� ������ " + mesocount + ")#k#n\r\n\r\n";
	    for(var meso = 1; meso < trycount; meso++) {
		text += "#L" + meso + "##i" + item + "##l     ";
	    }
		cm.sendSimple(text);
    } else if (status == 1) {
	Random = Math.floor(Math.random()*trycount);
	RandomItem = Item[Math.floor(Math.random() * Item.length)];
	if (cm.canHold(4000000) && cm.canHold(1000000) && cm.canHold(2000000) && cm.canHold(3000000) && cm.canHold(5000000)) {
	if (cm.getMeso() >= mesocount) {
	cm.gainMeso(-mesocount);
	if (selection == Random) {
	WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(6, "["+ cm.getPlayer().getName()+"] �Բ��� ������ ��� �����ۿ� ��÷�Ǽ̽��ϴ�! ��� �������ּ���!")); // ���� ä�ü����˸� �޼��� 
	cm.sendOk("#r�̹� ���� ����� �������� #e#i" + Lucky + "##z" + Lucky + "##n �������� ȹ���ϼ̽��ϴ�!\r\n#b���� �ٷ� ������ â�� Ȯ���غ�����!");
	cm.gainItem(Lucky, 1);
	cm.dispose();
	} else {
	cm.gainItem(RandomItem, 1);
	cm.sendYesNo("#b��Ÿ������ ����� �������� ��÷���� ���߽��ϴ�....\r\n#k#r�׷��� #e#i" + RandomItem + "##n#z" + RandomItem + "##n �������� ȹ���ϼ̽��ϴ�!\r\n#d�ٽ� �� �� ü������ �������ðھ��?\r\n#b(�ƴϿ� ��ư Ŭ�� �� ü������ �ʱ�ȭ�˴ϴ�.)");
	}
	} else {
	cm.playerMessage(6, "�޼Ұ� �����Ͽ� ü������ ���߿� ����˴ϴ�.");
	cm.sendOk("�޼Ұ� �����Ͽ� ü������ ���߿� ����˴ϴ�.");
	cm.dispose();
	}
	} else {
	cm.playerMessage(6, "�κ��丮 â�� �����Ͽ� ü������ ���߿� ����˴ϴ�.");
	cm.sendOk("�κ��丮 ������ �����Ͽ� ü������ ���߿� ����˴ϴ�.     ��� �κ��丮�� ������ �˳��ϰ� ���� �� �����ϴ�.");
	cm.dispose();
	}
    } else if (status == 2) {
	cm.sendOk("�̾��� �ʿ䵵���� �����̴��� ���������ϴ� ����");
	cm.dispose();
    } else if (status == 999) {
	cm.sendOk("��... ������ �� �������ּ���! �ƽ����� ��� ü������ �ϴ÷� ���ư� ���ȴ�ϴ� T.T...");
	cm.dispose();
    }
}