importPackage(Packages.tools.RandomStream);
importPackage(Packages.scripting);
var status = -1;

cplayer = [];
ccheck = -1;


function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getKeyValue("maplemon_attacker"));
    if (mode == 1) {
        if (status == 1) {
            target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getKeyValue("maplemon_attacker"));
            if (selection == 0) {

               attackRd = Randomizer.rand(Math.floor(cm.getPlayer().getKeyValue("maplemon_acc1") / 10), Math.floor(cm.getPlayer().getKeyValue("maplemon_acc2") / 10));
               if (Number(target.getKeyValue("maplemon_currenthp")) - attackRd <= 0) {
                   cm.sendOk("����� �¸��Դϴ�.");
                   cm.gainItem(4310229, 5);
                   target.setKeyValue("maplemon_currenthp", 0);
                   cm.getPlayer().setKeyValue("maplemon_mytime", null);
                   cm.getPlayer().setKeyValue("maplemon_attack_ok",null);
                   target.dropMessage(6, "����� ���� �Ǿ����ϴ�. �������ּ���.");
                   target.setKeyValue("maplemon_mytime", 1);
                   cm.dispose();
                   return;
               } else {
                   target.setKeyValue("maplemon_currenthp", target.getKeyValue("maplemon_currenthp") - attackRd);
                   cm.getPlayer().setKeyValue("maplemon_mytime", 0);
               }
                   target.dropMessage(6, "����� ���� �Ǿ����ϴ�. �������ּ���.");
                   target.setKeyValue("maplemon_mytime", 1);
            } else if (selection == 1) {
               cm.getPlayer().setKeyValue("maplemon_currenthp", 0);
               target.dropMessage(6, "����� ���� �Ǿ����ϴ�. �������ּ���.")
               target.setKeyValue("maplemon_mytime", 1);
               cm.sendOk("�׺��ϼ̽��ϴ�.");
               cm.dispose();
               return;
            } else if (selection == 2) {
               if (cm.getPlayer().getKeyValue("maplemon_mytime") != 1) {
                   cm.getPlayer().dropMessage(6, "���� ����� ���� ���� �ʾҽ��ϴ�.");
                   ccheck--;
               } else if (target.getKeyValue("maplemon_currenthp") <= 0) {
                   cm.sendOk("����� �¸��Դϴ�.");
                   cm.gainItem(4310229, 5);
                   cm.getPlayer().setKeyValue("maplemon_mytime", null);
                   cm.getPlayer().setKeyValue("maplemon_attack_ok",null);
                   cm.dispose();
                   return;

               } else if (Math.floor(cm.getPlayer().getKeyValue("maplemon_currenthp")) <= 0) {
                   cm.sendOk("�й��Ͽ����ϴ�.");
                   cm.getPlayer().setKeyValue("maplemon_mytime", null);
                   cm.getPlayer().setKeyValue("maplemon_attack_ok",null);
                   cm.dispose();
                   return;
               }
            }
        } else {
            status++;
        }
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        �� = cm.getPlayer().getKeyValue("maplemon_attacker")+"�Բ��� ������û�� �Ͽ����ϴ�.\r\n\r\n#L0# #d�����ϱ�\r\n"
        cm.sendSimple(��)
    } else if (status == 1) {
            cm.getPlayer().setKeyValue("maplemon_attack_ok", 1)
            cplayer.push(""+target.getName()+"");
            cplayer.push(""+cm.getPlayer().getName()+"")
            ccheck++;
            target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getKeyValue("maplemon_attacker"));
            �� = "#r#e"+cplayer[ccheck%2]+"�Բ��� �����Ͻ� �����Դϴ�.#k#n\r\n\r\n"
            ��+= "#fMob/"+cm.getPlayer().getKeyValue("maplemon_mobcode")+".img/stand/0#          	#fs15##evs#n         	 #fMob/"+target.getKeyValue("maplemon_mobcode")+".img/stand/0##fs#\r\n\r\n"
            ��+= "�̸� : "+cm.getPlayer().getKeyValue("maplemon_mobname")+" #b[Lv."+cm.getPlayer().getKeyValue("maplemon_moblevel")+"]#k��������"
            ��+= "�̸� : "+target.getKeyValue("maplemon_mobname")+" #b[Lv."+target.getKeyValue("maplemon_moblevel")+"]#k\r\n"
            ��+= "HP : "+cm.getPlayer().getKeyValue("maplemon_currenthp")+"/"+cm.getPlayer().getKeyValue("maplemon_fullhp")+"������������������"
            ��+= "HP : "+target.getKeyValue("maplemon_currenthp")+"/"+target.getKeyValue("maplemon_fullhp")+"\r\n"
            ��+= "���ݷ� : "+cm.getPlayer().getKeyValue("maplemon_acc1")+" ~ "+cm.getPlayer().getKeyValue("maplemon_acc2")+"��������������"      
            ��+= "���ݷ� : "+target.getKeyValue("maplemon_acc1")+" ~ "+target.getKeyValue("maplemon_acc2")+"\r\n\r\n"    
            if (ccheck%2 == 1) {
                 ��+= "#L0# #d�����ϱ�#l #L1# #d�׺��ϱ�#l"

            } else {
                 target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getKeyValue("maplemon_attacker"));
                 ��+= "#L2# "+target.getName()+"�Բ��� �����ϼ̴��� Ȯ���ϱ�#l"
            }
            cm.sendSimple(��);
            
    }
}
