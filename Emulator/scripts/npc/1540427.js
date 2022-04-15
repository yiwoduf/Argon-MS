var status = -1;
var material = 4310129;
var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
var coin = 30;
var item = new Array(new Array(3700000, 1), new Array(3700001, 1), new Array(3700002, 1), new Array(3700003, 1), new Array(3700004, 1), new Array(3700005, 1), new Array(3700006, 1), new Array(3700007, 1), new Array(3700008, 1), new Array(3700009, 1), new Array(3700010, 1), new Array(3700011, 1), new Array(3700012, 1), new Array(3700013, 1), new Array(3700014, 1), new Array(3700015, 1), new Array(3700016, 1), new Array(3700017, 1), new Array(3700018, 1), new Array(3700019, 1), new Array(3700020, 1), new Array(3700021, 1), new Array(3700022, 1), new Array(3700023, 1), new Array(3700024, 1), new Array(3700025, 1), new Array(3700026, 1), new Array(3700030, 1), new Array(3700031, 1), new Array(3700032, 1), new Array(3700033, 1), new Array(3700034, 1), new Array(3700035, 1), new Array(3700036, 1), new Array(3700037, 1), new Array(3700039, 1), new Array(3700040, 1), new Array(3700041, 1), new Array(3700042, 1), new Array(3700043, 1), new Array(3700044, 1), new Array(3700045, 1), new Array(3700046, 1), new Array(3700047, 1), new Array(3700048, 1), new Array(3700049, 1), new Array(3700053, 1), new Array(3700054, 1), new Array(3700055, 1), new Array(3700056, 1), new Array(3700057, 1), new Array(3700058, 1), new Array(3700059, 1), new Array(3700060, 1), new Array(3700061, 1), new Array(3700062, 1), new Array(3700063, 1), new Array(3700064, 1), new Array(3700065, 1), new Array(3700066, 1), new Array(3700067, 1), new Array(3700068, 1), new Array(3700073, 1), new Array(3700074, 1), new Array(3700075, 1), new Array(3700076, 1), new Array(3700077, 1), new Array(3700078, 1), new Array(3700079, 1), new Array(3700080, 1), new Array(3700081, 1), new Array(3700082, 1), new Array(3700083, 1), new Array(3700084, 1), new Array(3700085, 1), new Array(3700086, 1), new Array(3700087, 1), new Array(3700088, 1), new Array(3700090, 1), new Array(3700091, 1), new Array(3700092, 1), new Array(3700093, 1), new Array(3700094, 1), new Array(3700095, 1), new Array(3700096, 1), new Array(3700098, 1), new Array(3700099, 1), new Array(3700100, 1), new Array(3700101, 1), new Array(3700102, 1), new Array(3700103, 1), new Array(3700104, 1), new Array(3700105, 1), new Array(3700106, 1), new Array(3700107, 1), new Array(3700108, 1), new Array(3700109, 1), new Array(3700110, 1), new Array(3700111, 1), new Array(3700112, 1), new Array(3700117, 1), new Array(3700118, 1), new Array(3700119, 1), new Array(3700124, 1), new Array(3700125, 1), new Array(3700126, 1), new Array(3700127, 1), new Array(3700128, 1), new Array(3700129, 1), new Array(3700130, 1), new Array(3700131, 1), new Array(3700132, 1), new Array(3700133, 1), new Array(3700134, 1), new Array(3700135, 1), new Array(3700136, 1), new Array(3700141, 1), new Array(3700142, 1), new Array(3700143, 1), new Array(3700144, 1), new Array(3700145, 1), new Array(3700146, 1), new Array(3700147, 1), new Array(3700148, 1), new Array(3700149, 1), new Array(3700150, 1), new Array(3700151, 1), new Array(3700152, 1), new Array(3700153, 1), new Array(3700154, 1), new Array(3700156, 1), new Array(3700157, 1), new Array(3700158, 1), new Array(3700159, 1), new Array(3700160, 1), new Array(3700161, 1), new Array(3700162, 1), new Array(3700163, 1), new Array(3700164, 1), new Array(3700165, 1), new Array(3700166, 1), new Array(3700168, 1), new Array(3700169, 1), new Array(3700170, 1), new Array(3700171, 1), new Array(3700172, 1), new Array(3700181, 1), new Array(3700182, 1), new Array(3700183, 1), new Array(3700184, 1), new Array(3700185, 1), new Array(3700186, 1), new Array(3700188, 1), new Array(3700189, 1), new Array(3700190, 1), new Array(3700191, 1), new Array(3700192, 1), new Array(3700193, 1), new Array(3700194, 1), new Array(3700198, 1), new Array(3700199, 1), new Array(3700200, 1), new Array(3700201, 1), new Array(3700214, 1), new Array(3700215, 1), new Array(3700216, 1), new Array(3700217, 1), new Array(3700218, 1), new Array(3700219, 1), new Array(3700220, 1), new Array(3700222, 1), new Array(3700228, 1), new Array(3700229, 1), new Array(3700230, 1), new Array(3700231, 1), new Array(3700242, 1), new Array(3700243, 1), new Array(3700244, 1), new Array(3700245, 1), new Array(3700247, 1), new Array(3700248, 1), new Array(3700249, 1), new Array(3700250, 1), new Array(3700251, 1), new Array(3700252, 1), new Array(3700253, 1), new Array(3700254, 1), new Array(3700263, 1), new Array(3700264, 1), new Array(3700268, 1), new Array(3700269, 1), new Array(3700270, 1), new Array(3700271, 1), new Array(3700272, 1), new Array(3700278, 1), new Array(3700278, 1), new Array(3700279, 1), new Array(3700280, 1), new Array(3700281, 1), new Array(3700282, 1), new Array(3700283, 1), new Array(3700284, 1), new Array(3700285, 1), new Array(3700286, 1), new Array(3700287, 1), new Array(3700288, 1), new Array(3700305, 1), new Array(3700306, 1), new Array(3700307, 1), new Array(3700308, 1), new Array(3700321, 1), new Array(3700322, 1), new Array(3700334, 1), new Array(3700335, 1), new Array(3700336, 1), new Array(3700337, 1), new Array(3700338, 1), new Array(3700339, 1), new Array(3700341, 1), new Array(3700342, 1), new Array(3700343, 1), new Array(3700344, 1), new Array(3700345, 1), new Array(3700346, 1), new Array(3700347, 1), new Array(3700350, 1), new Array(3700351, 1), new Array(3700352, 1), new Array(3700353, 1), new Array(3700354, 1), new Array(3700355, 1), new Array(3700356, 1), new Array(3700376, 1), new Array(3700377, 1), new Array(3700378, 1), new Array(3700380, 1), new Array(3700385, 1), new Array(3700388, 1), new Array(3700389, 1), new Array(3700390, 1), new Array(3700402, 1), new Array(3700403, 1), new Array(3700417, 1), new Array(3700418, 1), new Array(3700419, 1), new Array(3700420, 1), new Array(3700421, 1), new Array(3700422, 1), new Array(3700425, 1), new Array(3700429, 1), new Array(3700430, 1), new Array(3700431, 1), new Array(3700432, 1), new Array(3700433, 1), new Array(3700434, 1), new Array(3700435, 1), new Array(3700436, 1));
importPackage(Packages.constants);

function start(){
    action(1,0,0);
}

 

item.sort(function(){
    return Math.random() - Math.random();
});

 


function action(mode,type,selection){
    if(mode == 1){
        status++;
    }else{
        status--;
        cm.dispose();
    }
   if (status == 0) {
      if (cm.getPlayer().getLevel() >= 300) {
         var chat = "                #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 칭호 상점 "+별+"\r\n#fs10##Cgray#                                  원하시는 메뉴를 선택해주세요.#k\r\n\r\n#fs11";
         chat += "용사에게는 그에 걸맞은 ##b칭호#k 가 필요하지..\r\n자네도 이 기회에 #b칭호#k 하나 장만을 해보겠나..?\r\n\r\n1. #b#z" + material + "##k - #r"+coin+" 개#k 가 필요합니다.\r\n2. 칭호는 #d랜덤 지급#k 됩니다.\r\n#L0##b구매를 진행합니다.#k\r\n#L1##r구매하지 않겠습니다.#k";
         cm.sendSimple(chat);
      } else {
         cm.sendOk("#fn나눔고딕 Extrabold##r칭호상점은 현재 리모델링 중입니다.");
         cm.dispose();
}
	} else if (selection == 0) {
        if (cm.haveItem(material, coin)){
            if (cm.canHold(item[0][0])){
                if (item[0][1] != 0) {
                    cm.gainItem(item[0][0], item[0][1]);
                    cm.gainItem(material, -coin);
                    cm.sendOk("#fn나눔고딕 Extrabold##i" + item[0][0] + "# #b(#z" + item[0][0] + "#) #k#r" + item[0][1] + " 개#k 를 획득하셨습니다.");
                    cm.dispose();
                } else {
                    cm.sendOk("#fn나눔고딕 Extrabold##r아쉽게도 꽝이 나왔습니다.#k");
                    cm.gainItem(material, -coin);
                    cm.dispose();
                }
            } else {
                cm.sendOk("#fn나눔고딕 Extrabold##r인벤토리 공간이 부족합니다.\r\n인벤토리 공간을 먼저 확인해주세요.#k");
                cm.dispose();
            }
        } else {
            cm.sendOk("#fn나눔고딕 Extrabold##i" + material + "# #b#z" + material + "##k 이 부족해 보이는군..#k");
            cm.dispose();
    }
     }  else if (selection == 1) {
            cm.sendOk("#fn나눔고딕 Extrabold##d용사에게는 걸 맞는 칭호가 있거늘..#k");
            cm.dispose();

	}
}