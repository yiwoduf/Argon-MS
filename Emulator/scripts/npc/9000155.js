/*
MADE BY FOX (rinus_alt & fox_devel@nate.com)
���� ���� �� ������ ������ �����ϰ� �ֽ��ϴ�.
*/

importPackage(Packages.client);
importPackage(Packages.constants);

var status = -1;

// spenditem :: ��������
var spenditem = 4001431; 

// giveitem :: ������ ������
var giveitem = new Array(new Array(4001431, 1), new Array(4001519, 1), new Array(4001431, 2),new Array(4001519, 1),  new Array(4001431, 3), new Array(4001519, 1), new Array(4001431, 4), new Array(4001431, 5), new Array(4001519, 1), new Array(4001432, 1), new Array(4001519, 1), new Array(4001432, 2), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 30), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1), new Array(4001519, 1));

function start(){
    action(1,0,0);
}

 

giveitem.sort(function(){
    return Math.random() - Math.random();
});

 

function action(mode,type,selection){
    if(mode == 1){
        status++;
    }else{
        status--;
        cm.dispose();
    }
    if (status == 0){
		//cm.sendOk("#fn������� EXtrabold# ������ �̿��Ͻ� �� �����ϴ�.")
        cm.sendYesNo("#k#fn������� EXtrabold# ���� ���� �����ǿ� ���Ű� ȯ���ؿ�.\r\n#fn������� EXtrabold# �����ǿ����� #b���� ����� ������#k�� ���´�ϴ�!#k#n\r\n\r\n�̿��Ͻ÷��� #i" + spenditem + "# #b#z" + spenditem + "##k 2���� �ʿ��մϴ�.");
    }else if (status == 1){
        if (cm.haveItem(spenditem, 2)){
            if (cm.canHold(giveitem[0][0])){
                if (giveitem[0][1] != 0) {
                    cm.gainItem(giveitem[0][0], giveitem[0][1]);
                    cm.gainItem(spenditem, -2);
                    cm.sendOk("#i" + giveitem[0][0] + "# #b#z" + giveitem[0][0] + "# #k" + giveitem[0][1] + " ���� ȹ���ϼ̽��ϴ�.");
					cm.showWZEffect("UI/UIWindow1.img/HofMEffect/teleport", 1);
                    cm.dispose();
                } else {
                    cm.sendOk("#fn������� EXtrabold# �ƽ��Ե� ���� ���ӽ��ϴ�.");
                    cm.gainItem(spenditem, -1);
                    cm.dispose();
                }
            } else {
                cm.sendOk("#fn������� EXtrabold# �κ��丮 ���������� �����մϴ�.");
                cm.dispose();
            }
        } else {
            cm.sendOk("#i"+spenditem+"##b#fn������� EXtrabold# ������ �̿��#k �� ���������� �ʽ��ϴ�.");
            cm.dispose();
        }    
    }    
}