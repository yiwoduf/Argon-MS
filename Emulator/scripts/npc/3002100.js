var status = -1;
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";

importPackage(Packages.constants);

function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
}
function getOnline()
{
	getUser = Packages.launch.world.WorldConnected.getConnected().toString().split("0=")[1].split(",")[0];
	Connect = java.lang.Integer.parseInt(getUser);
	return Connect;
}

    if (mode == 1) {
        status++;
    }
    if (status == 0) {

        var choose = "                #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 직업선택 "+별+"\r\n#fs10##Cgray#                                    당신의 직업을 선택해주세요.\r\n#k#fs12#\r\n#r▶ "+ServerConstants.serverName+"#k 에 오신 것을 환영합니다.\r\n#b▶ #h ##k 님의 직업을 설정해주세요.#n#k\r\n\r\n";
 
        if (cm.getPlayer().getJob() == 10112 ){
        choose += "#fn나눔고딕 Extrabold##L100#게임을 시작하겠습니다.#k";
  }
        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.openNpc (1022107);
    
     } else if (s == 100) {
		cm.dispose(); cm.dispose(); cm.warp(100000000, 0); cm.gainMeso(5000000); cm.giveAllStatItemwatk(1142282,300,50); 모험가자동전직(); //cm.스킬마스터(); 

     } else if (s == 155) {
	    cm.dispose();
	    cm.openNpc(2182002);

        }
    }
}
