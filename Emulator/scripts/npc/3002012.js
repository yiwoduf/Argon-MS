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
            cm.sendYesNo("���� â�� �̿��Ͻðڽ��ϱ�? â��� 130�̻� ��밡��\r\n#r���� ��â��� 10���̻��� �־�� �ȵŸ� â��������� �����Ͽ��� ������ å�������ʽ��ϴ�.#k")
        } else if (status == 1){
           if (cm.getPlayer().getLevel() > 129) {
                   cm.sendStorage();
                   cm.dispose();
                   
           } else {
               cm.sendOk("â�� �̿��ϽǷ��� #b���� 130#k ���ĺ��� �����մϴ�.")
               cm.dispose();
           }
        }
        }
}