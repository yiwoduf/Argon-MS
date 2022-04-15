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
    ItemArray = [1100000, 1102098, 1102144, 1102150, 1102156, 1102162, 1102171, 1102208, 1102209, 1102210, 1102213, 1102214, 1102216, 1102217, 1102218, 1102220, 1102221, 1102229, 1102230, 1102233, 1102238, 1102240, 1102243, 1102252, 1102253, 1102257, 1102259, 1102291, 1102296, 1102300, 1102301, 1102318, 1102336, 1102343, 1102344, 1102373, 1102374, 1102387, 1102388, 1102391, 1102392, 1102396, 1102419, 1102423, 1102424, 1102425, 1102426, 1102427, 1102428, 1102429, 1102430, 1102431, 1102432, 1102433, 1102434, 1102435, 1102436, 1102437, 1102438, 1102461, 1102465, 1102486, 1102488, 1102508, 1102513, 1102549, 1102555, 1102604, 1102605, 1102613, 1102614, 1102622, 1102631, 1102640, 1102641, 1102642, 1102651, 1102652, 1102653, 1102654, 1102655, 1102656, 1102657, 1102658, 1102668, 1102673, 1102682, 1102683, 1102684, 1102697, 1102705, 1102723, 1102724, 1102726, 1102756, 1102779, 1102780, 1102781, 1102782, 1102783, 1102784, 1102785, 1102786, 1102787, 1102788, 1102798, 1102800, 1102801, 1102808, 1102818, 1102820, 1102827, 1102835, 1102839, 1102842, 1102860, 1102868, 1102884, 1102885, 1102886, 1102908, 1102910, 1102912, 1102913, 1102927, 1102937, 1102938, 1102939, 1102953, 1102954, 1102955, 1102956, 1102957, 1102958, 1102966, 1102968, 1102969, 1102970, 1102971, 1102972, 1102975, 1102978, 1102982, 1102983, 1102984, 1102991, 1102995, 1103000, 1103003, 1103004, 1103007, 1103008, 1103009, 1103012]
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
