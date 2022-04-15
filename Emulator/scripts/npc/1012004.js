/* 이 주석은 지우지 마셨으면 합니다.

출처 : 자유인 (timeisruunin) by Miracle CMNT

*/

importPackage(Packages.client.items);

var item = new Array(new Array(2120000,500), new Array(5240000,20000), new Array(5240001,20000), new Array(5240002,20000), new Array(5240003,20000), new Array(5240004,20000), new Array(5240005,20000), new Array(5240006,20000), new Array(5240007,20000), new Array(5240008,20000), new Array(5240009,20000), new Array(5240010,20000), new Array(5240011,20000), new Array(5240016,20000), new Array(5240018,20000), new Array(5240019,20000), new Array(5240029,20000), new Array(5240030,20000), new Array(5240032,20000), new Array(5240035,20000), new Array(5240039,20000), new Array(5240042,20000), new Array(5240043,20000), new Array(5240047,20000), new Array(5240049,20000), new Array(5240053,20000), new Array(5240054,20000), new Array(5240055,20000), new Array(5240056,20000), new Array(5240059,20000), new Array(5240060,20000), new Array(5240061,20000), new Array(5240065,20000), new Array(5240067,20000), new Array(5240069,20000), new Array(5240070,20000), new Array(5240071,20000), new Array(5240072,20000), new Array(5240073,20000), new Array(5240074,20000), new Array(5240077,20000), new Array(5240078,20000), new Array(5240081,20000), new Array(5240082,20000), new Array(5240083,20000), new Array(5240084,20000), new Array(5240085,20000), new Array(5240086,20000), new Array(5240087,20000), new Array(5240088,20000), new Array(5240089,20000), new Array(5240091,20000), new Array(5240092,20000), new Array(5240094,20000), new Array(5240095,20000), new Array(5240100,20000), new Array(5240111,20000), new Array(5240112,20000), new Array(5240117,20000), new Array(5240118,20000), new Array(5240119,20000), new Array(5240120,20000), new Array(5240122,20000), new Array(5240123,20000), new Array(5240128,20000), new Array(5240130,20000), new Array(5240131,20000), new Array(5240101,20000), new Array(5240102,20000), new Array(5240103,20000));
var status = -1;

var slot;
var meso;
var itemmeso;
var item;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
	slot = cm.getPlayer().getInventory(MapleInventoryType.CASH).getNumFreeSlot();
	meso = cm.getPlayer().getMeso();
	var a ="#b#h ##k님, 구매하실 아이템을 선택해주세요. \r\n\r\n#b"

/* 아이템 구매 시작 */
        a += "#r#e[펫관련아이템]#k\r\n";
    for (var i = 0; i < 70; i++) {
        a += "#L"+i+"##i"+item[i][0]+"# #z"+item[i][0]+"# #n("+ ( item[i][1] / 10000 ) +"만 메소)\r\n#e";
    }
  cm.sendSimple(a);
	} else if (status == 1) {
            if (selection == 4) {
            cm.sendGetNumber("#e선택한 아이템 : #n#i"+item[4][0]+"# #b#z"+item[4][0]+"\r\n\r\n\r\n#k구매를 원하시는 아이템의 개수를 적어주세요.\r\n#Cgray##e인벤토리의 여유공간×100개 이상#n은 구매할 수 없습니다.",1,1,cm.getPlayer().getInventory(MapleInventoryType.USE).getNumFreeSlot()*100);            itemmeso = item[4][1];
            item = item[4][0];

            } else {
            cm.sendGetNumber("#e선택한 아이템 : #n#i"+item[selection][0]+"# #b#z"+item[selection][0]+"\r\n\r\n\r\n#k구매를 원하시는 아이템의 개수를 적어주세요.\r\n#Cgray##e인벤토리의 여유공간×100개 이상#n은 구매할 수 없습니다.",1,1,slot*100);
            itemmeso = item[selection][1];
            item = item[selection][0];
        }           

	} else if (status == 2) {
//	    var prise = total/100000000 < 0.1 ? total/10000 : total/100000000 < 1 ? total/10000000 : total/100000000
//	    var currency = total/100000000 < 0.1 ? "만" : total/100000000 < 1? "천 만" : "억"
	    name = Packages.server.items.ItemInformation.getInstance().getName(item);
            total = selection * itemmeso;
            if (meso < total) {
                cm.sendOk("#h #님이 보유하신 메소의 양이 부족합니다.");
	    } else if (total > 2147483647) {
		cm.sendOk("총 아이템의 구매 금액이 #b21억 4748만 3647 메소#k를 넘었습니다. #h #님이 구매하려는 아이템의 총 가격은 #r"+total/100000000+"억 메소#k 입니다. 다시 한 번 확인 후 구매를 시도해주세요.")
            } else {
	    cm.getPlayer().dropMessage(6, "스티브 잡상 : "+name+" "+selection+"개를 구매하였습니다. 인벤토리를 확인해주세요.");
                cm.gainItem(item, selection);
                cm.gainMeso(-total);
                cm.getPlayer().getClient().getSession().write(Packages.packet.creators.MainPacketCreator.sendHint("#e#b#z"+item+"# #r"+selection+"개#k 구매에 성공하였습니다!",400,20));
            }
            cm.dispose();
	

}
}