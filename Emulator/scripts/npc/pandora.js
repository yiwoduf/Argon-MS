var status = -1;
var itemid_ = 0;

function start(itemid) {
    status = -1;
    itemid_ = itemid;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
	cm.sendYesNo("�ǵ����� ����� �ǵ����� ���ڸ� �������ϴ�.\r\n�ǵ����� ���ڸ� �� �� �� ����ðڽ��ϱ�?\r\n#e���� Fever������:#r" + cm.getPlayer().getFever() + "%#k#n\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v" + itemid_ + "##z" + itemid_ + "# 1��");
    } else if (status == 1) {
        if (!cm.haveItem(4170049) || !cm.haveItem(5060028)) {
            cm.sendOk("�ǵ����� ���ڸ� �����ϱ� ���ؼ� #b#z" + 5060028 + "##k�� " + "#b#z" + 4170049 + "##k�� �ʿ��մϴ�.");
            cm.dispose();
	    return;
        }
	cm.dispose();
	cm.sendPandora();
	return;
    }
}