/*


������


*/


var status = 0;


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
var j_coin = cm.itemQuantity(4310029);
   var text ="������ ������ ���λ���   ���� #i4310070#  ���� ��ȯ����) ";
   text += "\r\n#L13# #i1142059# #b#z1142059##k (300��) 1500/300";
   text += "\r\n#L9# #i2430050# #b#z2430050##k (50��) ";
   text += "\r\n#L10# #i2432580# #b#z2432580##k (50��)";
   text += "\r\n#L11# #i3010636# #b#z3010636##k (50��)";
   

   cm.sendSimple(text);
  } else if (status == 1) {
   if (selection == 0) {
    if (cm.haveItem(4310057, 1500)) {
     cm.gainItem(4310057, -1500);
     cm.gainItem(4310067, 1000);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 3) {
    if (cm.haveItem(4031311, 10)) {
     cm.gainItem(4031311, -10);
     cm.gainltem(4310059, 10);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 4) {
    if (cm.haveItem(4031311, 10)) {
     cm.gainItem(4031311, -10);
     cm.gainItem(4310038, 30);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 5) {
    if (cm.haveItem(4031311, 30)) {
     cm.gainItem(4031311, -30);
     cm.gainItem(4310027, 30);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 6) {
    if (cm.haveItem(4031311, 300)) {
     cm.gainItem(4031311, -300);
     cm.gainItem(4310119, 100);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 7) {
    if (cm.haveItem(4031311, 500)) {
     cm.gainItem(4031311, -500);
     cm.gainItem(4310154, 100);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 8) {
     if (cm.haveItem(3991018, 1)) {
     cm.gainItem(3991018, -200);
     cm.gainItem(3991012, -200);
     cm.gainItem(3991000, -200);
     cm.gainItem(3991017, -200);
     cm.gainItem(3991019, -200);
     cm.gainItem(3994475, 100);
     cm.sendOk("#i3994475# ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z3994475##k�� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 9) {
    if (cm.haveItem(4310070, 1)) {
     cm.gainItem(4310070, -50);
     cm.gainItem(2430050, 1);
     cm.sendOk("#i2430050# ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310070##k�� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 10) {
    if (cm.haveItem(4310070, 1)) {
     cm.gainItem(4310070, -50);
     cm.gainItem(2432580, 1);
     cm.sendOk("#i2432580# ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#b#z4310070##k�� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 11) {
    if (cm.haveItem(4310070, 1)) {
     cm.gainItem(4310070, -50);
     cm.gainItem(3010636, 1);
     cm.sendOk("#i3010636# ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4310070#�� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 12) {
    if (cm.haveItem(3991018, 1)) {
     cm.gainItem(3991018, -600);
     cm.gainItem(3991012, -600);
     cm.gainItem(3991000, -600);
     cm.gainItem(3991017, -600);
     cm.gainItem(3991019, -600);
     cm.gainItem(4310195, 300);
     cm.sendOk("#i4310195# ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4310195#�� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 1) {
      if (cm.haveItem(3991018, 1)) {
      cm.gainItem(3991018, -1000);
     cm.gainItem(3991012, -1000);
     cm.gainItem(3991000, -1000);
     cm.gainItem(3991017, -1000);
     cm.gainItem(3991019, -1000);
     cm.gainItem(4310195, 500);
     cm.sendOk("#i4310195# ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4310195#�� �����մϴ�.");
     cm.dispose();
    }
 } else if (selection == 13) {
    if (cm.haveItem(4310070, 300)) {
     cm.gainItem(4310070, -300);
     cm.gainSponserItem(1142059,'[ũ�����߷�]',1500,300,0);
     cm.sendOk("#i4310070#  ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4310070# �� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 14) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(4310154, 30);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 15) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(4310027,30);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 16) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102532,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 17) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102630,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 18) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102644,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 19) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102466,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 20) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102643,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 21) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1052671,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 22) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1002665,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 23) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1052137,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 24) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702299,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 25) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702442,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 26) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702211,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 27) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1002738,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 28) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702309,'[������ ����]',50,10,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();


    }
   }
  }
 }
}