var status;

function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            //cm.gainSponserItem(1112943,'[Ÿ��]',300,50,0);
	    //cm.gainRC(100000); //�Ŀ�����Ʈ
	    //cm.gainItem(4032101, 15); //�ؿ����� ����
            //cm.gainItem(4310198, 120); //�ؿ�ĳ�� ����[�ѹ�,����]
	    //cm.gainItem(2434981, 3); //�˻�ĳ�� ���� ����
	    //cm.gainItem(2430143, 10); //������ ȯ���� �Ҳ�
	    //cm.gainItem(2433424,-1);
	    cm.dispose();
        } else { 
            cm.dispose();
        }
    }
}