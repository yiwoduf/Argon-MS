var status = 0;
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
��ȸ = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"
�պ� = "#fUI/FarmUI.img/objectStatus/star/whole#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/16#"
var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";

importPackage(Packages.constants);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
    if (mode == 0) {
        cm.dispose();
        return;
    } if (mode == 1)
        status++;
     else status--;

    if (status == 0) {
	var chat =       "       #fUI/UIWindowBT.img/MonsterBattle/backgrnd##fn������� Extrabold##fs17#                                                                                                    "+ServerConstants.serverName+"�� ���� ���� ȯ���մϴ�. \r\n#fs10#                                  #Cgray#��ſ� �ð� �ǽñ� �ٶ��ϴ�.#k\r\n\r\n#fs12#";
	chat += "#L1##r�� "+ServerConstants.serverName+"�� �������̵带 �о�ڽ��ϴ�.#k\r\n"; 
	chat += "#L2##b�� "+ServerConstants.serverName+"�� ��������Ʈ�� ���ڽ��ϴ�.#k\r\n\r\n";
	chat += "#L7#"+��ȸ+"#d����#k �ý���#l\r\n";
	chat += "#L3#"+����+"#d����#k �ý���#l\r\n";
        chat += "#L4#"+����+"#r����#k ������#l\r\n";
        chat += "#L5#"+����+"#b��#k Ʈ���̵�#l\r\n";
        chat += "#L6#"+��ȸ+"#Cgray#�Ŀ�#k �ý���#l\r\n";
	cm.sendSimple(chat);	

   } else if (status == 1) {

      if (selection == 1) {
      var chat = "			#fn������� Extrabold##b"+ServerConstants.serverName+"#k�� �������̵带 �˷��帮�ڽ��ϴ�.\r\n\r\n";
      chat += "---------------------------------------------------------------------------------\r\n";
      chat += "#d[�˸� 1]#k - ������ ����ġ : "+ServerConstants.defaultExpRate+"  ��� : "+ServerConstants.defaultDropRate+" �޼� : "+ServerConstants.defaultMesoRate+"�� �����Դϴ�.\r\n";
      chat += "#d[�˸� 2]#k - ���ĵ������� #b["+ServerConstants.serverName+".com]#k�Դϴ�.\r\n";
      chat += "#d[�˸� 3]#k - �Ŀ��� 1��1����ī�� ���� ���� ��Ź�帳�ϴ�.\r\n\r\n";
      chat += "										 - "+ServerConstants.serverName+" - #k#l\r\n";
      chat += "---------------------------------------------------------------------------------";
      cm.sendSimple(chat);

      } else if (selection == 2) {
      cm.dispose();
      cm.openNpc(3003104);

      } else if (selection == 3) {
      cm.dispose();
      cm.openNpc(9001137);

      } else if (selection == 4) {
      cm.dispose();
      cm.openNpc(2400018);

      } else if (selection == 5) {
      cm.dispose();
      cm.openNpc(9300000);

      } else if (selection == 6) {
      cm.dispose();
      cm.openNpc(1540010);

      } else if (selection == 7) {
      cm.dispose();
      cm.openNpc(1540103);


			}
		}
	}
}