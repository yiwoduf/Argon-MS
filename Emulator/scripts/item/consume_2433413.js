importPackage(Packages.tools.RandomStream);
importPackage(Packages.scripting);
var status = -1;


bosses = [["0100100",500,30,40],["4250000",2500,100,130],["2220000",5000,200,250],["3300006",15000,500,1000],["8130100",40000,2000,5000]];
// �����ڵ�,Hp,�ּҰ��ݷ�,�ִ���ݷ� ���̸� ������  ���ڵ�img/stand/0 ��ΰ� �����ϴ� ���͸� ����, �ƴϸ� ��Ÿ�� ��



// �ǵ��� ����
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
        if (status == 1 && ����1 == 0 && selection == 0) {
            if (cm.getPlayer().getKeyValue("maplemon_hunger") == 100) {
                 cm.sendOk("��Ⱑ �� �� �־� ���̸� �� �� �����ϴ�.");
                 cm.dispose();
                 return;
            } else if (cm.itemQuantity(4032862) == 0) {
                 cm.sendOk("#i4032862##z4032862#�� �������� �ʽ��ϴ�.\r\n\r\n�������� ���� #i4032862##z4032862#�� ����ּ���!");
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
        } else if (status == 1 && ����1 == 0 && selection == 1)  {
                 cm.getPlayer().setKeyValue("maplemon_currenthp", cm.getPlayer().getKeyValue("maplemon_fullhp"));
                 selection = 0;
        } else if (status == 2 && ����1 == 2) {
            attackRd = Randomizer.rand(Math.floor(cm.getPlayer().getKeyValue("maplemon_acc1") / 3), Math.floor(cm.getPlayer().getKeyValue("maplemon_acc2") / 3));
            if (����HP - attackRd > 0) {
                ����HP -= attackRd;
            } else {
                cm.sendOk("����� �¸��Դϴ�.");
                cm.gainItem(4032862, ����2);
                cm.dispose();
                return;
            }
            BattackRd = Randomizer.rand(bosses[����2][2]/3, bosses[����2][3]/3);
            if (cm.getPlayer().getKeyValue("maplemon_currenthp") - BattackRd > 0) {
                cm.getPlayer().setKeyValue("maplemon_currenthp",cm.getPlayer().getKeyValue("maplemon_currenthp") - BattackRd);
            } else {
                cm.sendOk("����� �й��Դϴ�.");
                cm.dispose();
                return;
            }
        } else if (status == 3) {
            if (selection == 0) {
               attackRd = Randomizer.rand(Math.floor(cm.getPlayer().getKeyValue("maplemon_acc1") / 3), Math.floor(cm.getPlayer().getKeyValue("maplemon_acc2") / 3));
               if (Number(target.getKeyValue("maplemon_currenthp")) - attackRd <= 0) {
                   cm.sendOk("����� �¸��Դϴ�.");
                   cm.gainItem(4310229, -10);
                   target.setKeyValue("maplemon_currenthp", 0);
                   target.dropMessage(6, "����� ���� �Ǿ����ϴ�. �������ּ���.");
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
                   target.dropMessage(6, "����� ���� �Ǿ����ϴ�. �������ּ���.")
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
                   cm.gainItem(4310229, -10);
                   cm.getPlayer().setKeyValue("maplemon_mytime", null);
                   cm.getPlayer().setKeyValue("maplemon_attack_ok",null);
                   if (cm.getPlayer().getKeyValue("maplemon_skill") != null) {
                       cm.getPlayer().setKeyValue("maplemon_skill_used",0);
                   }
                   cm.dispose();
                   return;

               } else if (Math.floor(cm.getPlayer().getKeyValue("maplemon_currenthp")) <= 0) {
                   cm.sendOk("�й��Ͽ����ϴ�.");
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
                   target.dropMessage(6, "��밡 ü�� 30% ȸ�� ��ų�� ����ϼ̽��ϴ�.");
               } else if (cm.getPlayer().getKeyValue("maplemon_skill") == 1) {
                   cm.getPlayer().setKeyValue("maplemon_acc1", cm.getPlayer().getKeyValue("maplemon_acc1") * 2);
                   cm.getPlayer().setKeyValue("maplemon_acc2", cm.getPlayer().getKeyValue("maplemon_acc2") * 2);
                   target.dropMessage(6, "��밡 ���ϵ��� ���ݷ� 2�� ��ų�� ����ϼ̽��ϴ�.");
               } else if (cm.getPlayer().getKeyValue("maplemon_skill") == 2) {
                   rdkill = Math.floor(Math.random() * 200);
                   if (rdkill == 100) {
                       target.setKeyValue("maplemon_currenthp", 0);
                   } else {
                       cm.getPlayer().setKeyValue("maplemon_currenthp", cm.getPlayer().getKeyValue("maplemon_currenthp") * 0.9);
                   }
                   target.dropMessage(6, "��밡 0.5% Ȯ���� ��� ��ų�� ����ϼ̽��ϴ�.");
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
        �� = "�ȳ��ϼ��� #h # �����ø� �����ʹ�! ���Ͻô� �׸��� �������ּ���.\r\n\r\n"
        ��+= "#L0# �����ø� Ű���\r\n"
        ��+= "#L1# ������ �����ϱ�\r\n"
        ��+= "#L2# �������ϱ�\r\n"
        if (cm.getPlayer().getKeyValue("maplemon_skill") == null) {
            ��+= "#L3# ��ų ���� (���� 1ȸ�� ����)"
        }
        cm.sendSimple(��);
    } else if (status == 1) {
        ����1 = selection;
        if (selection == 0) {
            �� = "��������������������#fMob/"+cm.getPlayer().getKeyValue("maplemon_mobcode")+".img/stand/0#\r\n"
            ��+= "                 ����   "+ cm.getPlayer().getKeyValue("maplemon_mobname")+" #b(LV."+cm.getPlayer().getKeyValue("maplemon_moblevel")+")#k\r\n"
            Bshop = Math.floor(Number(cm.getPlayer().getKeyValue("maplemon_fullhp") / cm.getPlayer().getKeyValue("maplemon_currenthp"))) * 100;
            ��+= "        �������ݷ� : #r"+cm.getPlayer().getKeyValue("maplemon_acc1")+" ~ "+cm.getPlayer().getKeyValue("maplemon_acc2")+"#k\r\n"
            ��+= "        ����HP : #r"+cm.getPlayer().getKeyValue("maplemon_currenthp")+"#k/"+cm.getPlayer().getKeyValue("maplemon_fullhp")+"    #B"+Bshop+"#\r\n"
            ��+= "            ��� : #r"+cm.getPlayer().getKeyValue("maplemon_hunger")+"#k/100    #B"+cm.getPlayer().getKeyValue("maplemon_hunger")+"#\r\n"
            Echeck = mobcheck[cm.getPlayer().getKeyValue("maplemon_moblevel")]
            Eshop = Math.floor(Number(cm.getPlayer().getKeyValue("maplemon_mobexp")/Echeck) * 100)
            ��+= "        ��  EXP : #b"+cm.getPlayer().getKeyValue("maplemon_mobexp")+"#k/"+Echeck+"    #B"+Eshop+"#   "+Eshop+"%\r\n\r\n"
            ��+= "#L0# #i4032862##d �����ֱ� (��� +5, ��Ⱑ 100�϶��� ��� �Ұ�)\r\n"
            ��+= "#L1# #i2000005##d ġ���ϱ� (ü�� +100%)\r\n"
            cm.sendSimple(��);
        } else if (selection == 1) {
            cm.sendGetText("������ ��û�� �÷��̾� �̸��� ���� �ּ���.");
        } else if (selection == 2) {
            �� = "���ϴ� �������븦 ������ �ּ���.\r\n\r\n"
            for (i=0; i<bosses.length; i++) {
                ��+= "#L"+i+"# #b#b#o"+bosses[i][0]+"# #r[ü�� : "+bosses[i][1]+"][���ݷ� : "+bosses[i][2]+" ~ "+bosses[i][3]+"]#k\r\n"
            }
            cm.sendSimple(��);
        } else if (selection == 3) {
            �� = "����� ���Ͻô� ��ų�� ������ �ּ���. ��ų�� 1���� ���� �����ϸ�, ���� �Ŀ��� ��ų�� �����Ͻ� �� ������ ������ ������ �ּ���.\r\n#r (��� ��ų�� ������ 1ȸ�� ��밡���մϴ�.)\r\n\r\n"
            ��+= "#L0# #b#i2900000# HP 30% ȸ��\r\n"
            ��+= "#L1# #i2022858# �� �ϵ��� ���ݷ� 2��\r\n"
            ��+= "#L2# #i2010001# 0.5% Ȯ���� ��� ��� (���н� 10%�� ü������)"
            cm.sendSimple(��);
        }
    } else if (status == 2) {
       if (����1 == 1) {
           target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getText());
           if (target.getName() == cm.getPlayer().getName()) {
              cm.sendOk("�ڱ��ڽ����״� ������ ��û�� �� �����ϴ�.");
              cm.dispose();
              return;
           } else if (target == null) {
               cm.sendOk("ĳ���͸� ���� ä�ο��� ã�� �� �����ϴ�.");
               cm.dispose();
               return;
           } else if (target.getKeyValue("maplemon_mobname") == null) {
               cm.sendOk("�ش� �÷��̾ ���� �����ø��� �о���� �ʾҽ��ϴ�.");
               cm.dispose();
               return;
           } else {
               target.setKeyValue("maplemon_attacker",cm.getPlayer().getName());
               NPCScriptManager.getInstance().start(target.getClient(), 9000252);
               cm.sendSimple(""+cm.getText()+"�Բ� ������û�� ���½��ϴ�.\r\n\r\n#L0# �����ߴ��� Ȯ���ϱ�.");
           }
       } else if (����1 == 2) {
            if (bbcheck == -1) {
                ����2 = selection;
                �� = ""
                ����HP = bosses[����2][1]
            } else {
                �� = "#r#e������ "+BattackRd+"��ŭ�� �������� �־����ϴ�.\r\n\r\n"
            }
            bbcheck++;
            ��+= "#fMob/"+cm.getPlayer().getKeyValue("maplemon_mobcode")+".img/stand/0#       #fs15##evs#n     #fMob/"+bosses[����2][0]+".img/stand/0##fs#\r\n\r\n"
            ��+= "�̸� : "+cm.getPlayer().getKeyValue("maplemon_mobname")+" #b[Lv."+cm.getPlayer().getKeyValue("maplemon_moblevel")+"]#k��������"
            ��+= "�̸� : #o"+bosses[����2][0]+"##k\r\n"
            ��+= "HP : "+cm.getPlayer().getKeyValue("maplemon_currenthp")+"/"+cm.getPlayer().getKeyValue("maplemon_fullhp")+"������������������"
            ��+= "HP : "+����HP+"/"+bosses[����2][1]+"\r\n"
            ��+= "���ݷ� : "+cm.getPlayer().getKeyValue("maplemon_acc1")+" ~ "+cm.getPlayer().getKeyValue("maplemon_acc2")+"��������������"      
            ��+= "���ݷ� : "+bosses[����2][2]+" ~ "+bosses[����2][3]+"\r\n\r\n"
            ��+= "#L0# �����ϱ�";
            cm.sendSimple(��);
       } else if (����1 == 3) {
           cm.getPlayer().setKeyValue("maplemon_skill", selection);
           cm.getPlayer().setKeyValue("maplemon_skill_used",0);
           cm.sendOk("��ų������ �Ϸ�Ǿ����ϴ�.");
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

            �� = "#r#e"+cplayer[ccheck%2]+"�Բ��� �����Ͻ� �����Դϴ�.#k#n\r\n\r\n"
            ��+= "#fMob/"+cm.getPlayer().getKeyValue("maplemon_mobcode")+".img/stand/0#          	#fs15##evs#n         	 #fMob/"+target.getKeyValue("maplemon_mobcode")+".img/stand/0##fs#\r\n\r\n"
            ��+= "�̸� : "+cm.getPlayer().getKeyValue("maplemon_mobname")+" #b[Lv."+cm.getPlayer().getKeyValue("maplemon_moblevel")+"]#k��������"
            ��+= "�̸� : "+target.getKeyValue("maplemon_mobname")+" #b[Lv."+target.getKeyValue("maplemon_moblevel")+"]#k\r\n"
            ��+= "HP : "+cm.getPlayer().getKeyValue("maplemon_currenthp")+"/"+cm.getPlayer().getKeyValue("maplemon_fullhp")+"������������������"
            ��+= "HP : "+target.getKeyValue("maplemon_currenthp")+"/"+target.getKeyValue("maplemon_fullhp")+"\r\n"
            ��+= "���ݷ� : "+cm.getPlayer().getKeyValue("maplemon_acc1")+" ~ "+cm.getPlayer().getKeyValue("maplemon_acc2")+"��������������"      
            ��+= "���ݷ� : "+target.getKeyValue("maplemon_acc1")+" ~ "+target.getKeyValue("maplemon_acc2")+"\r\n\r\n"    
            if (ccheck%2 == 0) {
                 ��+= "#L0# #d�����ϱ�#l #L1# #d�׺��ϱ�#l"
                 if (cm.getPlayer().getKeyValue("maplemon_skill_used") == 0) {
                     ��+= "#L3# #d��ų ����ϱ�#l"
                 }
            } else {
                 ��+= "#L2# "+target.getName()+"�Բ��� �����ϼ̴��� Ȯ���ϱ�#l"
            }
            cm.sendSimple(��);
            
        } else {
            cm.sendOk("���� ��밡 ���������� ���� �ʾҽ��ϴ�.");
            status -= 2;
        }
    }
}
