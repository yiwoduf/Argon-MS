var status = -1;
var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";

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

        var choose = "                #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" �������� "+��+"\r\n#fs10##Cgray#                                    ����� ������ �������ּ���.\r\n#k#fs12#\r\n#r�� "+ServerConstants.serverName+"#k �� ���� ���� ȯ���մϴ�.\r\n#b�� #h ##k ���� ������ �������ּ���.#n#k\r\n\r\n";
 
        if (cm.getPlayer().getJob() == 10112 ){
        choose += "#fn������� Extrabold##L100#������ �����ϰڽ��ϴ�.#k";
  }
        cm.sendSimple(choose);

    } else if (status == 1) {
        var s = selection;
        cm.dispose();
        if (s == 0) {
            cm.openNpc (1022107);
    
     } else if (s == 100) {
		cm.dispose(); cm.dispose(); cm.warp(100000000, 0); cm.gainMeso(5000000); cm.giveAllStatItemwatk(1142282,300,50); ���谡�ڵ�����(); //cm.��ų������(); 

     } else if (s == 155) {
	    cm.dispose();
	    cm.openNpc(2182002);

        }
    }
}
