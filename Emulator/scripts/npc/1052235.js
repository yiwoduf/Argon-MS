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
    ItemArray = [1060122, 1060123, 1060125, 1060139, 1060179, 1060181, 1060187, 1060188, 1060189, 1061143, 1061144, 1061145, 1061147, 1061204, 1061207, 1061210, 1061211, 1061212, 1061213, 1062049, 1062050, 1062117, 1062163, 1062170, 1062173, 1062188, 1062189, 1062204, 1062210, 1062211, 1062217, 1062218, 1062220, 1062222, 1062223, 1062228, 1062235, 1062236, 1062244, 1062245]
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
