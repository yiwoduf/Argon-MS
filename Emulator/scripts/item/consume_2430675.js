
var status = -1;
importPackage(Packages.tools.RandomStream);
importPackage(Packages.client.items);

function start() {
    status = -1;
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
        var leftslot = cm.getPlayer().getNX();
        if (leftslot >= 895000) {
            cm.sendOk("ĳ�� �ִ� �ѵ��� 90�� ĳ�� �Դϴ�. ���� ĳ�� ������ �ʰ��Ͽ� �� ���ڸ� �� �� �����ϴ�.");
            cm.dispose();
            return;
        }
        cm.gainItem(2430675, -1);
        var cash = 5000;
        cm.getPlayer().modifyCSPoints(1, cash, true);
        cm.dispose();
    }
}

