
var status;
var select = -1;
var book  = new Array(1004808,1004809,1004810,1004811,1004812,1102940,1102941,1102942,1102943,1102944,1082695,1082696,1082697,1082698,1082699,1053063,1053064,1053065,1053066,1053067,1073158,1073159,1073160,1073161,1073162);

function start() {    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode <= 0) {
        cm.dispose();
    	return;
    } else {
        if (mode == 1)
            status++;
        if (status == 0) {
	    var text = "�ް� ���� 200�� ���� ��������#l\r\n\r\n#b";
		for (var i = 0; i < book.length; i++) {
		    text+="#L"+i+"##i"+book[i]+"# #z"+book[i]+"##l\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		select = selection;
		cm.sendYesNo("���� 200�� ���� #b#z"+book[select]+"##k �¾�?");
	} else if (status == 2) {
	    if (cm.haveItem(2430649, 1)) {
		if (cm.canHold(1004808)) {
		    cm.sendOk("�κ��丮�� Ȯ���ϼ���");
		    cm.gainItem(2430649, -1);
		    cm.gainItem(book[select], 1);
		    cm.dispose();
		} else {
		    cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		    cm.dispose();
		}
            } else {
		cm.sendOk("�����մϴ�.");
		cm.dispose();

}
	}
    }
}







