var status = 0;


itemlist = [4034922, 4034923, 4034924, 4034925, 4034926, 4034927, 4034928, 4034929, 4034930];
howmuch = 5000000;


random1 = itemlist[Math.floor(Math.random() * itemlist.length)];
check1 = "b"
random2 = itemlist[Math.floor(Math.random() * itemlist.length)];
check2 = "b"
random3 = itemlist[Math.floor(Math.random() * itemlist.length)];
check3 = "b"
random4 = itemlist[Math.floor(Math.random() * itemlist.length)];
check4 = "b"
random5 = itemlist[Math.floor(Math.random() * itemlist.length)];
check5 = "b"
newcheck = false;
random6 = itemlist[Math.floor(Math.random() * itemlist.length)];
random7 = itemlist[Math.floor(Math.random() * itemlist.length)];
random8 = itemlist[Math.floor(Math.random() * itemlist.length)];
random9 = itemlist[Math.floor(Math.random() * itemlist.length)];
random10 = itemlist[Math.floor(Math.random() * itemlist.length)];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        if (cm.getPlayer().getKeyValue("1quest") == null) {
            if (selection == 1001 && status == 0) {
                status += 3;
            } else if (selection != 0 && status == 2) {
                if (selection == 1) {
                    check1 = "k"
                    cm.getPlayer().setDateKey("1quest_1", random6)
                } else if (selection == 2) {
                    check2 = "k"
                    cm.getPlayer().setDateKey("1quest_2", random7)
                } else if (selection == 3) {
                    check3 = "k"
                    cm.getPlayer().setDateKey("1quest_3", random8)
                } else if (selection == 4) {
                    check4 = "k"
                    cm.getPlayer().setDateKey("1quest_4", random9)
                } else {
                    check5 = "k"
                    cm.getPlayer().setDateKey("1quest_5", random10)
                }
                if (cm.getPlayer().getDateKey("1quest_1") == null) {
                    cm.getPlayer().setDateKey("1quest_1", random1)
                } else if (cm.getPlayer().getDateKey("1quest_2") == null) {
                    cm.getPlayer().setDateKey("1quest_2", random2)
                } else if (cm.getPlayer().getDateKey("1quest_3") == null) {
                    cm.getPlayer().setDateKey("1quest_3", random3)
                } else if (cm.getPlayer().getDateKey("1quest_4") == null) {
                    cm.getPlayer().setDateKey("1quest_4", random4)
                } else {
                    cm.getPlayer().setDateKey("1quest_5", random5)
                }
            } else if (status == 2) {
                if (cm.getPlayer().getDateKey("1quest_1") == null) {
                    cm.getPlayer().setDateKey("1quest_1", random1)
                } else if (cm.getPlayer().getDateKey("1quest_2") == null) {
                    cm.getPlayer().setDateKey("1quest_2", random2)
                } else if (cm.getPlayer().getDateKey("1quest_3") == null) {
                    cm.getPlayer().setDateKey("1quest_3", random3)
                } else if (cm.getPlayer().getDateKey("1quest_4") == null) {
                    cm.getPlayer().setDateKey("1quest_4", random4)
                } else {
                    cm.getPlayer().setDateKey("1quest_5", random5)
                }
                status++;
            } else {
                status++;
            }
        } else {
            status++;
        }
    }
    if (cm.getPlayer().getDateKey("1quest") == null || cm.getPlayer().getDateKey("1quest") == "null") {
        if (status == 0) {
            �� = "�� ���̾��, #h #��. ���� #h #�Կ��� ��Ź �帱 ���� �� 5�����Դϴ�. ���� �ٷ� �����Ͻðھ��? ������ ���� �ʴ´ٸ� ��ü�ϱ� ��ư�� ���� �ٸ� �ӹ��� ��ü�� ���� �ֽ��ϴ�.\r\n\r\n";
            �� += "#b#e[���� ����Ʈ] #z" + random1 + "# 50�� ����#k#n\r\n"
            �� += "#b#e[���� ����Ʈ] #z" + random2 + "# 50�� ����#k#n\r\n"
            �� += "#b#e[���� ����Ʈ] #z" + random3 + "# 50�� ����#k#n\r\n"
            �� += "#b#e[���� ����Ʈ] #z" + random4 + "# 50�� ����#k#n\r\n"
            �� += "#b#e[���� ����Ʈ] #z" + random5 + "# 50�� ����#k#n\r\n"
            �� += "\r\n#d#L1000# ����Ʈ ��ü�ϱ�#l #L1001# ����Ʈ �����ϱ�"
            cm.sendSimple(��);
        } else if (status == 1) {
            cm.sendYesNo("��Ͽ� �ִ� �ӹ��� ������ ���� ��������? �׷��ٸ� �ٸ� �ӹ��� ã�ƺ� ���� �ֽ��ϴ�.\r\n\r\n#b(�Ϻ� �ӹ� Ȥ�� ��ü �ӹ��� ���ܽ�Ű�� ����� �籸�� �մϴ�.)#k");
        } else if (status == 2) {
            newcheck = true;
            �� = "�����ϰ� ���� �ӹ��� ����ּ���.\r\n\r\n"
            �� += "#L1##" + check1 + "#e[���� ����Ʈ] #z" + random1 + "# 50�� ����#k#n\r\n"
            �� += "#L2##" + check2 + "#e[���� ����Ʈ] #z" + random2 + "# 50�� ����#k#n\r\n"
            �� += "#L3##" + check3 + "#e[���� ����Ʈ] #z" + random3 + "# 50�� ����#k#n\r\n"
            �� += "#L4##" + check4 + "#e[���� ����Ʈ] #z" + random4 + "# 50�� ����#k#n\r\n"
            �� += "#L5##" + check5 + "#e[���� ����Ʈ] #z" + random5 + "# 50�� ����#k#n\r\n\r\n"
            �� += "#L0##r#e�� �̻� �����ϰ� ���� �ӹ��� ����."
            cm.sendSimple(��);
        } else if (status == 3) {
            if (newcheck == false) {
                �� = "���� ��Ź�帱 ���� �̷��� 5�����Դϴ�.\r\n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + random1 + "# 50�� ����#k#n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + random2 + "# 50�� ����#k#n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + random3 + "# 50�� ����#k#n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + random4 + "# 50�� ����#k#n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + random5 + "# 50�� ����#k#n\r\n"
                cm.getPlayer().setDateKey("1quest_1", random1)
                cm.getPlayer().setDateKey("1quest_2", random2)
                cm.getPlayer().setDateKey("1quest_3", random3)
                cm.getPlayer().setDateKey("1quest_4", random4)
                cm.getPlayer().setDateKey("1quest_5", random5)
                cm.sendNext(��);
            } else {
                �� = "���ܵ� �ӹ� ��� ���ο� �ӹ��� ã�ҽ��ϴ�. ���� ��Ź�帱 ���� �̷��� 5�����Դϴ�.\r\n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_1") + "# 50�� ����#k#n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_2") + "# 50�� ����#k#n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_3") + "# 50�� ����#k#n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_4") + "# 50�� ����#k#n\r\n"
                �� += "#b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_5") + "# 50�� ����#k#n\r\n"
                cm.sendNext(��);
            }
            cm.getPlayer().setDateKey("1quest", 0);
            cm.dispose();
        }
    } else {
        if (status == 0) {
           �� = "�̰��� �����ϴ� ���� ���� �ִ� ���� �ð��� �Ű����� ������.\r\n\r\n"
           ��+= "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n"
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_1")) >= 50) {
                �� += "#L1##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_1") + "# 50�� ����#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_2")) >= 50) {
                �� += "#L2##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_2") + "# 50�� ����#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_3")) >= 50) {
                �� += "#L3##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_3") + "# 50�� ����#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_4")) >= 50) {
                �� += "#L4##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_4") + "# 50�� ����#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_5")) >= 50) {
                �� += "#L5##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_5") + "# 50�� ����#k#n\r\n"
           }
           ��+= "\r\n"
           ��+= "#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n"
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_1")) < 50 && cm.getPlayer().getDateKey("1quest_1") != "null") {
 		�� += "#L6##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_1") + "# 50�� ����#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_2")) < 50 && cm.getPlayer().getDateKey("1quest_2") != "null") {
                �� += "#L7##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_2") + "# 50�� ����#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_3")) < 50 && cm.getPlayer().getDateKey("1quest_3") != "null") {
                �� += "#L8##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_3") + "# 50�� ����#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_4")) < 50 && cm.getPlayer().getDateKey("1quest_4") != "null") {
                �� += "#L9##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_4") + "# 50�� ����#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_5")) < 50 && cm.getPlayer().getDateKey("1quest_5") != "null") {
                �� += "#L10##b#e[���� ����Ʈ] #z" + cm.getPlayer().getDateKey("1quest_5") + "# 50�� ����#k#n\r\n"
           }
           cm.sendSimple(��);
        } else if (status == 1) {
           if (selection == 1) {
               cm.getPlayer().setDateKey("1quest_1", "null");
               cm.sendOk("������ �Ϸ�Ǿ����ϴ�.");
               cm.getPlayer().setKeyValue("rc_damage",Number(cm.getPlayer().getKeyValue("rc_damage")) + howmuch)
               cm.gainItem(cm.getPlayer().getDateKey("1quest_1"),-50);

           }
           if (selection == 2) {
               cm.sendOk("������ �Ϸ�Ǿ����ϴ�.");
               cm.getPlayer().setKeyValue("rc_damage",Number(cm.getPlayer().getKeyValue("rc_damage")) + howmuch);
               cm.gainItem(cm.getPlayer().getDateKey("1quest_2"),-50);
               cm.getPlayer().setDateKey("1quest_2","null");
           }
           if (selection == 3) {
               cm.sendOk("������ �Ϸ�Ǿ����ϴ�.");
               cm.getPlayer().setKeyValue("rc_damage",Number(cm.getPlayer().getKeyValue("rc_damage")) + howmuch);
               cm.gainItem(cm.getPlayer().getDateKey("1quest_3"),-50);
               cm.getPlayer().setDateKey("1quest_3","null");
           }
           if (selection == 4) {
               cm.sendOk("������ �Ϸ�Ǿ����ϴ�.");
               cm.getPlayer().setKeyValue("rc_damage",Number(cm.getPlayer().getKeyValue("rc_damage")) + howmuch);
               cm.gainItem(cm.getPlayer().getDateKey("1quest_4"),-50);
               cm.getPlayer().setDateKey("1quest_4","null");
           }
           if (selection == 5) {
               cm.sendOk("������ �Ϸ�Ǿ����ϴ�.");
               cm.getPlayer().setKeyValue("rc_damage",Number(cm.getPlayer().getKeyValue("rc_damage")) + howmuch);
               cm.gainItem(cm.getPlayer().getDateKey("1quest_5"),-50);
               cm.getPlayer().setDateKey("1quest_5","null");
           }
           if ((cm.getPlayer().getDateKey("1quest_1") == "null") && (cm.getPlayer().getDateKey("1quest_2") == "null") && (cm.getPlayer().getDateKey("1quest_3") == "null") && (cm.getPlayer().getDateKey("1quest_4") == "null") && (cm.getPlayer().getDateKey("1quest_5") == "null")) {
               cm.getPlayer().setDateKey("1quest","null");
           }
           cm.dispose();
        }
    }
}