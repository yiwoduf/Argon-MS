/*

�ٷ��� ���� ��ũ��Ʈ�Դϴ�
����&������ ��!!

*/
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
var status = -1;

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
          NotAllowed = [1115100, 1115101, 1115102, 1115012, 1115013, 1115014, 1050478, 1051545, 1070095, 1071112, 1702808, 1005089, 1050479, 1051546, 1702809, 1050477, 1051544, 1103072, 1073255, 1702807, 1005083, 1005084, 1003775, 1051051, 1050065]
          if (mode == -1 || mode == 0) {
              cm.dispose();
         return;
         }
         if (mode == 1) {
         status++;
         }
         if (status == 0) {
	      cm.sendGetText("#fn������� Extrabold##fs14##eĳ�þ����� �̸��� �Է��ϼ���(��Ȯ�� �̸��� �Է� ���ҽ� �˻� ������ �ʹ� ���� �ñ���� �ֽ��ϴ�.)#k\r\n\r\n�߰��ɼ� : #g�ý���+0 ��/��+0#k");
         } else if (status == 1) {
              var itemid = cm.getText();
	      cm.SearchItem(itemid);
         } else if (status == 2) {
          for (i=0; i<NotAllowed.length; i++) {
          if (selection == NotAllowed[i]) {
              cm.sendOk("�� �������� �Ŀ� ���� ĳ���� �Դϴ�.");
              cm.dispose();
              return;
         }
         }
	  if (cm.getPlayer().haveItem(4001126, 0, true, true)) { // ���ϼ����� �����۱��� �Ұ� 

	      cm.sendOk("#i"+selection+"# #fs14##e#b#t"+selection+"##n#k#fs12#��(��) ȹ���ϼ̽��ϴ�.");
              cm.gainSponserItem(selection,'',0,0,0); // �ý���,���ݷ�
	      cm.gainItem(4001126, -0); // �谨 ����		
              cm.dispose();
	 } else {
	      cm.sendOk("#i4001126# #z4001126# 150�� �̸��̹Ƿ� ������ ���Ű� �Ұ��� �մϴ�.");
              cm.dispose();
	}
    }
}