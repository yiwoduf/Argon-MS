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
            cm.sendYesNo("#fn������� Extrabold# �ʹݿ� ������ϽǰŰ��� �������� ����\r\n ����۰� �޼Ҹ� �����ص帮���ֽ��ϴ�. \r\n#e#r(�ɼ��� ��Т�)\r\n#r\r\n#b�������� �����ðڽ��ϱ�??\r\n#r������ : ���ĭ3ĭ, �Һ�ĭ1ĭ ���ܵμ��� �����Ұ�")
        } else if (status == 1){
           if (cm.getPlayer().getKeyValue(cm.getNpc()+"_Pure") == null) {
                    cm.gainMeso(500000000); // �ʱ��ں�(�޼�)
		    cm.gainItem(2430443,1); // 10���� ��� ����
		    cm.gainItem(1142075, 1); // �ʱ��ں�(����)
	 	    cm.gainItemAllStat(1082102, 1, 300, 30); // �ʱ��ں�(ĳ�ü�Ʈ)
		    cm.gainItemAllStat(1072153, 1, 300, 30); // �ʱ��ں�(ĳ�ü�Ʈ)
		    cm.getPlayer().setKeyValue(cm.getNpc()+"_Pure", "1");
		        cm.sendOk("�������� �����̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("�̹� �޾��ݾ�! ������̾�!!!");
		        cm.dispose();
		    }
}
}
}