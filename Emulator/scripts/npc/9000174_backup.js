/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Pure Online Development Source Script)

	���ŷâ�� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 9000178

	���ǽ� �̸� : ��ü�Ҹ��� ������

	���ǽð� �ִ� �� : ��׽ý� : ��׽ý� (100000000)

	���ǽ� ���� : ��ȥ������
        QS2 += "\r\n#fUI/UIWindow2.img/MapleStyle/RewardPopup/backgrnd2#\r\n"

*/

var status = 0;
importPackage(Packages.server);
importPackage(Packages.constants);
importPackage (java.util);
importPackage (Packages.tools);
importPackage (Packages.server.quest);
importPackage(java.awt);
importPackage(java.lang);
importPackage(Packages.client.inventory);
importPackage(Packages.client.skills);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(Packages.client);
importPackage(Packages.tools.RandomStream);

var selected = 0;
var check = 0;
var sel = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
      if (status == 0) {
        var str = "������� ���մϴ�. �ΰ��̶� ������ ���Ѱܺ��� \r\n�ڽ��� ������� �ȴٰ�. ��������ʽ��ϱ�?\r\n�� ���� ���⿡ ������ ����Ͱ��ƿ�.#b\r\n";
        str += "\r\n#fUI/UIWindow2.img/UtilDlgEx/list1#"
        str += "\r\n#L79#����������Ʈ�� �����ϰڽ��ϴ�.#l\r\n";
        str += "#L82#�������� ���ŷ� ��ȯ�ϰ�ͽ��ϴ�.#l\r\n";
        str += "#L81#���谡Ÿ��Ʋ�� ȹ���ϰ�ͽ��ϴ�.#l\r\n";
        str += "#L84#�ñ׳ʽ�Ÿ��Ʋ�� ȹ���ϰ�ͽ��ϴ�.#l\r\n";
        str += "#L85#����Ÿ��Ʋ�� ȹ���ϰ�ͽ��ϴ�.#l\r\n\r\n";
        str += "\r\n#fUI/UIWindow2.img/UtilDlgEx/list4#"
	str += "\r\n#L92# �ҿ���� ������ �ް� �ͽ��ϴ�.#l";
	str += "\r\n#L91# ��Ÿ�� ����Ʈ�� �����ϰ�ͽ��ϴ�.#l";
        str += "\r\n#L89# Ȳȥ�� �丮�� ����Ʈ�� �����ϰ�ͽ��ϴ�.#l";
        cm.sendSimple(str);
     } else if (status == 1) {
	if(selection == 92) {
	sel = 1;
	cm.sendSimple(cm.SoulItemList(cm.getClient(),"� �������� ������ ���ðڽ��ϱ�."));
	} else if(selection == 91) {
	if(cm.getPlayer().getLevel() >= 125) {
	if(cm.getPlayer().getKeyValue("luta") == null) {
	check = 1;
	cm.sendYesNo("#b������Ʈ#k ���� #b" + cm.getPlayer().getName() + "#k �Կ��� ���� �빫�� �ִٰ��մϴ�.\r\n(����Ʈ�� �����Ͻðڴٸ� '��'  ��ư�� �����ּ���)");
	} else {
	cm.dispose();
	cm.openNpc(1103005);
	}
	} else {
	cm.sendOk("#b��Ÿ�� ����Ʈ#k�� ���� 125���� ������ �����մϴ�.");
	cm.dispose();
	}
	} else if (selection == 86) {
     if (cm.getQuestStatus(4310) == 0) { 
            cm.completeQuest(4310);
     }
     if (cm.getQuestStatus(4311) == 0) { 
            cm.startQuest(4311);
     }
     if (cm.getQuestStatus(4311) == 1) { 
       cm.dispose();
       cm.warp(231010000, 1);
       cm.sendOk("���ɼ����� �����帮�ڽ��ϴ�.��ſ�ð� �ǽʽÿ�.");
     } else {
       cm.sendOk("���� ���谡���� ���ɼ� ����Ʈ�� �����Ҽ������ϴ�.");
       cm.dispose();
     }       
     } else if (selection == 90) {
     if (cm.getQuestStatus(31901) == 2) { 
       cm.dispose();
       cm.warp(913050010, 1);
       cm.sendOk("�����帮�ڽ��ϴ�.��ſ�ð� �ǽʽÿ�.");
     } else {
       cm.sendOk("��������Ʈ�� �Ϸ�����ʾҽ��ϴ�.");
     }
     } else if (selection == 89) {
     if (cm.getQuestStatus(31900) == 0) { 
            cm.completeQuest(31900);
     }
     if (cm.getQuestStatus(31901) == 0) { 
            cm.startQuest(31901);
     }
     if (cm.getQuestStatus(31901) == 1) { 
       cm.dispose();
       cm.warp(102000003, 1);
       cm.sendOk("�����帮�ڽ��ϴ�.��ſ�ð� �ǽʽÿ�.\r\n���Ŀ� ���� �����ø� Ȳȥ�� �丮������ �̵��˴ϴ�.");
     } else if (cm.getQuestStatus(31901) == 2) { 
       cm.dispose();
       cm.warp(273000000, 1);
       cm.sendOk("�����帮�ڽ��ϴ�.��ſ�ð� �ǽʽÿ�.");
     } else if (cm.getQuestStatus(31901) == 1) { 

     } else {
       cm.sendOk("���� ���谡���� ����Ʈ�� �����Ҽ������ϴ�.");
       cm.dispose();
     }       


     } else if (selection == 87) {
     if (cm.getQuestStatus(4327) == 2 && cm.getQuestStatus(4311) == 1) {
      // cm.Ư�������ۿ���(1112135);
       cm.sendOk("����Ʈ�� �Ϸ�Ǿ����ϴ�."); 
       cm.completeQuest(4311);
       cm.dispose();
     } else {
     if (cm.getQuestStatus(4327) == 0 || cm.getQuestStatus(4327) == 1) { 
       cm.sendOk("�̿Ϸ� ����Ʈ�� �ֽ��ϴ�.");
       cm.dispose();
     } else if (cm.getQuestStatus(4311) == 2) { 
       cm.sendOk("�̹̿Ϸ��Ͽ����ϴ�.");
       cm.dispose();
     }
     }

     } else if (selection == 88) {
     if (cm.getQuestStatus(3500) == 0) { 
            cm.startQuest(3500);
     }
       cm.warp(270000000);
       cm.dispose();
       cm.sendOk("�����п����� �����帮�ڽ��ϴ�.��ſ�ð� �ǽʽÿ�.");
     } else if (selection == 82) {
        var QS7 = "�������� ���Ÿ� �������Ű���?";
        QS7 += "\r\n������ ��Ŵٸ� ���ϰ� �ŷ��� ���������Ƿ���?\r\n"
     if (cm.haveItem(4000659, 1) && cm.haveItem(4033311, 1) && cm.haveItem(4033312, 1) && cm.haveItem(4033302, 1) && cm.haveItem(4033303, 1) && cm.haveItem(4033304, 1)) {
        QS7 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
        QS7 += "\r\n�������� ���Ÿ� ������ �����Ű�����.\r\n"
        QS7 += "�̷��� ���� �������� ���Ŵ� ó�����°Ͱ��ƿ�!\r\n"
     } else {
        QS7 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k\r\n"
     }
        QS7 += "#k\#r#L60##b#v4000659#1��#k,#b#v4033311#1��#k,#b#v4033312#1��#k\r\n,#b#v4033302#1��#k,#b#v4033303#1��#k,#b#v4033304#1��#k\r\n #r(���� : ��Į�� ���������� )#k#l\r\n"
        cm.sendSimple(QS7);
     } else if (selection == 83) {
        var QS = "\r\n������ �̾߱�� ������ �����ϰ� �ִٴ°��� �˽ô°���?\r\n";
        QS += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k"
        QS += "\r\n������ ���̾߱⸦ �˷��ֽ��� �����Ƿ���? \r\n���� ������ �̾߱�� �縻�� �˰�;��.#b\r\n";
        QS += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list2##k"
        
        QS += "\r\n\r\n #fUI/UIWindow2.img/RemainLife/number/1# #L21# #r#b������#k �Ϸ� ������ �ްڽ��ϴ�. #l\r\n#l\r\n#l\r\n #v2430368# 1�� #v5062000# 30��#l #v2048709# 2��\r\n";
        
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/2# #L22# #r#bȲ�ݻ��#k �Ϸ� ������ �ްڽ��ϴ�. #l\r\n#l\r\n#l\r\n #v2430368# 1�� #v5062002# 30��#l #v2048706# 2��\r\n";
       
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/3# #L23# #r#b�׸���ũ#k �Ϸ� ������ �ްڽ��ϴ�. #l\r\n#l\r\n#l\r\n #v2430368# 2�� #v5062005# 30��#l #v2048707# 2��\r\n";
       
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/4# #L26# #r#b�׶�#k �Ϸ� ������ �ްڽ��ϴ�. #l\r\n#l\r\n#l\r\n #v2430368# 2�� #v5062005# 30��  #v2048708# 1��\r\n";
        
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/5# #L25# #r#bũ�������#k �Ϸ� ������ �ްڽ��ϴ�. #l\r\n#l\r\n#l\r\n #v2430368# 3�� #v5062005# 30��#l #v2048708# 2��\r\n";
        
        QS += "\r\n #fUI/UIWindow2.img/RemainLife/number/6# #L24# #r#b�Ϻ�����#k �Ϸ� ������ �ްڽ��ϴ�. #l\r\n#l\r\n#l\r\n #v2430368# 3�� #v5062005# 50�� #v2049100# 10�� #v2048708# 3��\r\n";

        QS += "\r\n #L250# #v1112135# [�̺�Ʈ] ���ɼ������������ �ްڽ��ϴ�. \r\n";
        cm.sendSimple(QS);
      } else if (selection == 81) {
        var QS4 = "\r\n�ȳ��ϼ���? ���谡��! Ȥ�� Ÿ��Ʋ�� ���� �˰��Ű���?";
        QS4 += "\r\n�װ��� �ٷ� �����ΰ� �����޴¿���. �ٷ� �ڽ��� ������\r\nȤ�� �����ϰ� �����Ű���?\r\n";
        QS4 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
        QS4 += "\r\n\r\n#v1142009##v1142010##v1142011##fUI/UIWindow2.img/Title/main/icon1# #v1142012##v1142013##v3700148#"
        QS4 += "\r\n\r\nŸ��Ʋ�� ȹ���Ͻø� �پ��� ������ ����˴ϴ�."
        QS4 += "\r\n�ڽ� �����ΰ� ������������ �������ּ���. \r\n���� �ű�� �����帱�Կ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS4 += "\r\n #k\#L210# #v1142009# ����\r\n#l\r\n"
        QS4 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n����迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ����迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS4 += "\r\n #k\#L211# #v1142010# ����\r\n"
        QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n������迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ������迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS4 += "\r\n #k\#L212# #v1142011# �������� �ε�\r\n"
        QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n�ü��迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �ü��迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS4 += "\r\n #k\#L213# #v1142012# �������� ����\r\n"
        QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n�����迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �����迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS4 += "\r\n #k\#L214# #v1142013# ������\r\n"
        QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n�����迭�� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �����迭���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS4 += "\r\n #k\#L215# #v3700148# ���丮 all �Ϸ���\r\n#l"
        QS4 += "\r\n#l\r\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS4 += "\r\n\r\n���丮����Ʈ �� Ŭ���� Ÿ��Ʋ�Դϴ�\r\n�̰���  ���丮����Ʈ �� Ŭ���� ��ǥ�Դϴ�\r\n[��������Ʈ�Դϴ�.]";
        cm.sendSimple(QS4);
      } else if (selection == 84) {
        var QS8 = "����� �ڿ� �ñ׳ʽ� Ÿ��Ʋ�� ������ �ƴ°�?";
        QS8 += "\r\n�ٷ� ������ �����޴°��� �ٷ� �״��� ������\r\n�غ�� �Ǿ��°�?\r\n";
        QS8 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
        QS8 += "\r\n\r\n #fUI/UIWindow2.img/Title/main/icon1# [Ÿ��Ʋ�� ȹ���Ͻø� �پ��� ������ ����˴ϴ�.]"
        QS8 += "\r\n\r\n�����϶� ������ �������� ���� \r\n���� ������ �װ����� �����ָ�\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS8 += "\r\n #k\#L300# #v1142069# ������\r\n#l\r\n"
        QS8 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS8 += "\r\n\r\n�ñ׳ʽ��� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� �ñ׳ʽ����� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        cm.sendSimple(QS8);
      } else if (selection == 85) {
        var QS9 = "����� �ڿ� ����Ÿ��Ʋ�� ������ �ƴ°�?";
        QS9 += "\r\n�ٷ� ������ �����޴°��� �ٷ� �״��� ������\r\n�غ�� �Ǿ��°�?\r\n";
        QS9 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
        QS9 += "\r\n\r\n #fUI/UIWindow2.img/Title/main/icon1# [Ÿ��Ʋ�� ȹ���Ͻø� �پ��� ������ ����˴ϴ�.]"
        QS9 += "\r\n\r\n�����϶� ������ �������� ���� \r\n���� ������ �װ����� �����ָ�\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS9 += "\r\n #k\#L400# #v1142379# ���� ����\r\n#l\r\n"
        QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS9 += "\r\n\r\���ϵ��� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ����� �߿��� ���� �����̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS9 += "\r\n #k\#L401# #v1142158# ������ �İ���\r\n#l\r\n"
        QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS9 += "\r\n\r\���ݵ��� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ���ݵ� �߿��� �İ��ڰ��˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS9 += "\r\n #k\#L402# #v1142483# ����� ������\r\n#l\r\n"
        QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS9 += "\r\n\r\��̳ʽ����� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ��̳ʽ��� �߿��� ¯�̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        QS9 += "\r\n #k\#L403# #v1142488# ���ǿ� ������ ��\r\n#l\r\n"
        QS9 += "\r\n #l\n ���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2##fUI/UIWindow2.img/ToolTip/Equip/Star/Star2#]#n#l"
        QS9 += "\r\n\r\ī�������� �ְ��� Ÿ��Ʋ�Դϴ�.\r\n�̰��� ȹ�����ڴ� ī������ �߿��� ¯�̵˴ϴ�.\r\n[�����ݺ�����Ʈ�Դϴ�.]";
        cm.sendSimple(QS9);
      } else if (selection == 80) { 8810018
        var QS3 = "���迡 �������� ó���ϰ�ʹٰ��?";
        QS3 += "\r\n������ �׵��� �ſ� �����ؿ�.���谡�� \r\nȤ�� �׷��� �����ϰ� �����Ű���?\r\n";
        QS3 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1#"
        QS3 += "\r\n\r\n #fUI/UIWindow2.img/characterCard/BtHelp/normal/0#   TIP : [��Ƽ�� ���������մϴ�.]"
        QS3 += "\r\n\r\n�����Ͻð� ������ ������ �����Ű���? \r\n���� �ű�� �����帱�Կ�.\r\n[�ݺ�����Ʈ�Դϴ�.]\r\n";
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/1# #k\#L10# �ɿ��� ���� ���� ����\r\n#l"
        QS3 += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8800000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/2# #k\#L15# �ɿ��� ���� ���� ī���� ����\r\n#l"
        QS3 += "\r\n #l\n #fUI/UIWindow2.img/MobGage/Mob/8800000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/3# #k\#L11# ���� ���ֶ� �Ҹ��� ȥ����"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8810018# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/4# #k\#L47# ������������ ������ �� ����"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8840000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/5# #k\#L12# �ð��� Ż������ ��ī�̷�"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8860000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/6# #k\#L13# �ƽ����� ������ �ٽ����� ����"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8870000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]l\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/7# #k\#L14# �ð��� �ź� ��ũ��"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8820001# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/8# #k\#L48# �̷��� ���� �ñ׳ʽ�"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8850011# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        QS3 += "\r\n #fUI/UIWindow2.img/NewPyramid/Number/9# #k\#L49# ������ �� �ű׳ʽ�"
        QS3 += "\r\n#l\r\n #fUI/UIWindow2.img/MobGage/Mob/8880000# [���̵� : #e[#fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star##fUI/UIWindow2.img/ToolTip/Equip/Star/Star#]#n#l]\r\n"
        cm.sendSimple(QS3);
      } else if (selection == 79) {
        var QS2 = "���󿡴� �پ��� �������� ���������� ��¥�� �����ϴ�..#b\r\n";
        QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list1##k"
        QS2 += "\r\n ������ �����Ͻðڽ��ϱ�? �ŷ��� �پ��մϴ�.\r\n Ư���� �ʿ��Ѱ����� �����ֵ����ص帮����.#b\r\n"
        QS2 += "\r\n#fUI/UIWindow2.img/EvolvingSystem/BtStart/normal/0#\r\n"
        QS2 += "#k\#r#L1##b#v4000171#500��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1152009# )#l"
        QS2 += "\r\n #k\#r#L5##b#v4000458#300��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1112594# )#l"
        QS2 += "\r\n #k\#r#L3##b#v4000440#550��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1032101# )#l"
        QS2 += "\r\n #k\#r#L4##b#v4000180#,#v4000181#550��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1022123# )#l"
        QS2 += "\r\n #k\#r#L2##b#v4000364#,#v4000365#550��#k�� ��ƿ��ڽ��ϴ�.(���� : #v1122118# )#l\r\n"
        if (cm.haveItem(4000171, 500)) {
            QS2 += "\r\n\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L20##r#b#v4000171#500��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1152009#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
        }

        if (cm.haveItem(4000458, 300)) {
            QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L16##r#b#v4000458#300��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1112594#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
        }

        if (cm.haveItem(4000440, 550)) {
            QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L18##r#b#v4000440#550��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1032101#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
        }

        if (cm.haveItem(4000180, 550) && cm.haveItem(4000181, 550)) {
            QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L17##r#b#v4000180#550��,#v4000181#550��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1022123#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
        }

        if (cm.haveItem(4000364, 550) && cm.haveItem(4000365, 550)) {
            QS2 += "\r\n #fUI/UIWindow2.img/UtilDlgEx/list3##k"
            QS2 += "#k\r\n#L19##r#b#v4000364#550��,#v4000365#550��#k�� ��ƿԽ��ϴ�.#l\r\n#l\r\n #e�� #n#v1122118#�������� ����Ʈ�� �����ϰڽ��ϴ�.#l";
        }

        cm.sendSimple(QS2);
      }
      } else if (status == 2) {
	if (sel == 1) {
	sel = selection;
	var equip = cm.getPlayer().getInventory(MapleInventoryType.EQUIP);
	var item = (Packages.client.items.Equip);
	item = ItemInformation.getInstance().getEquipById(equip.getItem(sel).getItemId());
	var name = ItemInformation.getInstance().getName(2591024);
	var itemid = (2590999 + parseInt(cm.SoulItem(sel,false)));
	var skillid = 0;
       if ((itemid >= 2591010 && itemid <= 2591016) || (itemid >= 2591089 && itemid <= 2591095)) {
           skillid = 80001217; //�����Ǹ�
       } else if ((itemid >= 2591017 && itemid <= 2591023) || (itemid >= 2591096 && itemid <= 2591102)) {
           skillid = 80001213; //�ƴ�
       } else if ((itemid >= 2591024 && itemid <= 2591030) || (itemid >= 2591103 && itemid <= 2591109)) {
           skillid = 80001214; //�巡�� ���̴�
       } else if ((itemid >= 2591031 && itemid <= 2591037) || (itemid >= 2591110 && itemid <= 2591116)) {
           skillid = 80001212; //����
       } else if ((itemid >= 2591038 && itemid <= 2591044) || (itemid >= 2591117 && itemid <= 2591123)) {
           skillid = 80001218; //����
       } else if ((itemid >= 2591045 && itemid <= 2591054) || (itemid >= 2591124 && itemid <= 2591131)) {
           skillid = 80001210;
       } else if ((itemid >= 2591055 && itemid <= 2591064) || (itemid >= 2591140 && itemid <= 2591147)) {
           skillid = 80001219; // ��ũ��
       } else if ((itemid >= 2591065 && itemid <= 2591074) || (itemid >= 2591132 && itemid <= 2591139)) {
           skillid = 80001215; // �ݷ���
       } else if ((itemid >= 2591075 && itemid <= 2591082) || (itemid >= 2591179 && itemid <= 2591186)) {
           skillid = 80001266;//�ñ׳ʽ�
       } else if ((itemid >= 2591148 && itemid <= 2591154) || (itemid >= 2591164 && itemid <= 2591170)) {
           skillid = 80001273; //ũ����ũ����
       } else if ((itemid >= 2591155 && itemid <= 2591162) || (itemid >= 2591171 && itemid <= 2591178)) {
           skillid = 80001216; //����
       } else if ((itemid >= 2591187 && itemid <= 2591193) || (itemid >= 2591203 && itemid <= 2591209)) {
           skillid = 80001280; //���ǳ׾�
       } else if ((itemid >= 2591194 && itemid <= 2591202) || (itemid >= 2591210 && itemid <= 2591217)) {
           skillid = 80001281; //��ī�̷�
       } else if ((itemid >= 2591218 && itemid <= 2591224) || (itemid >= 2591234 && itemid <= 2591240)) {
           skillid = 80001321; //�Ǿƴ���
       } else if ((itemid >= 2591225 && itemid <= 2591232) || (itemid >= 2591241 && itemid <= 2591248)) {
           skillid = 80001322; //����
       } else if ((itemid >= 2591249 && itemid <= 2591255) || (itemid >= 2591265 && itemid <= 2591271)) {
           skillid = 80001339; //�� ������
       } else if ((itemid >= 2591256 && itemid <= 2591263) || (itemid >= 2591272 && itemid <= 2591279)) {
           skillid = 80001340; //�ű׳ʽ�
       } else if (itemid >= 2591288 && itemid <= 2591295) {
           skillid = 80001395; //��������
       }
	cm.sendOk("#e#t" + equip.getItem(sel).getItemId() + "##n �� �ҿ� ������ �غ����� ����.\r\n\r\n#d������ �ҿ�#k : #e#d<#i" + itemid + "#" + name + ">#n#k#n#k\r\n\r\n#b�ҿｺų : " + GameConstants.getSoulSkillG(cm.SoulItem(sel,true)) + " �ҿ��� �Ҹ��Ͽ� " + cm.getSoulSkillName(skillid) + " ��(��) �ߵ�\r\n\r\n#k#e<�߰� ����>\r\n#n#b#t" + itemid + "#�� ���� �Ѽ��� : " + cm.��ų����(skillid,true));
	cm.dispose();
	} else if(check == 1) {
	cm.getPlayer().setKeyValue("luta","start");
	cm.dispose();
	cm.openNpc(1103005);
	} else if (selection == 21) {
        if(cm.getQuestStatus(31229) == 2 && cm.getPlayer().getKeyValue("QUEST1") == null) { 
        cm.gainItem(2430368, 1);
        cm.gainItem(5062000, 30);
        cm.gainItem(2048709, 2);
        cm.getPlayer().setKeyValue("QUEST1", "1");
        cm.dispose();
      } else {
        cm.sendOk("�̹� ������ �����̰ų� ���� ���丮����Ʈ�� �Ϸ����� ���ϼ̽��ϴ�.");
        cm.dispose();
      }

      } else if (selection == 250) {
        if(cm.getQuestStatus(4311) == 2 && cm.getPlayer().getKeyValue("QUEST10") == null) { 
        cm.Ư�������ۿ���(1112135);
        cm.getPlayer().setKeyValue("QUEST10", "1");
        cm.sendOk("�̺�Ʈ�Ⱓ�ȿ� �̺�Ʈ�� �Ϸ��ϼ̽��ϴ�.");
        cm.dispose();
      } else {
        cm.sendOk("�̹� ������ �����̰ų� ���� ���丮����Ʈ�� �Ϸ����� ���ϼ̽��ϴ�.");
        cm.dispose();
      }

      } else if (selection == 22) {
        if(cm.getQuestStatus(3872) == 2 && cm.getPlayer().getKeyValue("QUEST2") == null) { 
        cm.gainItem(2430368, 1);
        cm.gainItem(5062002, 30);
        cm.gainItem(2048706, 2);
        cm.getPlayer().setKeyValue("QUEST2", "1");
        cm.dispose();
      } else {
        cm.sendOk("�̹� ������ �����̰ų� ���� ���丮����Ʈ�� �Ϸ����� ���ϼ̽��ϴ�.");
        cm.dispose();
      }
      } else if (selection == 23) {
        if(cm.getQuestStatus(31328) == 2 && cm.getPlayer().getKeyValue("QUEST3") == null) { 
        cm.gainItem(2430368, 2);
        cm.gainItem(5062005, 30);
        cm.gainItem(2048707, 2);
        cm.getPlayer().setKeyValue("QUEST3", "1");
        cm.dispose();
     } else {
        cm.sendOk("�̹� ������ �����̰ų� ���� ���丮����Ʈ�� �Ϸ����� ���ϼ̽��ϴ�.");
        cm.dispose();
     }
     } else if (selection == 24) {
        if(cm.getQuestStatus(31352) == 2 && cm.getPlayer().getKeyValue("QUEST4") == null) { 
        cm.gainItem(2430368, 3);
        cm.gainItem(5062005, 50);
        cm.gainItem(2049100, 10);
        cm.gainItem(2048708, 3);
        cm.getPlayer().setKeyValue("QUEST4", "1");
        cm.dispose();
     } else {
       cm.sendOk("�̹� ������ �����̰ų� ���� ���丮����Ʈ�� �Ϸ����� ���ϼ̽��ϴ�.");
       cm.dispose();
     }
     } else if (selection == 25) {
        if(cm.getQuestStatus(31259) == 2 && cm.getPlayer().getKeyValue("QUEST5") == null) { 
        cm.gainItem(2430368, 3);
        cm.gainItem(5062005, 30);
        cm.gainItem(2048708, 2);
        cm.getPlayer().setKeyValue("QUEST5", "1");
        cm.dispose();
     } else {
          cm.sendOk("�̹� ������ �����̰ų� ���� ���丮����Ʈ�� �Ϸ����� ���ϼ̽��ϴ�.");
          cm.dispose();
     }
     } else if (selection == 26) {
        if(cm.getQuestStatus(3782) == 2 && cm.getPlayer().getKeyValue("QUEST6") == null) { 
        cm.gainItem(2430368, 2);
        cm.gainItem(5062005, 30);
        cm.gainItem(2048708, 1);
  cm.gainhorong(3700142);
        cm.getPlayer().setKeyValue("QUEST6", "1");
        cm.dispose();
     } else {
          cm.sendOk("�̹� ������ �����̰ų� ���� ���丮����Ʈ�� �Ϸ����� ���ϼ̽��ϴ�.");
          cm.dispose();
     }

 } else if (selection == 210) {
       if (cm.haveItem(4000653, 550)) {
       cm.Ư�������۷����帮(1142009);
       cm.gainItem(4000653, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000653# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }
       cm.dispose();
     } else if (selection == 211) {
       if (cm.haveItem(4000650, 550)) {
       cm.Ư�������۷����帮(1142010);
       cm.gainItem(4000650, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000650# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }
       cm.dispose();
     } else if (selection == 212) {
       if (cm.haveItem(4000652, 550)) {
       cm.Ư�������۷����帮(1142011);
       cm.gainItem(4000652, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000652# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }
       cm.dispose();
     } else if (selection == 213) {
       if (cm.haveItem(4000649, 550)) {
       cm.Ư�������۷����帮(1142012);
       cm.gainItem(4000649, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000649# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }
       cm.dispose();
     } else if (selection == 214) {
       if (cm.haveItem(4000651, 550)) {
       cm.Ư�������۷����帮(1142013);
       cm.gainItem(4000651, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000651# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }
       cm.dispose();
     } else if (selection == 215) {
        if(cm.getQuestStatus(31229) == 2 && cm.getQuestStatus(3872) == 2 && cm.getQuestStatus(31328) == 2 && cm.getQuestStatus(3782) == 2 && cm.getQuestStatus(31259) == 2 && cm.getQuestStatus(31352) == 2 && cm.getPlayer().getKeyValue("QUEST7") == null) { 
        cm.gainhorong(3700148); 
        cm.getPlayer().setKeyValue("QUEST7", "1");
        cm.dispose();
     } else {
          cm.sendOk("��� ���丮����Ʈ�� �Ϸ������ʾҾ�!");
          cm.dispose();
     }

     } else if (selection == 300) {
       if (cm.haveItem(4000654, 550)) {
       cm.Ư�������۷����帮(1142069);
       cm.gainItem(4000654, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }

     } else if (selection == 400) {
       if (cm.haveItem(4000654, 550)) {
       cm.Ư�������۷����帮(1142379);
       cm.gainItem(4000654, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }

     } else if (selection == 401) {
       if (cm.haveItem(4000654, 550)) {
       cm.Ư�������۷����帮(1142158);
       cm.gainItem(4000654, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }

     } else if (selection == 402) {
       if (cm.haveItem(4000654, 550)) {
       cm.Ư�������۷����帮(1142483);
       cm.gainItem(4000654, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }

     } else if (selection == 403) {
       if (cm.haveItem(4000654, 550)) {
       cm.Ư�������۷����帮(1142488);
       cm.gainItem(4000654, -550);
       cm.sendOk("���Ͻô� ������ �����Ű���?");
     } else {
       cm.sendOk("����Ʈ������ : #v4000654# \r\n����Ʈ�������� 550���� ��ƿ��°��� ���������̿���.");
     }

          } else if (selection == 10) {
                    cm.dispose();
                    cm.warp(211042400);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 15) {
                    cm.dispose();
                    cm.warp(211042401);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 11) {
                    cm.dispose();
                    cm.warp(240050400);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 12) {
                cm.dispose();
                cm.warp(223030000);
                cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 13) {
                    cm.dispose();
                    cm.warp(262030000);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 14) {
                    cm.dispose();
                    cm.warp(270050000);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 47) {
                    cm.dispose();
                    cm.warp(211070000);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 48) {
                    cm.dispose();
                    cm.warp(271040000);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 49) {
                    cm.dispose();
                    cm.warp(401060000);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
 } else if (selection == 50) {
		    cm.dispose();
                    cm.openShop(9000100);
          } else if (selection == 51) {
		    cm.dispose();
                    cm.openShop(9070001);
          } else if (selection == 52) {
		    cm.dispose();
                    cm.openShop(2161004);
          } else if (selection == 53) {
		    cm.dispose();
                    cm.openShop(9072100);
          } else if (selection == 54) {
		    cm.dispose();
                    cm.openShop(9010039);
          } else if (selection == 55) {
		    cm.dispose();
                    cm.openNpc(2161008);

          } else if (selection == 1) {
                    cm.dispose();
                    cm.warp(222010200);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 2) {
                    cm.dispose();
                    cm.warp(261020400);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 3) {
                    cm.dispose();
                    cm.warp(300010400);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
          } else if (selection == 4) {
                    cm.dispose();
                    cm.warp(230040400);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
         } else if (selection == 5) {
                    cm.dispose();
                    cm.warp(270030500);
                    cm.sendOk("����Ʈ�� �ʿ��� ��Ḧ �ٸ����ñ⸦ �ٷ���.");
         } else if (selection == 20) {
                if (cm.haveItem(4000171, 500)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("�κ��丮 ������ �ּ��� 5ĭ�� �ʿ��մϴ�. ��� ���� ������ 3ĭ�̻� ����ֽ� �� �ٽ� �����ּ���.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1152009);
                    cm.gainItem(4000171, -500);
                    cm.sendOk("���Ͻô� ������ �����Ű���?");
                } else {
                    cm.sendOk("#b#v 4000171##k ���� ��ᰡ �����ؿ�");
                }
		    cm.dispose();
          } else if (selection == 19) {
                if (cm.haveItem(4000364, 550) && cm.haveItem(4000365, 550)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("�κ��丮 ������ �ּ��� 5ĭ�� �ʿ��մϴ�. ��� ���� ������ 3ĭ�̻� ����ֽ� �� �ٽ� �����ּ���.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1122118);
                    cm.gainItem(4000364, -550);
                    cm.gainItem(4000365, -550);
                    cm.sendOk("���Ͻô� ������ �����Ű���?");
                } else {
                    cm.sendOk("#b#v 4000364# #v 4000365##k ���� ��ᰡ �����ؿ�");
                }
		    cm.dispose();
          } else if (selection == 60) {
                if (cm.haveItem(4033302, 1) && cm.haveItem(4033303, 1) && cm.haveItem(4033304, 1)  && cm.haveItem(4033311, 1)  && cm.haveItem(4033312, 1)  && cm.haveItem(4000659, 1)) {
                            var scroll = new Array(1482169,1532099,1522095,1492180,1302276,1472215,1452206,1462194,1442224,1432168,1422141,1412136,1402197,1382209,1372178,1362091,1342083,1332226,1322204,1312154,1242063,1212065,1222060,1232058,1242062);
        var itemid = scroll[Math.floor(Math.random() * scroll.length)];
                   cm.gainItem(itemid,1,true);
                    cm.gainItem(4033302, -1);
                    cm.gainItem(4033303, -1);
                    cm.gainItem(4033304, -1);
                    cm.gainItem(4033311, -1);
                    cm.gainItem(4033312, -1);
                    cm.gainItem(4000659, -1);
                    cm.sendOk("���Ͻô� ������ �����Ű���?");
                } else {
                    cm.sendOk("��ᰡ �����մϴ�.");
                }
		    cm.dispose();
          } else if (selection == 18) {
                if (cm.haveItem(4000440, 550)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("�κ��丮 ������ �ּ��� 5ĭ�� �ʿ��մϴ�. ��� ���� ������ 3ĭ�̻� ����ֽ� �� �ٽ� �����ּ���.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1032101);
                    cm.gainItem(4000440, -550);
                    cm.sendOk("���Ͻô� ������ �����Ű���?");
                } else {
                    cm.sendOk("#b#v 4000440##k ���� ��ᰡ �����ؿ�");
                }
		    cm.dispose();
          } else if (selection == 17) {
                if (cm.haveItem(4000180, 550) && cm.haveItem(4000181, 550)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("�κ��丮 ������ �ּ��� 5ĭ�� �ʿ��մϴ�. ��� ���� ������ 3ĭ�̻� ����ֽ� �� �ٽ� �����ּ���.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1022123);
                    cm.gainItem(4000180, -550);
                    cm.gainItem(4000181, -550);
                    cm.sendOk("���Ͻô� ������ �����Ű���?");
                } else {
                    cm.sendOk("#b#v 4000180# #v 4000181##k ���� ��ᰡ �����ؿ�");
                }
		    cm.dispose();
          } else if (selection == 16) {
                if (cm.haveItem(4000458, 300)) {
		var leftslot3 = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getNumFreeSlot();
               if (leftslot3 < 3) {
                   cm.sendOk("�κ��丮 ������ �ּ��� 5ĭ�� �ʿ��մϴ�. ��� ���� ������ 3ĭ�̻� ����ֽ� �� �ٽ� �����ּ���.");
                   cm.dispose();
                   return;
               }
                    cm.gainhorong(1112594);
                    cm.gainItem(4000458, -300);
                    cm.sendOk("���Ͻô� ������ �����Ű���?");
                } else {
                    cm.sendOk("#b#v 4000458##k ���� ��ᰡ �����ؿ�");
                }
		    cm.dispose();
      }
    }
  }
}
