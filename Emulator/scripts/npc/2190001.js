var status = 0;
var s = 0;
var allstat = 0;
var damage = 0;
var cost = 0;
var itemid = 0;
var damageprice = 0;
var allstatprice = 0;
function start() {
  status = -1;
  text = "#e<�Ŀ�����Ʈ ��>\r\n";
  text += "#n��   ���� #b#h ##k���� �Ŀ�����Ʈ : #r" + cm.getRC() +"#k��\r\n";
  text += "#d#L0#�����̾� �˻� ĳ�� �̿��ϱ� (500 + a ����Ʈ)#k#l\r\n";
  text += "\r\n    #Cgray##fs11#�߰� ������ �ɼ��� ���� �˻� ĳ�� �ý���#fs12##k\r\n";
  text += "#d#L1#�Ŀ�����Ʈ�� �������� ȯ���ϱ�#l\r\n"
  text += "\r\n    #Cgray##fs11#500 ����Ʈ = 1 �Ŀ����� (500:1)#fs12##k\r\n";
  //text += "#d#L2#�Ŀ�����Ʈ�� �޼ҷ� ȯ���ϱ�#l\r\n"
  cm.sendSimple(text);
}
function action(mode,type,selection) {
  if (mode == 1) {
    status++;
  }
  if (mode == 0 || mode == -1) {
    cm.dispose();
   return;
  }
  if (status == 0) {
    s = selection;
    if (selection == 0) {
      cm.sendGetText("�˻� �Ͻ� ������ �̸��� �Է� �� �ּ���.");
    } else if (selection == 1) {
     cm.sendGetNumber("��ȯ�Ͻ� ������ ������ �Է� �� �ּ���.\r\n#Cgray##fs11#���� 1���� 500 �Ŀ�����Ʈ", 0, 0, 1000);
    } /*else if (selection == 2) {
      cm.sendGetText("���Ͻô� �ݾ��� �Է� �� �ּ���.");
    }
    */
  } else if (status == 1) {
   if (s == 0) {
     cm.SearchItem(cm.getText());
    } else if (s == 1) {
      num = selection;
      n = num * 500;
      if (cm.getRC() >= n) {
        cm.gainRC(-n);
        cm.gainItem(4001126, num);
       cm.sendOk("��ȯ�� �Ϸ�Ǿ����ϴ�.\r\n�κ��丮�� Ȯ�� �� �ּ���.");
        cm.dispose();
      } else {
        cm.sendOk("�Ŀ�����Ʈ�� �����մϴ�.");
        cm.dispose();
        return;
      }
    }/* else if (s == 2) {
    }*/
  } else if (status == 2) {
    itemid = selection;
    cost += 500;
    if (cm.canHold(selection)) {
      cm.sendGetNumber("#e���� ������#n : #i"+itemid+"# #z"+itemid+"#\r\n#e������ ����#n : #b#e"+cost+"#n����Ʈ#k\r\n\r\n#e#r�� 100 ����Ʈ#k = #b�ý��� ��6#k\r\n#Cgray##n#fs11#����Ͻ� ����Ʈ�� �Է� �� �ּ���.", 0, 0, 9999999);
    } else {
      cm.sendOk("�κ��丮�� ���� ������ ���� �� �����ϴ�.");
      cm.dispose();
      return;
    }
  } else if (status == 3) {
    if (selection % 100 != 0) {
      cm.sendOk("100 ����Ʈ ������ ���缭 �Է� �� �ּ���.");
      cm.dispose();
      return;
    } else {
      cost += selection;
      allstatprice = selection;
      allstat = selection / 100 * 6;
      cm.sendGetNumber("#e���� ������#n : #i"+itemid+"# #z"+itemid+"#\r\n#e������ ����#n : #b#e"+cost+"#n����Ʈ#k\r\n\r\n#e#Cgray#�� "+allstatprice+" ����Ʈ = �ý��� +"+allstat+"\r\n#r�� 100 ����Ʈ#k = #b���� ��50#k\r\n#n#Cgray##fs11#����Ͻ� ����Ʈ�� �Է� �� �ּ���.",0,0,cm.getRC());
    }
  } else if (status == 4) {
    if (selection % 100 != 0) {
      cm.sendOk("100 ����Ʈ ������ ���缭 �Է� �� �ּ���.");
      cm.dispose();
      return;
    } else {
      cost += selection;
      damageprice = selection;
      damage = selection / 100 * 50;
      cm.sendYesNo("#e���� ������#n : #i"+itemid+"# #z"+itemid+"#\r\n#e������ ����#n : #b#e"+cost+"#n����Ʈ#k\r\n\r\n#e�ý���#n : +"+allstat+"\r\n#e����#n : +"+damage+"\r\n\r\n�������� �����Ͻðڽ��ϱ�?");
    }
  } else if (status == 5) {
    if (cm.getRC() >= cost) {
      cm.gainRC(-cost);
      cm.gainSponserItem(itemid, "[�Ŀ�������]", allstat, damage, 0);
      cm.sendOk("���õ� ���������� ��ȯ�Ǿ����ϴ�.\r\n�κ��丮�� Ȯ�� �� �ּ���.");
      cm.dispose();
      return;
    } else {
      cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�.\r\n\r\n#e ���� ���Ŀ�����Ʈ#n : "+cm.getRC()+"\r\n#e ������ ���� #n : #r"+cost);
      cm.dispose();
      return;
    }
  }
}