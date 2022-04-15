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
