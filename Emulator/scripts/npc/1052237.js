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
    ItemArray = [1081006, 1082165, 1082251, 1082253, 1082255, 1082267, 1082274, 1082407, 1082408, 1082421, 1082422, 1082423, 1082448, 1082495, 1082500, 1082502, 1082503, 1082504, 1082511, 1082517, 1082523, 1082541, 1082542, 1082550, 1082554, 1082558, 1082561, 1082563, 1082564, 1082581, 1082585, 1082591, 1082592, 1082623, 1082624, 1082631, 1082641, 1082685, 1082689, 1082692, 1082694, 1082702, 1082703, 1082712, 1082713, 1082714, 1082715, 1082717, 1082718]
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
