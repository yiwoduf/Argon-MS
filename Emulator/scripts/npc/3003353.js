

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
		var sungwoo = "#r#e#fn������� Extrabold#     ����      [ 60% ���ݷ� �ֹ��� ���� ������ ]#k#n\r\n";
		sungwoo += "��#b#L0##r500��#k#b�޼�#i2043201##k(#t2043201#)#b10��#k\r\n#l";
		sungwoo += "��#b#L1##r500��#k#b�޼�#i2042301##k(#t2042301#)#b10��#k\r\n#l";
		sungwoo += "��#b#L2##r500��#k#b�޼�#i2044001##k(#t2044001#)#b10��#k\r\n#l";
		sungwoo += "��#b#L3##r500��#k#b�޼�#i2044501##k(#t2044501#)#b10��#k\r\n#l";
		sungwoo += "��#b#L4##r500��#k#b�޼�#i2044301##k(#t2044301#)#b10��#k\r\n#l";
		sungwoo += "��#b#L5##r500��#k#b�޼�#i2044401##k(#t2044401#)#b10��#k\r\n#l";
		sungwoo += "��#b#L6##r500��#k#b�޼�#i2043701##k(#t2043701#)#b10��#k\r\n#l";
		sungwoo += "��#b#L7##r500��#k#b�޼�#i2043801##k(#t2043801#)#b10��#k\r\n#l";
		sungwoo += "��#b#L8##r500��#k#b�޼�#i2042101##k(#t2042101#)#b10��#k\r\n#l";
		sungwoo += "��#b#L9##r500��#k#b�޼�#i2044501##k(#t2044501#)#b10��#k\r\n#l";
		sungwoo += "��#b#L10##r500��#k#b�޼�#i2044501##k(#t2044501#)#b10��#k\r\n#l";
		sungwoo += "��#b#L11##r500��#k#b�޼�#i2044601##k(#t2044601#)#b10��#k\r\n#l";
		sungwoo += "��#b#L12##r500��#k#b�޼�#i2045201##k(#t2045201#)#b10��#k\r\n#l";
		sungwoo += "��#b#L13##r500��#k#b�޼�#i2043301##k(#t2043301#)#b10��#k\r\n#l";
		sungwoo += "��#b#L14##r500��#k#b�޼�#i2043401##k(#t2043401#)#b10��#k\r\n#l";

		sungwoo += "��#b#L15##r500��#k#b�޼�#i2044701##k(#t2044701#)#b10��#k\r\n#l";
		sungwoo += "��#b#L16##r500��#k#b�޼�#i2043601##k(#t2043601#)#b10��#k\r\n#l";
		sungwoo += "��#b#L17##r500��#k#b�޼�#i2042401##k(#t2042401#)#b10��#k\r\n#l";
		sungwoo += "��#b#L18##r500��#k#b�޼�#i2044801##k(#t2044801#)#b10��#k\r\n#l";
		sungwoo += "��#b#L19##r500��#k#b�޼�#i2044901##k(#t2044901#)#b10��#k\r\n#l";
		sungwoo += "��#b#L20##r500��#k#b�޼�#i2045301##k(#t2045301#)#b10��#k\r\n#l";
		sungwoo += "��#b#L21##r500��#k#b�޼�#i2042201##k(#t2042201#)#b10��#k\r\n#l\r\n"
		cm.sendSimple(sungwoo);

	} else if (status == 1) {
             if (selection == 0) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043201,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               
               }
} else if (selection == 1) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2042301,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 2) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044001,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 3) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044501,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 4) {
               if(cm.getMeso() >= 1000000){
               cm.gainItem(2044301,10);
               cm.gainMeso(-1000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               }
} else if (selection == 5) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044401,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 6) {
               if(cm.getMeso() >= 7000000){
               cm.gainItem(2043701,10);
               cm.gainMeso(-7000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
}
} else if (selection == 7) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043801,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 8) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2042101,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 9) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044501,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 10) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044501,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 11) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044601,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 12) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2045201,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 13) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043301,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 14) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043401,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 15) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044701,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 16) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043601,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 17) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2042401,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 18) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044801,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 19) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044901,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 20) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2045301,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
} else if (selection == 21) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2042201,10);
               cm.gainMeso(-5000000);
               cm.sendOk("�Ϸ�.");
               cm.dispose();
               } else {
               cm.sendOk("������ �����ϱ⿣, �޼Ұ� �����ѰŰ�����?");
               cm.dispose();
               }
}
}
}
}

