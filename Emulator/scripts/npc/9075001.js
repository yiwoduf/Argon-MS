/*


내꼬임


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
   var text = "[#e컨텐츠상점#k를 담당하는 스마트 스우 입니다]] #i4310184#으로 교환가능) ";
//   text += "#l#e<장갑>#n";
//   text += "\r\n#L3##i1082392# - 올스텟(50) 공/마(10) - #r8개/잠재:총댐20퍼,올텟20퍼,보공40퍼#k\r\n\r\n";
   text += "\r\n#L3# #i1142836# #b#z1142836##k (300개) 1500/300";
   text += "\r\n#L8# #i2434734# #b#z2434734##k (200개) ";
   text += "\r\n#L4# #i1102766# #b#z1102766##k (80개) 500/300 ";   
   text += "\r\n#L5# #i1052852# #b#z1052852##k (80개) 500/300";
   text += "\r\n#L10# #i3015155# #b#z3015155##k (50개) 특수의자";
   text += "\r\n#L6# #i1012528# #b#z1012528##k (40개) 100/50";
   text += "\r\n#L7# #i1112960# #b#z1112960##k (30개) 100/50";
   text += "\r\n#L12# #i1112940# #b#z1112940##k (30개) 100/50";
  
   

   cm.sendSimple(text);
  } else if (status == 1) {
   if (selection == 0) {
    if (cm.haveItem(4310057, 1500)) {
     cm.gainItem(4310057, -1500);
     cm.gainItem(4310067, 1000);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 3) {
    if (cm.haveItem(4310184, 300)) {
     cm.gainItem(4310184, -300);
     cm.gainSponserItem(1142836,'[스우격파]',1500,300,0);
     cm.sendOk("12주년코인 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("12주년코인이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 4) {
    if (cm.haveItem(4310184, 80)) {
     cm.gainItem(4310184, -80);
     cm.gainSponserItem(1102766,'[스우]',500,300,0);
     cm.sendOk("12주년코인 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("12주년 코인이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 5) {
    if (cm.haveItem(4310184, 80)) {
     cm.gainItem(4310184, -80);
     cm.gainSponserItem(1052852,'[스우]',500,300,0);
     cm.sendOk("12주년코인 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("12주년코인이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 6) {
    if (cm.haveItem(4310184, 40)) {
     cm.gainItem(4310184, -40);
     cm.gainSponserItem(1012528,'[스우]',100,50,0);
     cm.sendOk("12주년코인 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("12주년코인이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 7) {
    if (cm.haveItem(4310184, 30)) {
     cm.gainItem(4310184, -30);
     cm.gainSponserItem(1112960,'[스우]',100,50,0);
     cm.sendOk("12주년코인 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("12주년코인이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 8) {
    if (cm.haveItem(4310184, 200)) {
     cm.gainItem(4310184, -200);
     cm.gainItem(2434734, 1);
     cm.sendOk("12주년 코인 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("12주년코인이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 9) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainItem(1113055, 1);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 10) {
    if (cm.haveItem(4310184, 50)) {
     cm.gainItem(4310184, -50);
     cm.gainItem(3015155, 1);
     cm.sendOk("12주년코인 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("12주년코인이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 11) {
    if (cm.haveItem(4031311, 5)) {
     cm.gainItem(4031311, -5);
     cm.gainItem(5122015, 1);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 12) {
    if (cm.haveItem(4310184, 10)) {
     cm.gainItem(4310184, -30);
     cm.gainSponserItem(1112940,'[스우]',100,50,0);
     cm.sendOk("12주년코인이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("12주년코인이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 13) {
    if (cm.haveItem(4031311, 3000)) {
     cm.gainItem(4031311, -3000);
     cm.gainSponserItem(1142724,'[이벤트]',2000,500,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
 } else if (selection == 13) {
    if (cm.haveItem(4031311, 3000)) {
     cm.gainItem(4031311, -3000);
     cm.gainSponserItem(1142724,'[이벤트]',2000,500,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 14) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(4310154, 30);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 15) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(4310027,30);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 16) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102532,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 17) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102630,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 18) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102644,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 19) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102466,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 20) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1102643,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 21) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1052671,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 22) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1002665,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 23) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1052137,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 24) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702299,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 25) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702442,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 26) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702211,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 27) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1002738,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();
    }
   } else if (selection == 28) {
    if (cm.haveItem(4031311, 100)) {
     cm.gainItem(4031311, -100);
     cm.gainSponserItem(1702309,'[레벨업 보상]',50,10,0);
     cm.sendOk("눈송이 결정 교환이 완료되었습니다.");
     cm.dispose();
    } else {
     cm.sendOk("눈송이 결정이 부족합니다.");
     cm.dispose();


    }
   }
  }
 }
}