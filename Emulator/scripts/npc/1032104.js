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
            cm.sendYesNo("#fn������� Extrabold# �Ŀ�����Ʈ �̺� ������!!!\r\n\r\n3�� 1�ϱ��� �����մϴ�^^\r\n#r������ : ���ĭ3ĭ, �Һ�ĭ1ĭ ���ܵμ��� �����Ұ�")
        } else if (status == 1){
           if (cm.getPlayer().getKeyValue(cm.getNpc()+"_Pure") == null) {
            //cm.gainRC(1000);
		    cm.getPlayer().setKeyValue(cm.getNpc()+"_Pure", "1");
		        cm.sendOk("īī���� @���ζ�¶��� ģ�� �ֽð�\r\n�� ȭ���� ĸ���ؼ� �����ֽñ� �ٶ��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("�̹� �޾��ݾ�! ������̾�!!!");
		        cm.dispose();
		    }
}
}
}