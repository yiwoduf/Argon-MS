var status = -1;


function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	}
	status--;
    }
    if (status == 0) {
	var chat = "�α�������Ʈ�� ���迡 ������ �Ǵ� �������� ��ȯ �ص帮�� �ֽ��ϴ�. �ð��� ������ õõ�� ���� ������.\r\n\r\n" + cm.getPlayer().getName() + "���� ���� �α��� ����Ʈ : #r" + cm.getPlayer().getLoginPoint() + "#k#n\r\n\r\n#L0##b�α��� ����Ʈ�� �������� ��ȯ �ϰڽ��ϴ�.#l");
	cm.sendSimple(chat);
	cm.dispose();
    }
}
