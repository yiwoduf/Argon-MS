/*
    @Author 현실도피(dla3753@naver.com)
*/

importPackage(java.lang);
importPackage(Packages.client.items);

var apink = -1;
/* 필요한 아이템 / 개수 */
var jungeunji = [4001254,1];
var kk = -1;

function action(mode,type,selection) { (mode != 1) ? (cm.dispose() + apink--) : apink++;
    if (apink == 0) {
        var chat = "#e25성강화#k를 담당하는 리프 운영자입니다.   강화에 끝은 없습니다. 당신도 시작해보세요\r\n강화재료는 #i4001254#입니다.#b";
        chat += "\r\n#L0#장비 강화";
        cm.sendSimple(chat);
    } else if (apink == 1) {
        var list = cm.getPlayer().getInventory(MapleInventoryType.EQUIP);
        var string = new StringBuilder();
        var check = false;
        for (var i = 0; i < list.getSlotLimit(); i++) {
             if (list.getItem(i) != null){
                 check = true;
                 string.append("#L" + i + "# #i").append(list.getItem(i).getItemId() + "# #b#t").append(list.getItem(i).getItemId() + "#").append("\r\n");
             }
        }   
        check == true ? cm.sendSimple("강화하실 장비 아이템을 선택해주세요.\r\n" + string.toString()) : (cm.sendOk("대화가 없습니다.") , cm.dispose());
    } else if (apink == 2) {
        kk = selection;
        var equip = cm.getPlayer().getInventory(MapleInventoryType.EQUIP);
        var eunji = equip.getItem(selection);
        var string = new StringBuilder();
        string.append("#e선택한 아이템 : #n#i" + eunji.getItemId() + "##b#t" + eunji.getItemId() + "# #k\r\n").append("#eSTR : #n").append(eunji.getStr() + "\r\n").append("#eDEX : #n").append(eunji.getDex() + "\r\n").append("#eINT : #n").append(eunji.getInt() + "\r\n").append("#eLuk : #n").append(eunji.getLuk() + "\r\n");
        cm.sendYesNo(string.toString() + "\r\n정말로 아이템을 강화 하시겠습니까? 아이템을 강화할시 강화한 아이템에 #b올스텟#k이 500과 공마 600이 부여되며 아이템을 강화 하려면 #r25성코인#k 1개가 필요 합니다.");
    } else if (apink == 3) {
        if (cm.haveItem(jungeunji[0],jungeunji[1]) == true) {
            var selected = cm.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(kk);
            selected.setStr(selected.getStr() + 500);
            selected.setDex(selected.getDex() + 500);
            selected.setInt(selected.getInt() + 500);
            selected.setLuk(selected.getLuk() + 500);
            selected.setWatk(selected.getWatk() + 600);
            selected.setMatk(selected.getMatk() + 600);
            cm.gainItem(jungeunji[0],-jungeunji[1]);
            cm.sendOk("선택한 아이템을 강화 하였습니다. #r(올스텟 + 500)(공마 + 600)#k");
        } else {
            cm.sendOk("아이템을 강화하려면 #r반짝이는 메이플 코인#k이 필요합니다.");
        }
        cm.dispose();
    }
}