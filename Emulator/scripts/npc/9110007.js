/*

�׷��彺�丮 ������Ʈ

*/

 

var status = -1;

function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
        /*
        ���� �������� 0���� 99����
        �̵� �������� 100���� 199����
        ������ �������� 200���� 299����
        ��� �������� 300���� 399����
        */
        var choose = "#fn������� ExtraBold##fs 16##e< �����÷��� �Ŀ����� >#n#k\r\n";
        choose += "#L4##fn������� ExtraBold##fs 13##e#r[HOT]#k#b�߰�������#k#n\r\n\r\n";
		choose += "#L5000003##fn������� ExtraBold##fs 13##e#r[HOT]#k#r��������\r\n\r\n";
		choose += "#L5##fn������� ExtraBold##fs 13##e#r[HOT]#n#e#b�Ŀ� ��ȭ[25��]#k#n\r\n\r\n";
		choose += "#L1032206##fn������� ExtraBold##fs 13##e#b��Į������\r\n\r\n";
		choose += "#L9000344##fn������� ExtraBold##fs 13##e#b���纯��\r\n\r\n";
        choose += "#L1##fn������� ExtraBold##fs 13##b�Ŀ� ����(��Ʈ)#k\r\n\r\n";     
        choose += "#L9##b[New]�Ŀ� ����#k\r\n\r\n";    
        choose += "#L19##b[HOT]�˻��� �Ŀ� ����#k\r\n\r\n";    
        choose += "#L2##b[New]�Ŀ� ���� (���ڼ�Ʈ)#k\r\n\r\n";
        choose += "#L3##b[New]�Ŀ� ���� (���ڼ�Ʈ)#k\r\n";

        if (cm.getPlayer().hasGmLevel(100)){

  }
        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.EnterCS
();
            cm.dispose();
 } else if (s == 1) {
  cm.openNpc (1032005);
   } else if (s == 5000003) {
  cm.openNpc (5000003);
     } else if (s == 9000344) {
  cm.openNpc (9000344);
 } else if (s == 2) {
  cm.openNpc (2400010);
 } else if (s == 3) {
  cm.openNpc (1032100);
 } else if (s == 4) {
  cm.openNpc (1081001);
 } else if (s == 5) {
  cm.openNpc (9010060);
 } else if (s == 9) {
  cm.openNpc (2030001);
 } else if (s == 1032206) {
  cm.openNpc (1032206);
 } else if (s == 19) {
  cm.openNpc (1094000);
        }
    }
}
