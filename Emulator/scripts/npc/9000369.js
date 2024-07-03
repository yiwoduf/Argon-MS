function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        var chat = "#Cyellow#" + cm.getPlayer().getName() + "#k, #kWelcome to #bARGON ONLINE";
	chat += "#k#l\r\nThere are #Cyellow#"+getOnline()+" Users#k Online!#k #eRate#n : Exp #Cyellow#"+cm.getClient().getChannelServer().getExpRate()+"#k, Meso #Cyellow#"+cm.getClient().getChannelServer().getMesoRate()+"#k, Drop #Cyellow#"+cm.getClient().getChannelServer().getDropRate()+"#k"
	chat += "\r\n#L1##i5450011# MARKET#l #L2##i5044006# WARP#l #L3##i4033458# SYSTEM#l \r\n#L4##i2431377# CONTENTS#l #L0##i4001759# POINTSHOP#l #e#k#l#L5##rEND CONVERSATION#k#l"; 
        cm.sendSpirit(chat,true,0);
    } else if (status == 1) {	
           if (selection == 0) { // EVENT
                cm.dispose();
  		cm.openNpc(9000445);
	} else if (selection == 1) { // MARKET
		cm.dispose();
		cm.openNpc(9001144);
        } else if (selection == 2) { // WARP
		cm.dispose();
		cm.openNpc(1530706);
	} else if (selection == 3) { // SYSTEM
		cm.dispose();
		cm.openNpc(2120032);
	} else if (selection == 4) { // CONTENTS
		cm.dispose();
		cm.openNpc(1540106);
	} else if (selection == 5) { // close
		cm.dispose();
        }
        } else if (status == 2) {
	        cm.dispose();
	        cm.openShop(selection);
        }
}

function getOnline()
{
 getUser = Packages.launch.world.WorldConnected.getConnected().toString().split("0=")[1].split(",")[0];
 Connect = java.lang.Integer.parseInt(getUser);
 return Connect;
}


//#k#l\r\n#g현재 #r"+getOnline()+"명#k#g이 접속중입니다#k #e배율#n : 경험치 #r"+cm.getClient().getChannelServer().getExpRate()+"#k배, 메소 #r"+cm.getClient().getChannelServer().getMesoRate()+"#k배, 드롭 #r"+cm.getClient().getChannelServer().getDropRate()+"#k배
