function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
	cm.dispose();
        return;
    } else 
	status++;
    if (status == 0) {
	if (cm.getPlayer().getEventInstance().getProperty("LudiPQ_Gate") == 1) {
	    cm.sendNext("#b������ �ҹٵ�#k �� ��� ����ġ�ôٴ�~ ����ؿ�!! ���� ���������� ���� ��Ż�� ������ �ϰڽ��ϴ�.");
	} else {
		cm.sendNext("�׹�° ���������� ���� ���� ȯ���մϴ�. �̰����� ���� ���� ������ ���Ͱ� �ֽ��ϴ�. �ٷ� #b������ �ҹٵ�#k��� �༮����. �� �༮�� �����߸��� ���� ������ ���ø� ���� ���������� ���� ��Ż�� ����帱�Կ�. #b������ �ҹٵ�#k �� �༮�� ���� �༮�� �ƴϴϱ� �����ϼž� �ǿ�.");
	    
	    
	    cm.dispose();
	}
    } else if (status == 1) {
	cm.environmentChange(true,"gate");
	cm.getEventInstance().setProperty("LudiPQ_Gate","3");
	cm.sendNextPrev("���� ���������� ���ϴ� ��Ż�� ���Ƚ��ϴ�.");
	cm.dispose();
    }
}