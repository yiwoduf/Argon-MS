/*
	�� ��ũ��Ʈ�� �������� �����Դϴ�.
	�������� KMS �������� ����������ϴ�.

	���̹� : ����(seonwoo__@naver.com)
*/

var status = 0;

function start() {
	status = -1;
	action(1,0,0);
}


function action(mode , type , selection){
	if (mode == -1) {
		cm.dispose();
	} else {
	if (mode == 0 && (status == 0)) {
		cm.sendOk("�ȳ��� ������.");
		cm.dispose();
	} 
	if (mode > 0)
	    status++;
	else
	    status--;
	if (status == 0) {
            cm.sendYesNo("#fn������� Extrabold# �������� ���ǽ��Դϴ�.\r\n#r������ : �Һ�ĭ1ĭ, ��ġĭ1ĭ ���ܵμ��� �����Ұ�")
        } else if (status == 1){
           if (cm.getPlayer().getKeyValue(cm.getNpc()+"_Pure") == null && cm.getPlayer().getLevel() == 250) {
		cm.gainRC(2000);
		cm.gainItem(3014005, 1);
		cm.gainItem(2434981, 1);
		cm.getPlayer().setKeyValue(cm.getNpc()+"_Pure", "1");
		cm.sendOk("�Ŀ�����Ʈ �� ���� �׸��� ������ ��Ų �̱���� ���޵Ǿ����ϴ�.");
		cm.dispose();
		    } else {
		        cm.sendOk("�̹� �޾Ұų� 250������ �ƴմϴ�.");
		        cm.dispose();
		    }
}
}
}