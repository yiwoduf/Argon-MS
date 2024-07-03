/*
MADE BY FOX (rinus_alt & fox_devel@nate.com)
무단 수정 및 배포는 엄격히 금지하고 있습니다.
*/

importPackage(Packages.client);
importPackage(Packages.constants);

var status = -1;

// spenditem :: 사용아이템
var spenditem = 4001431; 

// giveitem :: 나오는 아이템
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
		//cm.sendOk("#fn나눔고딕 EXtrabold# 아직은 이용하실 수 없습니다.")
        cm.sendYesNo("#k#fn나눔고딕 EXtrabold# 돌려 돌려 돌림판에 오신걸 환영해요.\r\n#fn나눔고딕 EXtrabold# 돌림판에서는 #b각종 희귀한 아이템#k이 나온답니다!#k#n\r\n\r\n이용하시려면 #i" + spenditem + "# #b#z" + spenditem + "##k 2개가 필요합니다.");
    }else if (status == 1){
        if (cm.haveItem(spenditem, 2)){
            if (cm.canHold(giveitem[0][0])){
                if (giveitem[0][1] != 0) {
                    cm.gainItem(giveitem[0][0], giveitem[0][1]);
                    cm.gainItem(spenditem, -2);
                    cm.sendOk("#i" + giveitem[0][0] + "# #b#z" + giveitem[0][0] + "# #k" + giveitem[0][1] + " 개를 획득하셨습니다.");
					cm.showWZEffect("UI/UIWindow1.img/HofMEffect/teleport", 1);
                    cm.dispose();
                } else {
                    cm.sendOk("#fn나눔고딕 EXtrabold# 아쉽게도 꽝이 나왓습니다.");
                    cm.gainItem(spenditem, -1);
                    cm.dispose();
                }
            } else {
                cm.sendOk("#fn나눔고딕 EXtrabold# 인벤토리 공간부족이 부족합니다.");
                cm.dispose();
            }
        } else {
            cm.sendOk("#i"+spenditem+"##b#fn나눔고딕 EXtrabold# 돌림판 이용권#k 을 가지고있지 않습니다.");
            cm.dispose();
        }    
    }    
}