
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
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        cm.sendYesNo("#b"+cm.getPlayer().getKeyValue("Rockgiver")+"#k�Բ���, ���������� ��� ��û�� �ϼ̽��ϴ�.\r\n�����Ͻðڽ��ϱ�?");
    } else if (status == 1) {
         cm.getPlayer().setKeyValue("Rockresult",null);
         cm.getPlayer().setKeyValue("RockOk",1)
         cm.sendSimple("�Ʒ����� �������ּ���.\r\n\r\n"
                          +"#L0#"+rock+"#l#L1#"+scissor+"#L2#"+paper+"#l");
    } else if (status == 2) {
         if (selection != -1) {
         cm.getPlayer().setKeyValue("Rockresult",selection);
         }
         cm.sendSimple(cm.getPlayer().getKeyValue("Rockresult")+"�����ǥ�� �ϰ� �ֽ��ϴ�...\r\n#L0# #b����� ��ǥ�Ǿ����� Ȯ��");
     } else if (status == 3) {
         target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getKeyValue("Rockgiver"))
         if (target.getKeyValue("Rockresult") != null) {
            Myresult = cm.getPlayer().getKeyValue("Rockresult")
            Yourresult = target.getKeyValue("Rockresult");
            if ((Myresult == 0 && Yourresult == 1) || (Myresult == 1 && Yourresult == 2) || (Myresult == 2 && Yourresult == 0)) {
                cm.sendOk("     #b���#k"+��밡��������[Yourresult]+"VS"+�ڱⰡ��������[Myresult]+"#r#h #\r\n"+win);
                
            } else if (Myresult == Yourresult) {
 		cm.sendOk("     #b���#k"+��밡��������[Yourresult]+"VS"+�ڱⰡ��������[Myresult]+"#r#h #\r\n"+draw);
                
            } else {
		cm.sendOk("     #b���#k"+��밡��������[Yourresult]+"VS"+�ڱⰡ��������[Myresult]+"#r#h #\r\n"+lose);
                
            }

            cm.dispose();
         } else {
            cm.sendOk("���� ����� ������� �ʾҽ��ϴ�.");
            status -=2;
         }
    }
}
