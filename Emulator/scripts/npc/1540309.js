
/*
	�� ��ũ��Ʈ�� �������� �����Դϴ�.
	�������� KMS �������� ����������ϴ�.

	���̹� : ����(seonwoo__@naver.com)

	���ǽ� : 9000030
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
            cm.sendYesNo("#b�ȳ��ϼ���?#e ����Ʈ�¶���#n # ��Ÿ��#n�� �������� NPC �Դϴ�.\r\n����#e ����Ʈ�¶���#n�� #i4001715# #i4310119#�� ��������\r\n��� ���Դϴ�. \r\n#r\r\n#b�������� �����ðڽ��ϱ�?\r\n#r�����ĭ 1ĭ�� ���ܵμ���!")
        } else if (status == 1){
           if (cm.getPlayer().getKeyValue(cm.getNpc()+"_Pure") == null) {
            cm.gainItem(4310119, 3000); //
            cm.gainMeso(100000000);
            cm.gainItem(4001715, 1);
            cm.getPlayer().setKeyValue(cm.getNpc()+"_Pure", "1");
		        cm.sendOk("�������� �����̽��ϴ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("�̹� �����̽��ϴ�.");
		        cm.dispose();
			}
		}
	}
}
}