var status = -1;
    

// 건들이시면 안됩니다.
lineUseArray = [];
Howmany = 5; //

coincode = 4310198;
coinqty = 30;

앙 = null;


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
        앙 = selection;
        if (앙 != null) {
           for (i=0; i<ItemArray.length; i++) {
            말+= "#L"+i+"# #i"+ItemArray[i]+"#"
            if (lineUseArray.some(function(ok,index,lineUseArray) {
                 return ok == 앙;
                  }) == false) { 
           lineUseArray.push(앙);
            }
          }
        }
      }
    }    
    if (status == 0) {
       if (lineUseArray.length != Howmany) {
        말 = "#fn나눔고딕 Extrabold# 골라요! 골라! #b떡국코인30개#k로 자신이 #b원하는 아이템#k만 넣어 그 중 #b한가지#k를 얻을 수 있는 절호의 기회! 이 #b멋진 기회#k를 놓치진 않겠죠?\r\n\r\n"
        말+= "#r선택한 아이템 개수#k : "+lineUseArray.length+"\r\n"
        말+= "#r남은 선택 회수#k : "+(Howmany-lineUseArray.length)+"\r\n";
        for (i=0; i<ItemArray.length; i++) {
            말+= "#L"+i+"# #i"+ItemArray[i]+"#"
            if (lineUseArray.some(function(ok,index,lineUseArray) {
                 return ok == i;
                  }) == true) { 
                말+="#b#e#z"+ItemArray[i]+"##n#k\r\n"
            } else {
                말+="#z"+ItemArray[i]+"#\r\n";
            }
        }
        cm.sendSimple(말);
        status --;
       } else {
          말 = "현재 선택된 리스트의 아이템을 넣고 뽑기를 시작하시겠습니까?\r\n\r\n"
          for (i=0; i<lineUseArray.length; i++) {
             말+= "#i"+ItemArray[lineUseArray[i]]+"# #b#e#z"+ItemArray[lineUseArray[i]]+"##k#n\r\n";
          }
          cm.sendYesNo(말)
       }
      } else if (status == 1) {
         if (cm.itemQuantity(coincode) >= coinqty) {
          랜덤 = ItemArray[lineUseArray[Math.floor(Math.random() * lineUseArray.length)]]
          cm.gainItem(랜덤,1);
          cm.gainItem(coincode,-coinqty)
          cm.sendOk("어머어머! 좋은 아이템도 나오셨네요!\r\n\r\n#i"+랜덤+"# #b#z"+랜덤+"##k");
        } else {
          cm.sendOk("코인이 부족합니다.")
        }
          cm.dispose();
    }
}
