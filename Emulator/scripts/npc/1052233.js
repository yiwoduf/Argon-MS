var status = -1;
    

// �ǵ��̽ø� �ȵ˴ϴ�.
lineUseArray = [];
Howmany = 5; //

coincode = 4310198;
coinqty = 30;

�� = null;


function start() {
    status = -1;
    action (1, 0, null);
}

function action(mode, type, selection) {
    ItemArray = [1040139, 1040140, 1040141, 1040143, 1040148, 1040194, 1040195, 1040196, 1041140, 1041143, 1041144, 1041146, 1041147, 1041193, 1041196, 1041197, 1041198, 1042064, 1042065, 1042159, 1042166, 1042171, 1042176, 1042186, 1042187, 1042189, 1042192, 1042208, 1042220, 1042228, 1042229, 1042232, 1042251, 1042252, 1042259, 1042263, 1042266, 1042277, 1042291, 1042293, 1042311, 1042320, 1042329, 1042332, 1042333, 1042336, 1042338, 1042339, 1042343, 1042345, 1042346, 1042348, 1042350, 1042354, 1042355, 1042356, 1042359, 1042361, 1042367, 1042375, 1042376, 1042378, 1048000, 1048001, 1048002, 1049000, 1102380]
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
        �� = "#fn������� Extrabold# ����! ���! #b��������30��#k�� �ڽ��� #b���ϴ� ������#k�� �־� �� �� #b�Ѱ���#k�� ���� �� �ִ� ��ȣ�� ��ȸ! �� #b���� ��ȸ#k�� ��ġ�� �ʰ���?\r\n\r\n"
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
         if (cm.itemQuantity(coincode) >= coinqty) {
          ���� = ItemArray[lineUseArray[Math.floor(Math.random() * lineUseArray.length)]]
          cm.gainItem(����,1);
          cm.gainItem(coincode,-coinqty)
          cm.sendOk("��Ӿ��! ���� �����۵� �����̳׿�!\r\n\r\n#i"+����+"# #b#z"+����+"##k");
        } else {
          cm.sendOk("������ �����մϴ�.")
        }
          cm.dispose();
    }
}
