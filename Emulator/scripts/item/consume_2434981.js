
var status;
var select = -1;
var book  = new Array(2435160, 2434528, 2435158, 2435141, 2435222, 2435184, 2435166, 2435161, 2435169, 2435161, 2435140, 2434710, 2434574, 2435028, 2435043, 2434655, 2435159, 2432526, 2434248, 2433980, 2435182, 2433981, 2433913)

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
	    var text = "�ް� ���� ������ ��Ų�� �������� #r.#l\r\n\r\n#b";
		for (var i = 0; i < book.length; i++) {
		    text+="#L"+i+"##i"+book[i]+"# #z"+book[i]+"##l\r\n";
		}
		cm.sendSimple(text);
	} else if (status == 1) {
		select = selection;
		cm.sendYesNo("���� ������ ��Ų #b#z"+book[select]+"##k �¾�?");
	} else if (status == 2) {
	    if (cm.haveItem(2434981, 1)) {
		if (cm.canHold(3010705)) {
		    cm.sendOk("�κ��丮�� Ȯ���ϼ���");
		    cm.gainItem(2434981, -1);
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






