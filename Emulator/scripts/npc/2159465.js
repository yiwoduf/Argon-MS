
var status = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
poten = [10041,10042,10043,10044,10045,10046,20041,20042,20043,20044,20045,20046,20070,20051,20052,30041,
30042,30043,30044,40086,30045,30046,30048,30051,30052,40041,40042,40043,
40044,40086,40045,40046,40070,40051,40052]
 poname = ["�� 3%","���� 3%","��Ʈ 3%","�� 3%","�ִ�ü�� 3%","�ִ븶�� 3%","��6%","���� 6%","��Ʈ 6%","�� 6%","�ִ�ü�� 6%","�ִ븶�� 6%","������ 6%","���ݷ� 6%","���� 6%",
"�� 9%","���� 9%","��Ʈ 9%","�� 9%","�ý��� 9%","�ִ�ü�� 9%","�ִ븶�� 9%","������ 9%","���ݷ� 9%","���� 9%","�� 12%","���� 12%","��Ʈ 12%","�� 12%","�ý��� 9%","�ִ�ü�� 12%","�ִ븶�� 12%","������ 12%","���ݷ� 12%",
"���� 12%"]

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
        �� = "#e����ų� ����ɷ��� ������ ���� �����帮��\r\n��, �ѹ� ���������� #r"+meso+"#k�޼Ҹ� ��ü���ٰ� ���� �����ž��մϴ�.\r\n\r\n"
        ��+= "#L0# #b��ü�� �޼Ҹ� ���ųְ� ����ɷ��� �缳���Ѵ�."
        cm.sendSimple(��);
    } else if (status == 1) {
     if (cm.getPlayer().getMeso() >= meso) {
        �� = "����ų� ����ɷ��� �缳���� �������� ����ּ���.\r\n����ų� ���簡 �ִ� ��� �����۸� ǥ�õ˴ϴ�.\r\n\r\n"
        for (i=0; i<cm.getInventory(1).getSlotLimit(); i++) {
           if(cm.getEquip(i) && !cm.isCash(cm.getEquip(i).getItemId()) && (cm.getEquip(i).getPotential4() > 0)) {
                ��+= "#L"+i+"# #i"+cm.getEquip(i).getItemId()+"# #b#z"+cm.getEquip(i).getItemId()+"#\r\n"
            }
        }
        cm.sendSimple(��);
      } else {
        cm.sendOk("�޼Ұ� �����մϴ�.");
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

        �� = "�������� ����ų� ����ɷ��� �缳���Ǿ����ϴ�.\r\n"
        ��+= "�缳���� ������ : #i"+cm.getEquip(selection).getItemId()+"#\r\n\r\n"
        ��+= "����ų� ����1 : "+poname[R1]+"\r\n"
        ��+= "����ų� ����2 : "+poname[R2]+"\r\n"
        ��+= "����ų� ����3 : "+poname[R3]+"\r\n\r\n"
        if (cm.getPlayer().getMeso() >= meso) {
        ��+= "#L0#�ѹ� �� ����ų� ť�긦 ����ϰڽ��ϴ�.\r\n"
        }
        ��+= "#L1#�׸� ����ϰڽ��ϴ�."
        cm.getPlayer().forceReAddItem(cm.getInventory(1).getItem(selection), Packages.client.items.MapleInventoryType.EQUIP);
        cm.sendSimple(��);
    } else if (status == 3) {
        cm.dispose();
    }
}