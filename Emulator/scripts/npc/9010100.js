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
   var text = "#k#eHI? Do you want some REAL FUN?\r\n #i4310229#With one of these, I will get you some fun!";
   text += "\r\n#e(Provided when you create) #i1142840##i3700281##i3010307##i2433981#";
   text += "\r\n#L3# #i2430029# #e#bHow do I play Pink Bean?";
   text += "\r\n#L4# #i4310229# #e#dI want to buy a coin!";   
   text += "\r\n#L5# #i4034380# #e#kI have a coin in the storage!";  
   text += "\r\n#L6# #i3010307# #e#rI am ready to have some fun!#k";  
   text += "\r\n#L7# #i5064400# #n#b(Return to previous JOB map)#k";   
  
   

   cm.sendSimple(text);
  } else if (status == 1) {
   if (selection >= 1000000) {
    if (cm.haveItem(4033248, 1)) {
     cm.gainItem(4033248, -1);
     cm.gainItem(selection, 1);
     cm.sendOk("200 제 무기 여기있다.");
     cm.dispose();
    } else {
     cm.sendOk("무지개 단풍이 부족한것같은데?");
     cm.dispose();
    }
   } else if (selection == 3) {
	cm.sendOk("With this coin you buy with rebirth point, \r\n#i4310229# you can play pink bean in the game.\r\nPink Bean is ONLY available thorugh #r#eMikhail#n#k job. If you don't have a coin, please buy one or return back to job map.");
	cm.dispose();
   } else if (selection == 5) {
    	cm.dispose();
	cm.openNpc(3003332);
   } else if (selection == 4) {
     cm.dispose();
     cm.openNpc(9072303);
   } else if (selection == 6) {
     if (cm.haveItem(4310229, 1) && cm.getPlayer().getJob() == 5000) {
	    cm.gainItem(4310229, -1);
	    cm.gainItemAllStat(1032024, 1, 200, 30);
	    cm.gainItemAllStat(1072153, 1, 200, 30);
	    cm.gainItemAllStat(1142840, 1, 2020, 246);
	    cm.gainItem(3700281,1);
	    cm.gainItem(3010307,1);
	    cm.gainItem(2433981,1);
            for (var i = cm.getPlayer().getLevel(); i < 10; i++) {
                cm.getPlayer().levelUp();
            }
                cm.getPlayer().changeJob(13100);
	    cm.resetStats(4, 4, 4, 4);
	    cm.sendGuide();
	    cm.warp(100000000);
	    cm.openNpc(9010031);
     } else {
	cm.sendOk("#e#bRequirements : Job #rMikhail#b and #i4310229# coin");
	cm.dispose();
}
   } else if (selection == 7) {
     cm.warp(350140100);
     cm.dispose();
   } else if (selection == 4) {
     cm.dispose();
     cm.openNpc(9072303);
   }
  }
 }
}