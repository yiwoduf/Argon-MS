var status = 0;

function start() {
   status = -1;
   action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
	status++;
	else {
	cm.dispose();
	return;
}

	if (status == 0) {
	var chat =  "#r #fs13##fn������� Extrabold#AURORA ONLINE ���� �ý����Դϴ�\r\n";
	chat += "#r  #fs13##fn������� Extrabold#���� ���� ����� �̿��غ�����\r\n";
	chat += "#fn ����ü##b#L1#���ζ�¶����� ���������� �ްڽ��ϴ�.\r\n";
	chat += "#b#L2#���ζ�¶����� �⼮üũ�� �ϰڽ��ϴ�.\r\n";
	chat += "#b#L4#���� �˻�ĳ�ø� �̿��ϰڽ��ϴ�.\r\n";
	chat += "#b#L5#���ζ�¶��� �̱⼥�� �̿��ϰڽ��ϴ�.\r\n";
	chat += "#b#L6#���ζ�¶��� �������� �̿��ϰڽ��ϴ�.\r\n";
	chat += "#b#L7#��Ÿ�� ������ ���޹ްڽ��ϴ�.\r\n";
	chat += "#b#L9#�밡���� �ִ� ������ ����ڽ��ϴ� .\r\n";
	//chat += "#b#L8#���̵���ų�� ��ι��ڽ��ϴ�.\r\n";
         
	cm.sendSimpleS(chat,2);

	} else if (status == 1) {

	if (selection == 1) {
	cm.dispose();
	cm.openNpc(9001040);

	} else if (selection == 2) {
	cm.dispose();
	cm.openNpc(9330027);

	} else if (selection == 3) {
	cm.dispose();
	cm.openNpc(9070206);

	} else if (selection == 4) {
	cm.dispose();
	cm.openNpc(1530340);

	} else if (selection == 5) {
	cm.dispose();
	cm.openNpc(1012117);

	} else if (selection == 6) {
	cm.dispose();
	cm.openNpc(9000155);

	} else if (selection == 7) {
	cm.dispose();
	cm.openNpc(9000453);

	} else if (selection == 8) {
	cm.dispose();
	cm.openNpc(1103002);

	} else if (selection == 9) {
	cm.dispose();
	cm.openNpc(1052107);

		}
	}
}