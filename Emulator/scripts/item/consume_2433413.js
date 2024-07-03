importPackage(Packages.tools.RandomStream);
importPackage(Packages.scripting);
var status = -1;


bosses = [["0100100",500,30,40],["4250000",2500,100,130],["2220000",5000,200,250],["3300006",15000,500,1000],["8130100",40000,2000,5000]];
// 보스코드,Hp,최소공격력,최대공격력 순이며 위젯에  몹코드img/stand/0 경로가 존재하는 몬스터만 가능, 아니면 런타임 뜸



// 건들지 말것
cplayer = [];
bbcheck = -1;
ccheck = -1;


function start() {
    status = -1;
    action (1, 0, 0);
}



function action(mode, type, selection) {
dcheck = new Date().getTime()
hcheck = Math.floor((dcheck - cm.getPlayer().getKeyValue("maplemon_hungertime"))/1000000)
if ((cm.getPlayer().getKeyValue("maplemon_hunger") - hcheck) >= 0) { 
    cm.getPlayer().setKeyValue("maplemon_hunger",cm.getPlayer().getKeyValue("maplemon_hunger") - hcheck);
} else {
    cm.getPlayer().setKeyValue("maplemon_hunger", 0);
    cm.getPlayer().setKeyValue("maplemon_exp", 0);
}
cm.getPlayer().setKeyValue("maplemon_hungertime",new Date().getTime());
    mobcheck = [0,1000,2500,4500,8000,13000,20000,30000,45000,68000,87000,110000,99999999999999]
    if (mode == 1) {
        if (status == 1 && 선택1 == 0 && selection == 0) {
            if (cm.getPlayer().getKeyValue("maplemon_hunger") == 100) {
                 cm.sendOk("허기가 꽉 차 있어 먹이를 줄 수 없습니다.");
                 cm.dispose();
                 return;
            } else if (cm.itemQuantity(4032862) == 0) {
                 cm.sendOk("#i4032862##z4032862#가 존재하지 않습니다.\r\n\r\n가상대결을 통해 #i4032862##z4032862#를 모아주세요!");
                 cm.dispose();
                 return;
            } else {
                 exprd = Randomizer.rand(50,500);
                 if (cm.getPlayer().getKeyValue("maplemon_hunger") >= 95) {
                     cm.getPlayer().setKeyValue("maplemon_hunger",100);
                 } else {
                     cm.getPlayer().setKeyValue("maplemon_hunger",Number(cm.getPlayer().getKeyValue("maplemon_hunger")) + 5);
                 }
                 if (Number(cm.getPlayer().getKeyValue("maplemon_mobexp")) + exprd >= mobcheck[cm.getPlayer().getKeyValue("maplemon_moblevel")]) {
                    expdd = (Number(cm.getPlayer().getKeyValue("maplemon_mobexp")) + exprd) - mobcheck[cm.getPlayer().getKeyValue("maplemon_moblevel")]
                    cm.getPlayer().setKeyValue("maplemon_moblevel",Number(cm.getPlayer().getKeyValue("maplemon_moblevel")) + 1)
                    cm.getPlayer().setKeyValue("maplemon_mobexp",expdd);
                    accc = cm.getPlayer().getKeyValue("maplemon_acc2") - cm.getPlayer().getKeyValue("maplemon_acc1")
                    addrd1 = Randomizer.rand(1,accc);
                    addrd2 = Randomizer.rand(2,accc*2);
                    hpplus = Randomizer.rand(cm.getPlayer().getKeyValue("maplemon_moblevel") * 100, cm.getPlayer().getKeyValue("maplemon_moblevel") * 500);
                    cm.getPlayer().setKeyValue("maplemon_fullhp",Number(cm.getPlayer().getKeyValue("maplemon_fullhp")) + hpplus); 
                    cm.getPlayer().setKeyValue("maplemon_acc1",Number(cm.getPlayer().getKeyValue("maplemon_acc1")) + addrd1)
                    cm.getPlayer().setKeyValue("maplemon_acc2",Number(cm.getPlayer().getKeyValue("maplemon_acc2")) + addrd2);
                 } else {
                    cm.getPlayer().setKeyValue("maplemon_mobexp",Number(cm.getPlayer().getKeyValue("maplemon_mobexp")) + exprd);
                 }
                 cm.gainItem(4032862, -1);        
            }
        } else if (status == 1 && 선택1 == 0 && selection == 1)  {
                 cm.getPlayer().setKeyValue("maplemon_currenthp", cm.getPlayer().getKeyValue("maplemon_fullhp"));
                 selection = 0;
        } else if (status == 2 && 선택1 == 2) {
            attackRd = Randomizer.rand(Math.floor(cm.getPlayer().getKeyValue("maplemon_acc1") / 3), Math.floor(cm.getPlayer().getKeyValue("maplemon_acc2") / 3));
            if (보스HP - attackRd > 0) {
                보스HP -= attackRd;
            } else {
                cm.sendOk("당신의 승리입니다.");
                cm.gainItem(4032862, 선택2);
                cm.dispose();
                return;
            }
            BattackRd = Randomizer.rand(bosses[선택2][2]/3, bosses[선택2][3]/3);
            if (cm.getPlayer().getKeyValue("maplemon_currenthp") - BattackRd > 0) {
                cm.getPlayer().setKeyValue("maplemon_currenthp",cm.getPlayer().getKeyValue("maplemon_currenthp") - BattackRd);
            } else {
                cm.sendOk("당신의 패배입니다.");
                cm.dispose();
                return;
            }
        } else if (status == 3) {
            if (selection == 0) {
               attackRd = Randomizer.rand(Math.floor(cm.getPlayer().getKeyValue("maplemon_acc1") / 3), Math.floor(cm.getPlayer().getKeyValue("maplemon_acc2") / 3));
               if (Number(target.getKeyValue("maplemon_currenthp")) - attackRd <= 0) {
                   cm.sendOk("당신의 승리입니다.");
                   cm.gainItem(4310229, -10);
                   target.setKeyValue("maplemon_currenthp", 0);
                   target.dropMessage(6, "당신의 턴이 되었습니다. 진행해주세요.");
                   target.setKeyValue("maplemon_mytime", 1);
                   cm.getPlayer().setKeyValue("maplemon_mytime", null);
                   cm.getPlayer().setKeyValue("maplemon_attack_ok",null);
                   cm.dispose();
                   return;
               } else {
                   target.setKeyValue("maplemon_currenthp", target.getKeyValue("maplemon_currenthp") - attackRd);
                   cm.getPlayer().setKeyValue("maplemon_mytime", 0);
               }
               if ((cm.getPlayer().getKeyValue("maplemon_skill") == 1) && (cm.getPlayer().getKeyValue("maplemon_skill_used") == 1)) {
                   cm.getPlayer().setKeyValue("maplemon_skill_used", 2);
                   cm.getPlayer().setKeyValue("maplemon_acc1",cm.getPlayer().getKeyValue("maplemon_acc1") / 2);
                   cm.getPlayer().setKeyValue("maplemon_acc2",cm.getPlayer().getKeyValue("maplemon_acc2") / 2);
               }
                   target.dropMessage(6, "당신의 턴이 되었습니다. 진행해주세요.")
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
                   cm.gainItem(4310229, -10);
                   cm.getPlayer().setKeyValue("maplemon_mytime", null);
                   cm.getPlayer().setKeyValue("maplemon_attack_ok",null);
                   if (cm.getPlayer().getKeyValue("maplemon_skill") != null) {
                       cm.getPlayer().setKeyValue("maplemon_skill_used",0);
                   }
                   cm.dispose();
                   return;

               } else if (Math.floor(cm.getPlayer().getKeyValue("maplemon_currenthp")) <= 0) {
                   cm.sendOk("패배하였습니다.");
                   cm.getPlayer().setKeyValue("maplemon_mytime", null);
                   cm.getPlayer().setKeyValue("maplemon_attack_ok",null);
                   if (cm.getPlayer().getKeyValue("maplemon_skill") != null) {
                       cm.getPlayer().setKeyValue("maplemon_skill_used",0);
                   }
                   cm.dispose();
                   return;
               }
            } else if (selection == 3) {
               if (cm.getPlayer().getKeyValue("maplemon_skill") == 0) {
                   healhp = Number(cm.getPlayer().getKeyValue("maplemon_fullhp") * 0.3)
                   if (Number(cm.getPlayer().getKeyValue("maplemon_currenthp")) + healhp >= cm.getPlayer().getKeyValue("maplemon_fullhp")) {
                       cm.getPlayer().setKeyValue("maplemon_currenthp", cm.getPlayer().getKeyValue("maplemon_fullhp"));
                   } else {
                       cm.getPlayer().setKeyValue("maplemon_currenthp", Number(cm.getPlayer().getKeyValue("maplemon_currenthp")) + healhp);
                   }
                   target.dropMessage(6, "상대가 체력 30% 회복 스킬을 사용하셨습니다.");
               } else if (cm.getPlayer().getKeyValue("maplemon_skill") == 1) {
                   cm.getPlayer().setKeyValue("maplemon_acc1", cm.getPlayer().getKeyValue("maplemon_acc1") * 2);
                   cm.getPlayer().setKeyValue("maplemon_acc2", cm.getPlayer().getKeyValue("maplemon_acc2") * 2);
                   target.dropMessage(6, "상대가 한턴동안 공격력 2배 스킬을 사용하셨습니다.");
               } else if (cm.getPlayer().getKeyValue("maplemon_skill") == 2) {
                   rdkill = Math.floor(Math.random() * 200);
                   if (rdkill == 100) {
                       target.setKeyValue("maplemon_currenthp", 0);
                   } else {
                       cm.getPlayer().setKeyValue("maplemon_currenthp", cm.getPlayer().getKeyValue("maplemon_currenthp") * 0.9);
                   }
                   target.dropMessage(6, "상대가 0.5% 확률로 즉사 스킬을 사용하셨습니다.");
               }
               ccheck++;
               cm.getPlayer().setKeyValue("maplemon_skill_used" ,1);
            }
        } else {
            status++;
        }
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        말 = "안녕하세요 #h # 메이플몬 마스터님! 원하시는 항목을 선택해주세요.\r\n\r\n"
        말+= "#L0# 메이플몬 키우기\r\n"
        말+= "#L1# 유저와 대전하기\r\n"
        말+= "#L2# 가상대결하기\r\n"
        if (cm.getPlayer().getKeyValue("maplemon_skill") == null) {
            말+= "#L3# 스킬 선택 (최초 1회만 가능)"
        }
        cm.sendSimple(말);
    } else if (status == 1) {
        선택1 = selection;
        if (selection == 0) {
            말 = "　　　　　　　　　　#fMob/"+cm.getPlayer().getKeyValue("maplemon_mobcode")+".img/stand/0#\r\n"
            말+= "                 　　   "+ cm.getPlayer().getKeyValue("maplemon_mobname")+" #b(LV."+cm.getPlayer().getKeyValue("maplemon_moblevel")+")#k\r\n"
            Bshop = Math.floor(Number(cm.getPlayer().getKeyValue("maplemon_fullhp") / cm.getPlayer().getKeyValue("maplemon_currenthp"))) * 100;
            말+= "        　　공격력 : #r"+cm.getPlayer().getKeyValue("maplemon_acc1")+" ~ "+cm.getPlayer().getKeyValue("maplemon_acc2")+"#k\r\n"
            말+= "        　　HP : #r"+cm.getPlayer().getKeyValue("maplemon_currenthp")+"#k/"+cm.getPlayer().getKeyValue("maplemon_fullhp")+"    #B"+Bshop+"#\r\n"
            말+= "            허기 : #r"+cm.getPlayer().getKeyValue("maplemon_hunger")+"#k/100    #B"+cm.getPlayer().getKeyValue("maplemon_hunger")+"#\r\n"
            Echeck = mobcheck[cm.getPlayer().getKeyValue("maplemon_moblevel")]
            Eshop = Math.floor(Number(cm.getPlayer().getKeyValue("maplemon_mobexp")/Echeck) * 100)
            말+= "        　  EXP : #b"+cm.getPlayer().getKeyValue("maplemon_mobexp")+"#k/"+Echeck+"    #B"+Eshop+"#   "+Eshop+"%\r\n\r\n"
            말+= "#L0# #i4032862##d 먹이주기 (허기 +5, 허기가 100일때는 사용 불가)\r\n"
            말+= "#L1# #i2000005##d 치료하기 (체력 +100%)\r\n"
            cm.sendSimple(말);
        } else if (selection == 1) {
            cm.sendGetText("대전을 신청할 플레이어 이름을 적어 주세요.");
        } else if (selection == 2) {
            말 = "원하는 가상대결상대를 선택해 주세요.\r\n\r\n"
            for (i=0; i<bosses.length; i++) {
                말+= "#L"+i+"# #b#b#o"+bosses[i][0]+"# #r[체력 : "+bosses[i][1]+"][공격력 : "+bosses[i][2]+" ~ "+bosses[i][3]+"]#k\r\n"
            }
            cm.sendSimple(말);
        } else if (selection == 3) {
            말 = "사용을 원하시는 스킬을 선택해 주세요. 스킬은 1번만 선택 가능하며, 선택 후에는 스킬을 변경하실 수 없으니 신중히 선택해 주세요.\r\n#r (모든 스킬은 대전당 1회만 사용가능합니다.)\r\n\r\n"
            말+= "#L0# #b#i2900000# HP 30% 회복\r\n"
            말+= "#L1# #i2022858# 한 턴동안 공격력 2배\r\n"
            말+= "#L2# #i2010001# 0.5% 확률로 상대 즉사 (실패시 10%의 체력피해)"
            cm.sendSimple(말);
        }
    } else if (status == 2) {
       if (선택1 == 1) {
           target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getText());
           if (target.getName() == cm.getPlayer().getName()) {
              cm.sendOk("자기자신한테는 대전을 신청할 수 없습니다.");
              cm.dispose();
              return;
           } else if (target == null) {
               cm.sendOk("캐릭터를 현재 채널에서 찾을 수 없습니다.");
               cm.dispose();
               return;
           } else if (target.getKeyValue("maplemon_mobname") == null) {
               cm.sendOk("해당 플레이어가 아직 메이플몬을 분양받지 않았습니다.");
               cm.dispose();
               return;
           } else {
               target.setKeyValue("maplemon_attacker",cm.getPlayer().getName());
               NPCScriptManager.getInstance().start(target.getClient(), 9000252);
               cm.sendSimple(""+cm.getText()+"님께 대전신청을 보냈습니다.\r\n\r\n#L0# 수락했는지 확인하기.");
           }
       } else if (선택1 == 2) {
            if (bbcheck == -1) {
                선택2 = selection;
                말 = ""
                보스HP = bosses[선택2][1]
            } else {
                말 = "#r#e보스가 "+BattackRd+"만큼의 데미지를 주었습니다.\r\n\r\n"
            }
            bbcheck++;
            말+= "#fMob/"+cm.getPlayer().getKeyValue("maplemon_mobcode")+".img/stand/0#       #fs15##evs#n     #fMob/"+bosses[선택2][0]+".img/stand/0##fs#\r\n\r\n"
            말+= "이름 : "+cm.getPlayer().getKeyValue("maplemon_mobname")+" #b[Lv."+cm.getPlayer().getKeyValue("maplemon_moblevel")+"]#k　　　　"
            말+= "이름 : #o"+bosses[선택2][0]+"##k\r\n"
            말+= "HP : "+cm.getPlayer().getKeyValue("maplemon_currenthp")+"/"+cm.getPlayer().getKeyValue("maplemon_fullhp")+"　　　　　　　　　"
            말+= "HP : "+보스HP+"/"+bosses[선택2][1]+"\r\n"
            말+= "공격력 : "+cm.getPlayer().getKeyValue("maplemon_acc1")+" ~ "+cm.getPlayer().getKeyValue("maplemon_acc2")+"　　　　　　　"      
            말+= "공격력 : "+bosses[선택2][2]+" ~ "+bosses[선택2][3]+"\r\n\r\n"
            말+= "#L0# 공격하기";
            cm.sendSimple(말);
       } else if (선택1 == 3) {
           cm.getPlayer().setKeyValue("maplemon_skill", selection);
           cm.getPlayer().setKeyValue("maplemon_skill_used",0);
           cm.sendOk("스킬선택이 완료되었습니다.");
           cm.dispose();
       }
    } else if (status == 3) {
        if (target.getKeyValue("maplemon_attack_ok") == 1) {
            cplayer.push(""+cm.getPlayer().getName()+"")
            cplayer.push(""+target.getName()+"");
            ccheck++;
            if (ccheck == 0) {
               target.setKeyValue("maplemon_mytime",0);
               cm.getPlayer().setKeyValue("maplemon_mytime", 1);
               cm.getPlayer().setKeyValue("maplemon_skill_used", 0)
            }

            말 = "#r#e"+cplayer[ccheck%2]+"님께서 공격하실 차례입니다.#k#n\r\n\r\n"
            말+= "#fMob/"+cm.getPlayer().getKeyValue("maplemon_mobcode")+".img/stand/0#          	#fs15##evs#n         	 #fMob/"+target.getKeyValue("maplemon_mobcode")+".img/stand/0##fs#\r\n\r\n"
            말+= "이름 : "+cm.getPlayer().getKeyValue("maplemon_mobname")+" #b[Lv."+cm.getPlayer().getKeyValue("maplemon_moblevel")+"]#k　　　　"
            말+= "이름 : "+target.getKeyValue("maplemon_mobname")+" #b[Lv."+target.getKeyValue("maplemon_moblevel")+"]#k\r\n"
            말+= "HP : "+cm.getPlayer().getKeyValue("maplemon_currenthp")+"/"+cm.getPlayer().getKeyValue("maplemon_fullhp")+"　　　　　　　　　"
            말+= "HP : "+target.getKeyValue("maplemon_currenthp")+"/"+target.getKeyValue("maplemon_fullhp")+"\r\n"
            말+= "공격력 : "+cm.getPlayer().getKeyValue("maplemon_acc1")+" ~ "+cm.getPlayer().getKeyValue("maplemon_acc2")+"　　　　　　　"      
            말+= "공격력 : "+target.getKeyValue("maplemon_acc1")+" ~ "+target.getKeyValue("maplemon_acc2")+"\r\n\r\n"    
            if (ccheck%2 == 0) {
                 말+= "#L0# #d공격하기#l #L1# #d항복하기#l"
                 if (cm.getPlayer().getKeyValue("maplemon_skill_used") == 0) {
                     말+= "#L3# #d스킬 사용하기#l"
                 }
            } else {
                 말+= "#L2# "+target.getName()+"님께서 공격하셨는지 확인하기#l"
            }
            cm.sendSimple(말);
            
        } else {
            cm.sendOk("아직 상대가 대전수락을 하지 않았습니다.");
            status -= 2;
        }
    }
}
