var status = -1;
    

// �ǵ��̽ø� �ȵ˴ϴ�.
lineUseArray = [];
Howmany = 5; //

�� = null;


function start() {
    status = -1;
    action (1, 0, null);
}

function action(mode, type, selection) {
    ItemArray = [1012029, 1012038, 1012041, 1012042, 1012043, 1012049, 1012051, 1012057, 1012081, 1012090, 1012099, 1012100, 1012112, 1012113, 1012114, 1012121, 1012122, 1012123, 1012124, 1012125, 1012126, 1012127, 1012128, 1012129, 1012131, 1012133, 1012134, 1012147, 1012159, 1012166, 1012179, 1012180, 1012208, 1012253, 1012275, 1012298, 1012315, 1012390, 1012413, 1012462, 1012474, 1012486, 1012487, 1012488, 1012509, 1012510, 1012511, 1012534, 1012552, 1012572, 1012603, 1012608, 1012609, 1012619, 1012623, 1022046, 1022047, 1022048, 1022057, 1022065, 1022066, 1022081, 1022084, 1022085, 1022087, 1022090, 1022095, 1022104, 1022121, 1022122, 1022173, 1022194, 1022201, 1022227, 1022249, 1022250, 1022257, 1022258, 1022266, 1022269, 1022270, 1022275, 1032071, 1032072, 1032073, 1032074, 1032138, 1032145, 1032175, 1032204, 1032233, 1032234, 1032255, 1032260, 1032262, 1122121, 1122210, 1122268, 1122303, 1132183, 1152101];

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
      if (status == 0) {
        �� = selection;
        if (�� != null) {
           for (i=0; i<ItemArray.length; i++) {
            ��+= "#L"+i+"# #i"+ItemArray[i]+"#"
            if (lineUseArray.some(function(ok,index,lineUseArray) {
                 return ok == ��;
                  }) == false) { 
           lineUseArray.push(��);
            }
          }
        }
      }
    }    
    if (status == 0) {
       if (lineUseArray.length != Howmany) {
        �� = "����! ���! �ؿ��۵��� �������ִ±�ȸ! �ڽ��� #b���ϴ� ������#k�� �־� �� �� #b�Ѱ���#k�� ���� �� �ִ� ��ȣ�� ��ȸ! �� #b���� ��ȸ#k�� ��ġ�� �ʰ���?\r\n\r\n"
        ��+= "#r������ ������ ����#k : "+lineUseArray.length+"\r\n"
        ��+= "#r���� ���� ȸ��#k : "+(Howmany-lineUseArray.length)+"\r\n";
        for (i=0; i<ItemArray.length; i++) {
            ��+= "#L"+i+"# #i"+ItemArray[i]+"#"
            if (lineUseArray.some(function(ok,index,lineUseArray) {
                 return ok == i;
                  }) == true) { 
                ��+="#b#e#z"+ItemArray[i]+"##n#k\r\n"
            } else {
                ��+="#z"+ItemArray[i]+"#\r\n";
            }
        }
        cm.sendSimple(��);
        status --;
       } else {
          �� = "���� ���õ� ����Ʈ�� �������� �ְ� �̱⸦ �����Ͻðڽ��ϱ�?\r\n\r\n"
          for (i=0; i<lineUseArray.length; i++) {
             ��+= "#i"+ItemArray[lineUseArray[i]]+"# #b#e#z"+ItemArray[lineUseArray[i]]+"##k#n\r\n";
          }
          cm.sendYesNo(��)
       }
      } else if (status == 1) {
          ���� = ItemArray[lineUseArray[Math.floor(Math.random() * lineUseArray.length)]]
          cm.gainItem(����,1);
          cm.sendOk("��Ӿ��! ���� �����۵� �����̳׿�!\r\n\r\n#i"+����+"# #b#z"+����+"##k");
          cm.dispose();
    }
}
