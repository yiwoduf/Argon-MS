var status = 0;
별빨 = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
별파 = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
별보 = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
별회 = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"
별검 = "#fUI/GuildMark.img/Mark/Pattern/00004001/16#"
왕별 = "#fUI/FarmUI.img/objectStatus/star/whole#"
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
importPackage(Packages.constants);

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) { if (mode == -1) { cm.dispose(); } else { if (mode == 0) { cm.dispose(); return; } if (mode == 1) status++; else status--;

    if (status == 0) {
		var Lcoin = cm.itemQuantity(4310071);
		var jessica = "  #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+"에 오신 것을 환영합니다. "+왕별+" \r\n#fs10#                                  #Cgray#즐거운 시간 되시기 바랍니다.#k\r\n\r\n#fs12#"; 
		jessica += "                  #b#h ##k 님의 "+ServerConstants.serverName+" #b환생 횟수#k : #r"+cm.getReborns()+" P#k\r\n";
                jessica += "                       #b후원 포인트#k : #r"+cm.getRC()+" P#k #b홍보 코인#k : #r"+ Lcoin +" 개#k\r\n";
