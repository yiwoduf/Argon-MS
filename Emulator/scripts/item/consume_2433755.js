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
       cm.sendSimple("���ϴ� �׸��� ������ �ּ���.\r\n\r\n#L0#getKeyValue_User\r\n#L1#setKeyValue_User\r\n#L2#�������")
    } else if (status == 1) {
       ���� = selection;
       cm.sendGetText("���� �̸��� �����ּ���.");
    } else if (status == 2) {
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
               cm.sendGetText("What KeyValue should I Get for you?");
           } else if (���� == 1) {
               cm.sendGetText("What KeyValue should I Set for you?");
           }
       } else {
            cm.sendOk("�Է��Ͻ� ĳ���Ͱ� ���� ä�ο� ���������� �ʽ��ϴ�.");
            cm.dispose();
       }
    } else if (status == 3) {
       if (���� == 0) {
           cm.sendOk("Ÿ�� : "+target+"\r\nŰ���� �̸� : "+cm.getText()+"\r\nŰ���� ��"+target.getKeyValue(""+cm.getText()+"")+"");
           cm.dispose();
       } else {
           skv = cm.getText();
           cm.sendGetText("Put the exact value you want to set");
       }
    } else if (status == 4) {
       target.setKeyValue(""+skv+"",cm.getText());
       cm.sendOk("Success");
       cm.dispose();

    }
}