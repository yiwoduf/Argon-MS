var status = 0;
var sel = -1;

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
	cm.sendSimple("#fn������� Extrabold#���� ��뿡������ ������.. Į.. ���ڷ�..\r\n���� �����ڵ鿡�� ���� Ư���� ���� �������ְ� ����..\r\n\r\n#d* ���� �ٷ� �̳� �����Ƽ�� ���� �Ͻðڽ��ϱ�?#k\r\n\r\n#r[+] �Ҹ� ������ :#k #b��Ӹ��� ����#k #r200 ��#k\r\n#L0##b���� �ٷ�.. �̳� �����Ƽ�� �����ҰԿ�..#k");
} else if (status == 1) {
if (selection == 0) {
	if (cm.getPlayer().getInnerLevel() >= 4) {
		cm.sendOk("#fn������� Extrabold##r���� ��� �̳� �����Ƽ�� ����Ǿ� �ֽ��ϴ�.#k");
		cm.dispose();
		return;
	}
	     if (cm.haveItem(4310129, 200)) {
		cm.gainItem(4310129, -200);
		cm.getPlayer().innerLevelUp();
		cm.sendOk("#fn������� Extrabold##b���������� �̳� �����Ƽ +1 ĭ�� ���� �Ǿ����ϴ�.#k");
		cm.dispose();
            } else {
                cm.sendOk("#fn������� Extrabold##r��Ӹ��� ������ �����Ͻ� �� ��������?#k");
                cm.dispose();
            }
} 
}
}
}