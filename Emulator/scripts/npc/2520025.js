var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        �� = "#e#r����#n#k #b#h0##k���� #k #e#b�Ŀ�����Ʈ #r"+cm.getRC()+"#b��#n#k\r\n\r\n#r���� #b#h0##k���� #k #e#r�߰�������#n#k #e#d"+cm.getPlayer().getRCDamage()+"#b#n#k\r\n\r\n#e�Ŀ� ����Ʈ�� �������� ���� �帮�� �ֽ��ϴ�.#k\r\n#e#r#n#k\r\n\r\n";
        ��+= "#L0# �߰��������� �����ϰڽ��ϴ�."
        cm.sendSimple(��);
    } else if (status == 1) {
        if (Number(cm.getPlayer().getRCDamage()) + Number(cm.getRC() * 10000) >= 9220000000000000000) {
            �Ѱ� = (9220000000000000000 - cm.getPlayer().getRCDamage()) / 10000;
        } else {
             �Ѱ� = cm.getRC()
        }
        �� = "����Ͻð� ���� �Ŀ�����Ʈ�� ���� �Է��� �ּ���.\r\n������ #b#e1#k#n �Ŀ�����Ʈ�� #b#e10000#k#n �߰� �������Դϴ�.\r\n\r\n"
        ��+= "���� #h #���� ���� ������ �߰��������� ����\r\n				[#r#e"+�Ѱ�+"#k#n�Դϴ�.]";
        cm.sendGetNumber(��,1,1,�Ѱ�)
    } else if (status == 2) {
        cm.loseRC((selection));
        plus = Number(cm.getPlayer().getRCDamage()) + Number(selection * 10000)
        cm.getPlayer().setKeyValue("rc_damage", plus);
        cm.sendOk(""+selection+"�Ŀ�����Ʈ�� ����Ͽ� "+selection * 10000+"�������� �߰��Ͽ����ϴ�.\r\n�� ������ : "+plus);
        cm.dispose();
    }
}