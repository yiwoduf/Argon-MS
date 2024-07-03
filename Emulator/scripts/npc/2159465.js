
var status = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
poten = [10041,10042,10043,10044,10045,10046,20041,20042,20043,20044,20045,20046,20070,20051,20052,30041,
30042,30043,30044,40086,30045,30046,30048,30051,30052,40041,40042,40043,
40044,40086,40045,40046,40070,40051,40052]
 poname = ["힘 3%","덱스 3%","인트 3%","럭 3%","최대체력 3%","최대마나 3%","힘6%","덱스 6%","인트 6%","럭 6%","최대체력 6%","최대마나 6%","데미지 6%","공격력 6%","마력 6%",
"힘 9%","덱스 9%","인트 9%","럭 9%","올스텟 9%","최대체력 9%","최대마나 9%","데미지 9%","공격력 9%","마력 9%","힘 12%","덱스 12%","인트 12%","럭 12%","올스텟 9%","최대체력 12%","최대마나 12%","데미지 12%","공격력 12%",
"마력 12%"]

meso = 50000000;
    if (mode == 1 && status == 2 && selection == 0) {
       status-= 2;
    }
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status--;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
        말 = "#e에디셔널 잠재능력을 빛보다 빨리 돌려드리죠\r\n단, 한번 돌릴때마다 #r"+meso+"#k메소를 본체에다가 쑤셔 넣으셔야합니다.\r\n\r\n"
        말+= "#L0# #b본체에 메소를 쑤셔넣고 잠재능력을 재설정한다."
        cm.sendSimple(말);
    } else if (status == 1) {
     if (cm.getPlayer().getMeso() >= meso) {
        말 = "에디셔널 잠재능력을 재설정할 아이템을 골라주세요.\r\n에디셔널 잠재가 있는 장비 아이템만 표시됩니다.\r\n\r\n"
        for (i=0; i<cm.getInventory(1).getSlotLimit(); i++) {
           if(cm.getEquip(i) && !cm.isCash(cm.getEquip(i).getItemId()) && (cm.getEquip(i).getPotential4() > 0)) {
                말+= "#L"+i+"# #i"+cm.getEquip(i).getItemId()+"# #b#z"+cm.getEquip(i).getItemId()+"#\r\n"
            }
        }
        cm.sendSimple(말);
      } else {
        cm.sendOk("메소가 부족합니다.");
        cm.dispose();
      }
    } else if (status == 2) {
        cm.gainMeso(-meso);
        R1 = Math.floor(Math.random() * poten.length);
        R2 = Math.floor(Math.random() * poten.length);
        R3 = Math.floor(Math.random() * poten.length);
       cm.getEquip(selection).setPotential4(poten[R1]);
       cm.getEquip(selection).setPotential5(poten[R2]);
        cm.getEquip(selection).setPotential6(poten[R3]);

        말 = "아이템의 에디셔널 잠재능력이 재설정되었습니다.\r\n"
        말+= "재설정된 아이템 : #i"+cm.getEquip(selection).getItemId()+"#\r\n\r\n"
        말+= "에디셔널 잠재1 : "+poname[R1]+"\r\n"
        말+= "에디셔널 잠재2 : "+poname[R2]+"\r\n"
        말+= "에디셔널 잠재3 : "+poname[R3]+"\r\n\r\n"
        if (cm.getPlayer().getMeso() >= meso) {
        말+= "#L0#한번 더 에디셔널 큐브를 사용하겠습니다.\r\n"
        }
        말+= "#L1#그만 사용하겠습니다."
        cm.getPlayer().forceReAddItem(cm.getInventory(1).getItem(selection), Packages.client.items.MapleInventoryType.EQUIP);
        cm.sendSimple(말);
    } else if (status == 3) {
        cm.dispose();
    }
}