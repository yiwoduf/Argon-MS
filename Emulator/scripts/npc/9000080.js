/*
# ������ : ���K [melon_dev@nate.com]
# �⡡�� : ���� ����Ʈ
*/
importPackage(Packages.tools.RandomStream);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);
var servername = "�ξȽ��丮"
var boss = 9500391; //���� �ڵ�
var back = 100000000; //���ư� �� �ڵ�
var x = 994; //��ȯx��ǥ
var y = 513; //��ȯy��ǥ
reqitem = [4032311, 1003455, 4032868, 11423850, 87857555, 25911860];  qwan = [1, 1, 1, 5, 1, 1]; 
// reqitem : [1,2,3,4,5,6] ���ʴ�� ��� ���� ���� ��� �߾� qwan : �� �������� ��
rewitem = [1003455, 4032868, 11423850, 0518486, 90000000, 11521540];  
// rewitem : ����Ʈ�Ϸ� ��ǥ or ���� rewmeso : ������ ����Ʈ���� �Ϸ������� ��� �޼�
var status = -1;
function start() {
    status = -1;
    action (1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }
    if (status == -1) {
       cm.dispose();
       return;
    }
    if (status == 0) {
    var hello = "����������������������#fUI/CashShop.img/CSEffect/event/0##fn������� Extrabold##fs12#\r\n������������ ����ϽŰ��� ���ϵ帳�ϴ�! �� ��ٳ��� ���ν����ּ���!\r\n��#r(Lv.115) ��ٳ��� ��ġ�ϰ�ͽ��ϴ١�����Ʈ��#k���������ÿ� #i1003455#��ȹ���ϰԵ˴ϴ�. #i1003455#���� ���� ���� ����Ʈ�� �Ϸ��Ҽ��ֽ��ϴ�.\r\n";
         //hello += "#b��� ����Ʈ�� �Ϸ�#k�� �� ������ �־����ϴ�.\r\n\r\n";
         //hello += "����: #i1012478# #e#r����� ���� ������#k ���ݺ����ɡ�\r\n\r\n";
         hello += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n";
         if (cm.haveItem(rewitem[5], 1)) {
         hello += ".";
         } else if (cm.haveItem(rewitem[4], 1)) {
         hello += "#d#L5#(Lv.115) ��ٳ��� �������\r\n";
         } else if (cm.haveItem(rewitem[3], 1)) {
         hello += "#d#L4#(Lv.115) ������ Ǯ������(4)\r\n";
         } else if (cm.haveItem(rewitem[2], 1)) {
         hello += "#d#L3#(Lv.115) ��ٳ��� �����ϰ�ͽ��ϴ١��ݺ���\r\n";
         } else if (cm.haveItem(rewitem[1], 1)) {
         hello += "#d#L2#(Lv.115) ��ٳ��� �����ϰ�ͽ��ϴ١��ݺ���\r\n";
         } else if (cm.haveItem(rewitem[0], 1)) {
         hello += "#d#L1#(Lv.115) Ȳ�ݻ�� �׸� ������ �Ϸ� \r\n";
         } else {
         hello += "#d#L0#(Lv.115) ��ٳ��� ��ġ�ϰ�ͽ��ϴ١�����Ʈ��\r\n";
}
    cm.sendSimple(hello);
    return;
        } else if (status == 1) {
          if (selection == 0) {
         var say0 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn������� Extrabold##fs12#\r\n#h0#�� ��� ����Ʈ�� �Ϸ����ּ̳���! ���������� ��ٳ��� ��ġ�Ͽ� ������ ������ ȹ���ϼ���!  \r\n#r#i4032311#�������� �Ҹ��Ͽ� ��ȯ�ϰԵ˴ϴ�.#k #e#e�������� ������ּ���!��#k\r\n";
             //say0 += "�׶����� ���� ����� ������ �װԵǾ��� ���̻� ����� ������ ����Ҽ� ���� �츮�� ��ٳ��� �̰� ������ ���� �������� �����ع��ȴٳ�..\r\n\r\n������ �ֱٿ� ��� ��ٳ��� ������ ������ Ǯ���� �����Ͽ��� �׿� ���ÿ� Ȳ�ݻ�� ������ ���ļ� ��ٳ��� ���������� �˼��ִ� �̻��� �������� �����Ǿ��ٳ�.. \r\n\r\n�츮�� ���� �ٽ��ѹ� ��ٳ��� ���� �����ְ� \r\n"
             //say0 += " �˼�������.. ����Ƽ�ϱ��Ÿ� ���� \r\n#i"+reqitem[0]+"##b[#z"+reqitem[0]+"#]#k #r"+qwan[0]+"��#k�� �������ּ���.!\r\n";
             //say0 += "#e#e#L6#����Ʈ �����ϱ�#k"
             //say0 += "#L7#����Ʈ �����ϱ�#k\r\n"
             say0 += "#L8#��ٳ� ��ȯ������Ʈ��#k"
             cm.sendSimple(say0);
         } else if (selection == 1) {
         var say1 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn������� Extrabold##fs12#\r\n�ȳ��Ͻʴϱ�! #h0#�� [GM]�Ѻ��Դϴ�.\r\n\r\n�̹��� ��ȹ�� �������� ��ſ�̴°���~^^? ���� �������� ������� �����̸� �����е��� ���� �ǰ��� �ް��ֽ��ϴ�!.\r\n\r\n ������������ �����ǰ� �ֽø� �����ϰ����ϴ�! �̷ν� Ȳ�ݻ���� ��� ����Ʈ�� �Ϸ��ϼ̽��ϴ�~ �����ϼ̽��ϴ�!#r\r\n�����â�� 3ĭ����μ���!��#k\r\n";
             say1 += "\r\n                                               -������-\r\n                                             [Gm]�Ѻ�\r\n                                          -�������ֽź�-\r\n                                                 -���-\r\n                                                 -����-\r\n                                                 -����-\r\n                                                 -����-\r\n                 Ȳ�ݻ�� �������� �����Կ��־� �׽��� ������ \r\n       ���Ҿ� ���� �ǰ߰� ������ã���ֽ� 4�в� �����մϴ�! (__) ";
             //say1 += "#e#e#L10#����Ʈ �����ϱ�#k\r\n"
             //say1 += "#e#b#L11#����Ʈ �����ϱ�#k\r\n"
             say1 += "\r\n#e#e#L12#����ޱ�(��׽ý��̵�)#k"
             cm.sendSimple(say1);
       } else if (selection == 2) {
         var say2 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn������� Extrabold##fs12#\r\n �ٽ��ѹ� ��ٳ��� ��ġ�Ϸ� ���̱���!\r\n��������ġ�� @���� ��ɾ ������ּ��䡽\r\n\r\n���ȳ���  (Lv.115)��ٳ��� �����ϰ�ͽ��ϴ١��ݺ���\r\n#r����Ʈ�� ���� �����ϸ� ������ �ϷẸ���� ���޵����ʽ��ϴ�.   \r\n#r#i4032868#�������� �Ҹ��Ͽ� ��ȯ�ϰԵ˴ϴ�#k.";
             //say2 += "\r\n��#r#r�÷����ǹ�1,2#k������ ���� ������ ��ġ�Ͽ�\r\n#i"+reqitem[2]+"##b[#z"+reqitem[2]+"#]#k #r"+qwan[2]+"��#k�� �������ְԳ�. \r\n";
             //say2 += "#e#g#L20#����Ʈ �����ϱ�#k\r\n"
             //say2 += "#e#b#L21#����Ʈ �����ϱ�#k\r\n"
             say2 += "\r\n#e#e#L22#��ȯ�ϱ�#k"
             cm.sendSimple(say2);
  } else if (selection == 3) {
         var say3 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn������� Extrabold##fs12#\r\n�ȳ��Ͻʴϱ�! #h0#�� [GM]�Ѻ��Դϴ�.\r\n\r\n�̹��� ��ȹ�� �������� ��ſ�̴°���~^^? ���� �������� ������� �����̸� �����е��� ���� �ǰ��� �ް��ֽ��ϴ�!.\r\n\r\n ������������ �����ǰ� �ֽø� �����ϰ����ϴ�! �̷ν� Ȳ�ݻ���� ��� ����Ʈ�� �Ϸ��ϼ̽��ϴ�~ �����ϼ̽��ϴ�!\r\n";
             say3 += "\r\n                                               -������-\r\n                                             [Gm]�Ѻ�\r\n                                          -�������ֽź�-\r\n                                                 -���-\r\n                                                 -����-\r\n                                                 -����-\r\n                                                 -����-\r\n                 Ȳ�ݻ�� �������� �����Կ��־� �׽��� ������ \r\n       ���Ҿ� ���� �ǰ߰� ������ã���ֽ� 4�в� �����մϴ�! (__) ";
             //say3 += "#e#g#L30#����Ʈ �����ϱ�#k\r\n"
             //say3 += "#e#b#L31#����Ʈ �����ϱ�#k\r\n"
             say3 += "#e#e#L32#��ٳ� ��ġ#k"
             cm.sendSimple(say3);
  } else if (selection == 4) {
         var say4 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn������� Extrabold##fs12#\r\n���ѹ� ��ٳ����� �����ϰ�����հ�?";
             say4 += "\r\n��#r#r�����ǹ�#k������ ���׽ø� ��ġ�Ͽ�\r\n#i"+reqitem[4]+"##b[#z"+reqitem[4]+"#]#k #r"+qwan[4]+"��#k�� ��ƿ��� �ٽ��ѹ� �����ϰ� ������. \r\n ";
             //say4 += "#e#g#L40#����Ʈ �����ϱ�#k\r\n"
             //say4 += "#e#b#L41#����Ʈ �����ϱ�#k\r\n"
             say4 += "#e#e#L42#����Ʈ �Ϸ��ϱ�#k"
             cm.sendSimple(say4);
  } else if (selection == 5) {
         var say5 = "#fUI/UIWindow2.img/UtilDlgEx/list1##fn������� Extrabold##fs12#\r\n������ Ǯ�� ��������� �˾Ƴ³� ��ٳ��� ������Ҵ�\r\n #i4032127#�������� ��#r#r���������#k���� ����𿡰� ���� ��Ҹ� �˷��ٰɽ�  ";
             //say5 += "#e#g#L50#����Ʈ �����ϱ�#k\r\n"
             //say5 += "#e#b#L51#����Ʈ �����ϱ�#k\r\n"
             //say5 += "#e#e#L52#����Ʈ �Ϸ��ϱ�#k"
             cm.sendSimple(say5);
}
      } else if (status == 2) {
// sorry0~sorry6 = �ڽ��� ������ �ִ� ����Ʈ1~6�� ���Ǿ����� ����
// soso0~6 = �ڽ��� �� ��ƾ� �ϴ� ���� ������ ���� 
var sorry0 = cm.itemQuantity(4000001);  var sorry1 = cm.itemQuantity(4000996);  
var sorry2 = cm.itemQuantity(4000364);  var sorry3 = cm.itemQuantity(4000296);
var sorry4 = cm.itemQuantity(4000446);  var sorry5 = cm.itemQuantity(4000653);
var soso0 = qwan[0] - sorry0;  var soso1 = qwan[1] - sorry1;
var soso2 = qwan[2] - sorry2;  var soso3 = qwan[3] - sorry3;
var soso4 = qwan[4] - sorry4;  var soso5 = qwan[5] - sorry5;
       if (selection == 6) {
         cm.sendOk("�����ּż� �����մϴ�. Ƽ�ϱ��Ÿ����ؼ�\r\n  #i"+reqitem[0]+"##b[#z"+reqitem[0]+"#]#k #r"+qwan[0]+"��#k�� �������ּ���.!!");
         cm.dispose();
       } else if (selection == 7) {
          cm.sendOk("�׷� �Ҽ����׿�.. ���߿��� �����ּ���~");
          cm.dispose();
       } else if (selection == 8) {
          if (cm.haveItem(reqitem[0], qwan[0])) {
          cm.gainItem(reqitem[0], -qwan[0]);
          cm.gainItem(reqitem[1], 1);
	  cm.spawnMob(boss,x,y);                 
          cm.changeMusic("Bgm16/InWartime");        
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk(" ��#b#e�����ǹ�#k������ ������ �������� ��������Ʈ�� �Ϸ����ּ���.^^");
          cm.dispose();
}
       } else if (selection == 10) {
         cm.sendOk("����~ �׷��� #i"+reqitem[1]+"##b[#z"+reqitem[1]+"#]#k #r"+qwan[1]+"��#k�� �����~");
         cm.dispose();
       } else if (selection == 11) {
          cm.sendOk("�׷� �Ҽ����׿�.. ���߿��� �����ּ���~");
          cm.dispose();
       } else if (selection == 12) {
          if (cm.haveItem(reqitem[1], qwan[1])) {
          cm.gainItem(reqitem[1], -qwan[1]);          
          cm.gainItem(1152170, 1);
          cm.gainItem(1012478, 1);
          cm.gainItem(5530013, 1);
          cm.warp(100000000);
          cm.gainMeso(10000000);
          cm.gainItem(1142385, 1);          
          cm.changeMusic("BgmEvent2/risingStar2");
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("���� ��Ź�Ѹ�ŭ ������ �����Ѱ� ���ƿ� #h0#��.. \r\n������ ��� #b#i"+reqitem[1]+"##z"+reqitem[1]+"##k��(��) #r"+sorry1+" ��#k �̸�,"
          + "���� #b"+ soso1 + "��#k�� �����ؿ�..");
          cm.dispose();
}
       } else if (selection == 20) {
         cm.sendOk("����~ �׷��� #i"+reqitem[2]+"##b[#z"+reqitem[2]+"#]#k #r"+qwan[2]+"��#k�� �����~");
         cm.dispose();
       } else if (selection == 21) {
          cm.sendOk("�׷� �Ҽ����׿�.. ���߿��� �����ּ���~");
          cm.dispose();
       } else if (selection == 22) {
          if (cm.haveItem(reqitem[2], qwan[2])) {
          cm.gainItem(reqitem[2], -qwan[2]);
          cm.spawnMob(boss,x,y); 
          cm.changeMusic("Bgm16/InWartime");
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("���� ��Ź�Ѹ�ŭ ������ �����Ѱ� ���ƿ� #h0#��.. \r\n������ ��� #b#i"+reqitem[2]+"##z"+reqitem[2]+"##k��(��) #r"+sorry2+" ��#k �̸�,"
          + "���� #b"+ soso2 + "��#k�� �����ؿ�..");
          cm.dispose();
}
       } else if (selection == 30) {
         cm.sendOk("����~ �׷��� #i"+reqitem[3]+"##b[#z"+reqitem[3]+"#]#k #r"+qwan[3]+"��#k�� �����~");
         cm.dispose();
       } else if (selection == 31) {
          cm.sendOk("�׷� �Ҽ����׿�.. ���߿��� �����ּ���~");
          cm.dispose();
       } else if (selection == 32) {
          if (cm.haveItem(reqitem[3], qwan[3])) {        
          cm.warp(925120100);
          cm.gainItem(reqitem[3], -qwan[3]);
          cm.changeMusic("Bgm22/DespairOnDevil");
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("���� ��Ź�Ѹ�ŭ ������ �����Ѱ� ���ƿ� #h0#��.. \r\n������ ��� #b#i"+reqitem[3]+"##z"+reqitem[3]+"##k��(��) #r"+sorry3+" ��#k �̸�,\r\n"
          + "���� #b"+ soso3 + "��#k�� �����ؿ�..");
          cm.dispose();
}
       } else if (selection == 40) {
         cm.sendOk("����~ �׷��� #i"+reqitem[4]+"##b[#z"+reqitem[4]+"#]#k #r"+qwan[4]+"��#k�� �����~");
         cm.dispose();
       } else if (selection == 41) {
          cm.sendOk("�׷� �Ҽ����׿�.. ���߿��� �����ּ���~");
          cm.dispose();
       } else if (selection == 42) {
          if (cm.haveItem(reqitem[4], qwan[4])) {
          cm.gainItem(reqitem[4], -qwan[4]);
          cm.gainItem(rewitem[4], 1);
          cm.gainItem(rewitem[3], -1);
          cm.changeMusic("Bgm16/InWartime");
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("���� ��Ź�Ѹ�ŭ ������ �����Ѱ� ���ƿ� #h0#��.. \r\n������ ��� #b#i"+reqitem[4]+"##z"+reqitem[4]+"##k��(��) #r"+sorry4+" ��#k �̸�,\r\n"
          + "���� #b"+ soso4 + "��#k�� �����ؿ�..");
          cm.dispose();
}
       } else if (selection == 50) {
         cm.sendOk("#i"+reqitem[5]+"##b[#z"+reqitem[5]+"#]#k #r"+qwan[5]+"��#k�� ������ ������!");
         cm.dispose();
       } else if (selection == 51) {
          cm.sendOk("���߿� �����ϽŴٴ�, �˰ڽ��ϴ�.");
          cm.dispose();
       } else if (selection == 52) {
          if (cm.haveItem(reqitem[5], qwan[5])) {
          cm.gainItem(reqitem[5], -qwan[5]);
          cm.gainItem(rewitem[4], -1);
          cm.gainItem(rewitem[5], 1)
          cm.changeMusic("Bgm16/InWartime");
            cm.showEffect(true,"monsterPark/clear");
            cm.playSound(true,"Party1/Clear");
          cm.dispose();
         } else {
          cm.sendOk("���� ��Ź�Ѹ�ŭ ������ �����Ѱ� ���ƿ� #h0#��.. \r\n������ ��� #b#i"+reqitem[5]+"##z"+reqitem[5]+"##k��(��) #r"+sorry5+" ��#k �̸�,\r\n"
          + "���� #b"+ soso5 + "��#k�� �����ؿ�..");
          cm.dispose();
}
}
        }
}