var status = 0;
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/1#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/11#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"
��ȸ = "#fUI/GuildMark.img/Mark/Pattern/00004001/15#"
���� = "#fUI/GuildMark.img/Mark/Pattern/00004001/16#"
�պ� = "#fUI/FarmUI.img/objectStatus/star/whole#"
var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
importPackage(Packages.constants);

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) { if (mode == -1) { cm.dispose(); } else { if (mode == 0) { cm.dispose(); return; } if (mode == 1) status++; else status--;

    if (status == 0) {
		var Lcoin = cm.itemQuantity(4310071);
		var jessica = "  #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+"�� ���� ���� ȯ���մϴ�. "+�պ�+" \r\n#fs10#                                  #Cgray#��ſ� �ð� �ǽñ� �ٶ��ϴ�.#k\r\n\r\n#fs12#"; 
		jessica += "                  #b#h ##k ���� "+ServerConstants.serverName+" #bȯ�� Ƚ��#k : #r"+cm.getReborns()+" P#k\r\n";
                jessica += "                       #b�Ŀ� ����Ʈ#k : #r"+cm.getRC()+" P#k #bȫ�� ����#k : #r"+ Lcoin +" ��#k\r\n";
