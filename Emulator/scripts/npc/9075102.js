var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    mobarraylist = ["1210100","1150001","0150001","2230107","2220100","2100107","2150003","2400100","4110302","4230102",
                    "4230112", "3401007", "3401003"]
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        if (cm.getPlayer().getKeyValue("maplemon_mobcode") == null) {
            ���� = 0;
            �� = "#fn������� Extrabold# ���� �����ø��� �����ñ���! ���� �������� �Ѱ� �帮���� ����! ���� ����� �����ø��� �����ϱ��?\r\n\r\n"
            mobarrayrandom = mobarraylist[Math.floor(Math.random() * mobarraylist.length)];
            ��+= "��������������������#fMob/"+mobarrayrandom+".img/stand/0#\r\n\r\n"
            ��+= "#fn������� Extrabold# �� �����ø��� �̸��� �����ֽðھ��?\r\n#b(�����ø��� �̸��� 4�ڷ� �����ּ���.)#k"
            cm.sendGetText(��);
        } else {
            cm.sendOk("#r#e�ظ����ø��� Ű��� ��� �� ���ǻ��ס�#n#k\r\n\r\n"
                           +"1. �����ø��� #i4032862##z4032862#�� �����մϴ�.\r\n" 
                           +"2. �����ø��� #z4032862#�� �����ϸ�, EXP�� ����ϴ�.\r\n"
                           +"3. �����ø��� ���� EXP�� �޼��ϸ�, �������� �մϴ�.\r\n"
                           +"4. �����ø��� ���� ������ �޼��ϸ�, ��ȭ�� �մϴ�.\r\n(��Ŀ Ȥ�� ������ ��ȭ������ ������ �� �ֽ��ϴ�.)\r\n"
                           +"5. ������ �� ��ȭ�� �ҽ� ���ݷ� �� ü���� �����մϴ�.\r\n"
                           +"6. �ڽ��� �����ø����� �ٸ� ������ ��Ʋ�� �����մϴ�.");
            cm.dispose();
        }
    } else if (status == 1) {
        if (���� == 0) {
             if (cm.getText().length() == 4) {
                 cm.sendOk("#fn������� Extrabold# ��! "+cm.getText()+"��� ���� ���� �̸��̱���!\r\n"
                           +"�׷� ���� ���� Ʈ���̳ʸ� �帱�״�, �����ø��� Ű�켼��\r\n\r\n"
                           +"#r#e�ظ����ø��� Ű��� ��� �� ���ǻ��ס�#n#k\r\n\r\n"
                           +"1. �����ø��� #i4032862##z4032862#�� �����մϴ�.\r\n" 
                           +"2. �����ø��� #z4032862#�� �����ϸ�, EXP�� ����ϴ�.\r\n"
                           +"3. �����ø��� ���� EXP�� �޼��ϸ�, �������� �մϴ�.\r\n"
                           +"4. �����ø��� ���� ������ �޼��ϸ�, ��ȭ�� �մϴ�.\r\n(��Ŀ Ȥ�� ������ ��ȭ������ ������ �� �ֽ��ϴ�.)\r\n"
                           +"5. ������ �� ��ȭ�� �ҽ� ���ݷ� �� ü���� �����մϴ�.\r\n"
                           +"6. �ڽ��� �����ø����� �ٸ� ������ ��Ʋ�� �����մϴ�.");
                 cm.getPlayer().setKeyValue("maplemon_mobname",cm.getText());
                 cm.getPlayer().setKeyValue("maplemon_mobcode",mobarrayrandom);
                 cm.getPlayer().setKeyValue("maplemon_moblevel",1);
                 cm.getPlayer().setKeyValue("maplemon_mobexp",0);
                 cm.getPlayer().setKeyValue("maplemon_currenthp",100)
                 cm.getPlayer().setKeyValue("maplemon_fullhp", 100);
                 cm.getPlayer().setKeyValue("maplemon_hunger",100);
                 cm.getPlayer().setKeyValue("maplemon_hungertime",new Date().getTime());
                 cm.getPlayer().setKeyValue("maplemon_acc1",50);
                 cm.getPlayer().setKeyValue("maplemon_acc2",100);
                 cm.gainItem(2433413, 1);
                 cm.dispose();
             } else {
                 cm.sendOk("�����ø��� �̸��� 4�ڷ� �� �ּž��ؿ�!");
                 cm.dispose();
            }
        }
    }
}