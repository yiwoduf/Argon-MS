importPackage(Packages.scripting)
var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
 rock = "#fUI/UIWindow.img/RpsGame/rock#"; 
 paper = "#fUI/UIWindow.img/RpsGame/paper#"; 
 scissor = "#fUI/UIWindow.img/RpsGame/scissor#"; 
 win = "#fUI/UIWindow.img/RpsGame/win#"; 
 lose = "#fUI/UIWindow.img/RpsGame/lose#"; 
 draw = "#fUI/UIWindow.img/RpsGame/draw#"; 
 ��밡�������� = ["#fUI/UIWindow.img/RpsGame/Frock#","#fUI/UIWindow.img/RpsGame/Fscissor#","#fUI/UIWindow.img/RpsGame/Fpaper#"]
 �ڱⰡ�������� = ["#fUI/UIWindow.img/RpsGame/rock#","#fUI/UIWindow.img/RpsGame/scissor#","#fUI/UIWindow.img/RpsGame/paper#"]
    cm.getPlayer().setKeyValue("TestSV",1)
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        cm.getPlayer().setKeyValue("Rockgiver",null);
        cm.sendGetText("�������� ���������� ��û�� �ϰڳ�?");
    } else if (status == 1) {
         target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getText())
         if ((target != null)) {
             target.setKeyValue("RockOk",null)
             target.setKeyValue("Rockgiver",""+cm.getPlayer().getName()+"");
             cm.getPlayer().setKeyValue("Rockresult",null);
             NPCScriptManager.getInstance().start(target.getClient(), 2135004);
             cm.sendSimple("�ʴ����� ���½��ϴ�.\r\n\r\n#L0# #b�����ߴ��� Ȯ��")
         } else {
             cm.sendOk("�Է��Ͻ� ĳ���Ͱ� �ڽ��̰ų�\r\n���� ä�ο� ���������� �ʽ��ϴ�.");
             cm.dispose();
         }
     } else if (status == 2) {
         if(target.getKeyValue("RockOk") == 1) {
             cm.sendSimple("��밡 ���������� ����� �����߽��ϴ�.\r\n�Ʒ����� �������ּ���.\r\n\r\n"
                          +"#L0#"+rock+"#l#L1#"+scissor+"#L2#"+paper+"#l");
         } else {
             cm.sendOk("���� �������� �ʾҽ��ϴ�.");
             status -= 2;
         }
     } else if (status == 3) {
         if (selection != -1) {
             cm.getPlayer().setKeyValue("Rockresult",selection)
         }
         cm.sendSimple("�����ǥ�� �ϰ� �ֽ��ϴ�...\r\n#L0# #b����� ��ǥ�Ǿ����� Ȯ��");
     } else if (status == 4) {
         if (target.getKeyValue("Rockresult") != null) {
            ����� = cm.getPlayer().getKeyValue("Rockresult")
            ����� = target.getKeyValue("Rockresult");
            if ((����� == 0 && ����� == 1) || (����� == 1 && ����� == 2) || (����� == 2 && ����� == 0)) {
                cm.sendOk("     #b���#k"+��밡��������[�����]+"VS"+�ڱⰡ��������[�����]+"#r#h #\r\n"+win);
            } else if (����� == �����) {
 		cm.sendOk("     #b���#k"+��밡��������[�����]+"VS"+�ڱⰡ��������[�����]+"#r#h #\r\n"+draw);
            } else {
		cm.sendOk("     #b���#k"+��밡��������[�����]+"VS"+�ڱⰡ��������[�����]+"#r#h #\r\n"+lose);
            }
            cm.dispose();
         } else {
            cm.sendOk("���� ����� ������� �ʾҽ��ϴ�.");
            status -=2;
         }
     }
}