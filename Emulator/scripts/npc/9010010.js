/*

	Áª½ºÅæ ¾ÆÀÌÅÛ °­È­ ½ºÅ©¸³Æ®
	Ä¡¿ì¾¾ (projectchiu16@nate.com)

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
   var text = "#b#fs13##eArgon Online Core Gemstone Upgrade\r\n #e#i2435719# One Core for every upgrade#n#k";
   text += "\r\n#L1#Use#b Core#k to upgrade #eBossATK%#n";
   text += "\r\n#L2#Use#b Core#k to upgrade #eOverallATK%#n";
   text += "\r\n#L3#Use#b Core#k to upgrade #eAllStat%#n";
   text += "\r\n#L4#Use#b Core#k to lower#e required level#n";

   cm.sendSimple(text);
  } else if (status == 1) {
   if (selection == 1) {
	cm.dispose();
	cm.openNpc(1404005);
   } else if (selection == 2) {
	cm.dispose();
	cm.openNpc(1404007);
   } else if (selection == 3) {
	cm.dispose();
	cm.openNpc(3003201);
   } else if (selection == 4) {
	cm.dispose();
	cm.openNpc(1540495);
   }
  }
 }
}