

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
		var sungwoo = "#k���� ���� �̿뿡 ���� �����۵��� �Ǹ��ϰ��ִ� �Ҹſ�.\r\n\r\n#l";
		sungwoo += "#r#e     ���� ����[ ť�� ���� ������ ]#k#n\r\n";
		sungwoo += "��#b#L10##r1#k#b �޼ҷ� #i2460003##k(#t2460003#)#b 50�� ����#k\r\n#l";
		sungwoo += "��#b#L0##r30��#k#b �޼ҷ� #i5062000##k(#t5062000#)#b 30�� ����#k\r\n#l";
		sungwoo += "��#b#L1##r70��#k#b �޼ҷ� #i5062002##k(#t5062000#)#b 30�� ����#k\r\n#l";
		sungwoo += "��#b#L2##r100��#k#b �޼ҷ� #i5062005##k(#t5062005#)#b 30�� ����#k\r\n#l";
		sungwoo += "��#b#L3##r200��#k#b �޼ҷ� #i5062006##k(#t5062006#)#b 30�� ����#k\r\n#l";
		sungwoo += "��#b#L4##r300��#k#b �޼ҷ� #i5062009##k(#t5062009#)#b 30�� ����#k\r\n#l";
		sungwoo += "  #b#L13##r300��#k#b �޼ҷ� #i5062010##k(#t5062010#)#b 30�� ����#k\r\n#l\r\n";
		sungwoo += "#r#e      ��������[ �ֹ��� ���� ������ ]#k#n\r\n";
		sungwoo += "��#b#L5##r30��#k#b �޼ҷ� #i2049408##k(#t2049408#)#b 1�� ����#k\r\n#l";
		sungwoo += "��#b#L6##r10��#k#b �޼ҷ� #i2049301##k(#t2049301#)#b 1�� ����#k\r\n#l";
		sungwoo += "��#b#L7##r50��#k#b �޼ҷ� #i2049303##k(#t2049303#)#b 1�� ����#k\r\n#l";
		sungwoo += "��#b#L8##r500��#k#b �޼ҷ� #2049152##k(#t2049152#)#b 1�� ����#k\r\n#l";
		sungwoo += "��#b#L11##r2500��#k#b �޼ҷ� #i2049152##k(#t2049152#)#b 5�� ����#k\r\n#l";
		sungwoo += "��#b#L9##r700��#k#b �޼ҷ� #i2049360###k(#t2049360#)#b 1�� ����#k\r\n#l";
		sungwoo += "��#b#L12##r3500��#k#b �޼ҷ� #i2049360##k(#t2049360#)#b 5�� ����#k\r\n#l";
		cm.sendSimple(sungwoo);

	} else if (status == 1) {
             if (selection == 0) {
               if(cm.getMeso() >= 300000){
               cm.gainItem(5062000,30);
               cm.gainMeso(-300000);
               cm.sendOk("�̶�Ŭ ť�� 30���� �����ϼŽ��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               
               }
} else if (selection == 13) {
               if(cm.getMeso() >= 3000000){
               cm.gainItem(5062010,30);
               cm.gainMeso(-3000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 12) {
               if(cm.getMeso() >= 35000000){
               cm.gainItem(2049360,5);
               cm.gainMeso(-35000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 11) {
               if(cm.getMeso() >= 25000000){
               cm.gainItem(2049152,5);
               cm.gainMeso(-25000000);
               cm.sendOk("ȥ��");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 1) {
               if(cm.getMeso() >= 700000){
               cm.gainItem(5062002,30);
               cm.gainMeso(-700000);
               cm.sendOk("������ �̶�Ŭ ť�� 30���� �����ϼŽ��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 8) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2049152,1);
               cm.gainMeso(-5000000);
               cm.sendOk("ȥ���� �ֹ����� �����ϼŽ��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 9) {
               if(cm.getMeso() >= 7000000){
               cm.gainItem(2049360,1);
               cm.gainMeso(-7000000);
               cm.sendOk("���� ���ȭ �ֹ����� �����߽��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
}
} else if (selection == 10) {
               if(cm.getMeso() >= 1){
               cm.gainItem(2460003,50);
               cm.gainMeso(-1);
               cm.sendOk("������ 50���� �����ϼŽ��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               } 
} else if (selection == 2) {
               if(cm.getMeso() >= 1000000){
               cm.gainItem(5062005,30);
               cm.gainMeso(-1000000);
               cm.sendOk("�����¡ �̶�Ŭ ť�� 30���� �����ϼŽ��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               } 
} else if (selection == 3) {
               if(cm.getMeso() >= 2000000){
               cm.gainItem(5062006,30);
               cm.gainMeso(-2000000);
               cm.sendOk("�÷�Ƽ�� �̶�Ŭ ť�� 30���� �����ϼŽ��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               } 
} else if (selection == 4) {
               if(cm.getMeso() >= 3000000){
               cm.gainItem(5062009,30);
               cm.gainMeso(-3000000);
               cm.sendOk("���� ť�� 30���� �����ϼŽ��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               } 
} else if (selection == 5) {
               if(cm.getMeso() >= 300000){
               cm.gainItem(2049408,1);
               cm.gainMeso(-300000);
               cm.sendOk("����ɷ� �ο��ֹ��� 1���� �����ϼ̽��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               } 
} else if (selection == 6) {
               if(cm.getMeso() >= 100000){
               cm.gainItem(2049301,1);
               cm.gainMeso(-100000); 
              cm.sendOk("���ȭ �ֹ��� 1���� �����ϼ̽��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               } 
} else if (selection == 7) {
               if(cm.getMeso() >= 500000){
               cm.gainItem(2049303,1);
               cm.gainMeso(-500000);
               cm.sendOk("��� ���ȭ �ֹ��� 1���� �����ϼ̽��ϴ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               } 
}
}
}
}

