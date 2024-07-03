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
                   cm.sendOk("당신의 승리입니다.");
                   cm.gainItem(4310229, 5);
                   target.setKeyValue("maplemon_currenthp", 0);
                   cm.getPlayer().setKeyValue("maplemon_mytime", null);
                   cm.getPlayer().setKeyValue("maplemon_attack_ok",null);
                   target.dropMessage(6, "당신의 턴이 되었습니다. 진행해주세요.");
                   target.setKeyValue("maplemon_mytime", 1);
                   cm.dispose();
                   return;
               } else {
                   target.setKeyValue("maplemon_currenthp", target.getKeyValue("maplemon_currenthp") - attackRd);
                   cm.getPlayer().setKeyValue("maplemon_mytime", 0);
               }
                   target.dropMessage(6, "당신의 턴이 되었습니다. 진행해주세요.");
                   target.setKeyValue("maplemon_mytime", 1);
            } else if (selection == 1) {
               cm.getPlayer().setKeyValue("maplemon_currenthp", 0);
               target.dropMessage(6, "당신의 턴이 되었습니다. 진행해주세요.")
               target.setKeyValue("maplemon_mytime", 1);
               cm.sendOk("항복하셨습니다.");
               cm.dispose();
               return;
            } else if (selection == 2) {
               if (cm.getPlayer().getKeyValue("maplemon_mytime") != 1) {
                   cm.getPlayer().dropMessage(6, "아직 당신의 턴이 되지 않았습니다.");
                   ccheck--;
               } else if (target.getKeyValue("maplemon_currenthp") <= 0) {
                   cm.sendOk("당신의 승리입니다.");
                   cm.gainItem(4310229, 5);
                   cm.getPlayer().setKeyValue("maplemon_mytime", null);
                   cm.getPlayer().setKeyValue("maplemon_attack_ok",null);
                   cm.dispose();
                   return;

               } else if (Math.floor(cm.getPlayer().getKeyValue("maplemon_currenthp")) <= 0) {
                   cm.sendOk("패배하였습니다.");
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
        말 = cm.getPlayer().getKeyValue("maplemon_attacker")+"님께서 대전신청을 하였습니다.\r\n\r\n#L0# #d수락하기\r\n"
        cm.sendSimple(말)
    } else if (status == 1) {
            cm.getPlayer().setKeyValue("maplemon_attack_ok", 1)
            cplayer.push(""+target.getName()+"");
            cplayer.push(""+cm.getPlayer().getName()+"")
            ccheck++;
            target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getKeyValue("maplemon_attacker"));
            말 = "#r#e"+cplayer[ccheck%2]+"님께서 공격하실 차례입니다.#k#n\r\n\r\n"
            말+= "#fMob/"+cm.getPlayer().getKeyValue("maplemon_mobcode")+".img/stand/0#          	#fs15##evs#n         	 #fMob/"+target.getKeyValue("maplemon_mobcode")+".img/stand/0##fs#\r\n\r\n"
            말+= "이름 : "+cm.getPlayer().getKeyValue("maplemon_mobname")+" #b[Lv."+cm.getPlayer().getKeyValue("maplemon_moblevel")+"]#k　　　　"
            말+= "이름 : "+target.getKeyValue("maplemon_mobname")+" #b[Lv."+target.getKeyValue("maplemon_moblevel")+"]#k\r\n"
            말+= "HP : "+cm.getPlayer().getKeyValue("maplemon_currenthp")+"/"+cm.getPlayer().getKeyValue("maplemon_fullhp")+"　　　　　　　　　"
            말+= "HP : "+target.getKeyValue("maplemon_currenthp")+"/"+target.getKeyValue("maplemon_fullhp")+"\r\n"
            말+= "공격력 : "+cm.getPlayer().getKeyValue("maplemon_acc1")+" ~ "+cm.getPlayer().getKeyValue("maplemon_acc2")+"　　　　　　　"      
            말+= "공격력 : "+target.getKeyValue("maplemon_acc1")+" ~ "+target.getKeyValue("maplemon_acc2")+"\r\n\r\n"    
            if (ccheck%2 == 1) {
                 말+= "#L0# #d공격하기#l #L1# #d항복하기#l"

            } else {
                 target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getKeyValue("maplemon_attacker"));
                 말+= "#L2# "+target.getName()+"님께서 공격하셨는지 확인하기#l"
            }
            cm.sendSimple(말);
            
    }
}
