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
       cm.sendSimple("���ϴ� �׸��� ������ �ּ���.\r\n\r\n#L0#getKeyValue_User (������ Ű���� ���� �˾ƿ´�.)\r\n#L1#setKeyValue_User (������ Ű���� ���� �����Ѵ�.)\r\n#L2#�������\r\n#L3#�øʺ���")
    } else if (status == 1) {
       ���� = selection;
       cm.sendGetText("���� �̸� �Ǵ� �� �ڵ带 �����ּ���.\r\n\r\n(�ø� �����϶��� �� �ڵ�, �ٸ��� ���� �̸�)");
    } else if (status == 2) {
     if (���� == 3) {
        cm.resetMap(cm.getText());
        cm.sendOk("�Ϸ�.");
        cm.dispose();
     } else {
       if (cm.getText() != cm.getPlayer().getName()) {
           target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getText());
       } else {
           target = cm.getPlayer()
       }
       if (target != null) {
           if (���� == 2) {
               target.setKeyValue("permission_bok9",1);
               cm.sendOk("������û �㰡�� �����߽��ϴ�.");
               cm.dispose();
           } else if (���� == 0) {
               cm.sendGetText("���Ͻô� Ű������ �̸��� ���� �ּ���.\r\n\r\n(�߰� �������� ���ð� �����ø� rc_damage�� �Է��� �ּ���.)");
           } else if (���� == 1) {
               cm.sendGetText("�����ϰ� ���� Ű������ �̸��� �����ּ���.\r\n\r\n(�߰� �������� �����ϰ� �����ø� rc_damage�� �Է��� �ּ���.)");
           }
       } else {
            cm.sendOk("�Է��Ͻ� ĳ���Ͱ� ���� ä�ο� ���������� �ʽ��ϴ�.");
            cm.dispose();
       }
    }
    } else if (status == 3) {
       if (���� == 0) {
           cm.sendOk("Ÿ�� : "+target+"\r\nŰ���� �̸� : "+cm.getText()+"\r\nŰ���� ��"+target.getKeyValue(""+cm.getText()+"")+"");
           cm.dispose();
       } else {
           skv = cm.getText();
           cm.sendGetText("�����Ͻ� ���� �����ּ���.");
       }
    } else if (status == 4) {
       target.setKeyValue(""+skv+"",cm.getText());
       cm.sendOk("�Ϸ�.");
       cm.dispose();

    }
}