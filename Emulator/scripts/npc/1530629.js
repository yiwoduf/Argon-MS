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
   var text = "#r #fs13#  ���̾� ������ ����ϴ� ����Ʈ ���̾� �Դϴ� #i4310199#���� ��ȯ����) ";
   text += "\r\n#L3# #i1142968# #b#z1142968##k (300��) 2000/300 Ư�� ����Ʈ";
   //text += "\r\n#L8# #i2434734# #b#z2434734##k (200��) ";
   //text += "\r\n#L4# #i1102766# #b#z1102766##k (80��) 500/300 ";   
   //text += "\r\n#L5# #i1052852# #b#z1052852##k (80��) 500/300";
   //text += "\r\n#L10# #i3015155# #b#z3015155##k (50��) Ư������";
   text += "\r\n#L6# #i1115108# #b#z1115108##k (80��) 200/50";
   text += "\r\n#L7# #i1115019# #b#z1115019##k (80��) 200/50";
   text += "\r\n#L12# #i3015517# #b#z3015517##k (80��) ";
  
   

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
    if (cm.haveItem(4310199, 300)) {
     cm.gainItem(4310199, -300);
     cm.gainSponserItem(1142968,'[���̾Ȱ���]' ,2000,300,0);
     cm.sendOk("���̾� ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("���̾������� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 4) {
    if (cm.haveItem(4310184, 80)) {
     cm.gainItem(4310184, -80);
     cm.gainSponserItem(1102766,'[����]',500,300,0);
     cm.sendOk("12�ֳ����� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("12�ֳ� ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 5) {
    if (cm.haveItem(4310184, 80)) {
     cm.gainItem(4310184, -80);
     cm.gainSponserItem(1052852,'[����]',500,300,0);
     cm.sendOk("12�ֳ����� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("12�ֳ������� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 6) {
    if (cm.haveItem(4310199, 80)) {
     cm.gainItem(4310199, -80);
     cm.gainSponserItem(1115108,'[���̾�]',200,50,0);
     cm.sendOk("���̾����� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("���̾� ������ �����մϴ�.");
     cm.dispose();
    }
 } else if (selection == 7) {
    if (cm.haveItem(4310199, 80)) {
     cm.gainItem(4310199, -80);
     cm.gainSponserItem(1115019,'[���̾�]',200,50,0);
     cm.sendOk("���̾����� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("���̾� ������ �����մϴ�.");
     cm.dispose();
    }
   
   } else if (selection == 8) {
    if (cm.haveItem(4310184, 200)) {
     cm.gainItem(4310184, -200);
     cm.gainItem(2434734, 1);
     cm.sendOk("12�ֳ� ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("12�ֳ������� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 9) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainItem(1113055, 1);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 10) {
    if (cm.haveItem(4310184, 50)) {
     cm.gainItem(4310184, -50);
     cm.gainItem(3015155, 1);
     cm.sendOk("12�ֳ����� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("12�ֳ������� �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 11) {
    if (cm.haveItem(4031311, 5)) {
     cm.gainItem(4031311, -5);
     cm.gainItem(5122015, 1);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
   } else if (selection == 12) {
    if (cm.haveItem(4310199, 80)) {
     cm.gainItem(4310199, -80);
     cm.gainItem(3015517, 1);
     cm.sendOk("���̾����� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("���̾������� �����մϴ�.");       
     cm.dispose();
    }
   } else if (selection == 13) {
    if (cm.haveItem(4031311, 3000)) {
     cm.gainItem(4031311, -3000);
     cm.gainSponserItem(1142724,'[�̺�Ʈ]',2000,500,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
     cm.dispose();
    }
 } else if (selection == 13) {
    if (cm.haveItem(4031311, 3000)) {
     cm.gainItem(4031311, -3000);
     cm.gainSponserItem(1142724,'[�̺�Ʈ]',2000,500,0);
     cm.sendOk("������ ���� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("������ ������ �����մϴ�.");
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