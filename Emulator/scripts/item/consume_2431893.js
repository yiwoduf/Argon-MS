/*

    ǻ�� �ҽ� ���� ��ũ��Ʈ �Դϴ�. (���� : ������)

    ���ǽþ��̵� : ?
    
    ���ǽ� �̸� : ������ ���

    ���ǽð� �ִ� �� : ?

    ���ǽ� ���� : ť������ ��ȯ


*/
var status;
var select;
var sel = 0;

function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var text = "#b#t2431893# #r#c2431893#��#k�� ������ �ֽ��ϴ�. ����ų� ����ɷ� �ο� �ֹ����� #r15��#k ������ ����ų� �̶�Ŭ ť��� #r25��#k�� �ʿ��մϴ�.\r\n";
                text += "#b#L2048307##i2048307# #z2048307##l\r\n";
		text += "#b#L5062500##i5062500# #z5062500##l\r\n";
           	cm.sendSimple(text);
        } else if(status == 1) {
		sel = selection;
		cm.sendYesNo("������ #b#z" + sel + "##k�� ��ȯ �Ͻðڽ��ϱ�?");
	} else if (status == 2) {
		if (!cm.haveItem(2431893, (sel == 2048307 ? 15 : 25))) {
			cm.sendOk("�����Ͻ� ���������� ��ȯ�ϱ⿡�� #z" + 2431893 + "#�� ���� �մϴ�.");
			cm.dispose();
			return;
		}
		if (cm.canHold(sel)) {
			cm.gainItem(2431893, -(sel == 2048307 ? 15 : 25));
			cm.gainItem(sel,1);
			cm.sendOk("�����Ͻ� ���������� ��ȯ�� �Ϸ� �Ǿ����ϴ�.");
			cm.dispose();
		} else {
			cm.sendOk("�κ��丮�� ������ ���� �մϴ�.");
			cm.dispose();
			return;
		}
        } else { 
            cm.dispose();
	    return;
        }
    }
}
