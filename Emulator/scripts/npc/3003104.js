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
            말 = "잘 오셨어요, #h #님. 오늘 #h #님에게 부탁 드릴 일은 이 5가지입니다. 지금 바로 수행하시겠어요? 마음에 들지 않는다면 교체하기 버튼을 눌러 다른 임무로 교체할 수도 있습니다.\r\n\r\n";
            말 += "#b#e[일일 퀘스트] #z" + random1 + "# 50개 수집#k#n\r\n"
            말 += "#b#e[일일 퀘스트] #z" + random2 + "# 50개 수집#k#n\r\n"
            말 += "#b#e[일일 퀘스트] #z" + random3 + "# 50개 수집#k#n\r\n"
            말 += "#b#e[일일 퀘스트] #z" + random4 + "# 50개 수집#k#n\r\n"
            말 += "#b#e[일일 퀘스트] #z" + random5 + "# 50개 수집#k#n\r\n"
            말 += "\r\n#d#L1000# 퀘스트 교체하기#l #L1001# 퀘스트 수행하기"
            cm.sendSimple(말);
        } else if (status == 1) {
            cm.sendYesNo("목록에 있는 임무가 마음에 들지 않으세요? 그렇다면 다른 임무를 찾아볼 수도 있습니다.\r\n\r\n#b(일부 임무 혹은 전체 임무를 제외시키고 목록을 재구성 합니다.)#k");
        } else if (status == 2) {
            newcheck = true;
            말 = "제외하고 싶은 임무를 골라주세요.\r\n\r\n"
            말 += "#L1##" + check1 + "#e[일일 퀘스트] #z" + random1 + "# 50개 수집#k#n\r\n"
            말 += "#L2##" + check2 + "#e[일일 퀘스트] #z" + random2 + "# 50개 수집#k#n\r\n"
            말 += "#L3##" + check3 + "#e[일일 퀘스트] #z" + random3 + "# 50개 수집#k#n\r\n"
            말 += "#L4##" + check4 + "#e[일일 퀘스트] #z" + random4 + "# 50개 수집#k#n\r\n"
            말 += "#L5##" + check5 + "#e[일일 퀘스트] #z" + random5 + "# 50개 수집#k#n\r\n\r\n"
            말 += "#L0##r#e더 이상 제외하고 싶은 임무는 없다."
            cm.sendSimple(말);
        } else if (status == 3) {
            if (newcheck == false) {
                말 = "오늘 부탁드릴 일은 이렇게 5가지입니다.\r\n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + random1 + "# 50개 수집#k#n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + random2 + "# 50개 수집#k#n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + random3 + "# 50개 수집#k#n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + random4 + "# 50개 수집#k#n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + random5 + "# 50개 수집#k#n\r\n"
                cm.getPlayer().setDateKey("1quest_1", random1)
                cm.getPlayer().setDateKey("1quest_2", random2)
                cm.getPlayer().setDateKey("1quest_3", random3)
                cm.getPlayer().setDateKey("1quest_4", random4)
                cm.getPlayer().setDateKey("1quest_5", random5)
                cm.sendNext(말);
            } else {
                말 = "제외된 임무 대신 새로운 임무를 찾았습니다. 오늘 부탁드릴 일은 이렇게 5가지입니다.\r\n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_1") + "# 50개 수집#k#n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_2") + "# 50개 수집#k#n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_3") + "# 50개 수집#k#n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_4") + "# 50개 수집#k#n\r\n"
                말 += "#b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_5") + "# 50개 수집#k#n\r\n"
                cm.sendNext(말);
            }
            cm.getPlayer().setDateKey("1quest", 0);
            cm.dispose();
        }
    } else {
        if (status == 0) {
           말 = "이곳을 조사하는 것이 여기 있는 저희 시간의 신관들의 일이죠.\r\n\r\n"
           말+= "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n"
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_1")) >= 50) {
                말 += "#L1##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_1") + "# 50개 수집#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_2")) >= 50) {
                말 += "#L2##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_2") + "# 50개 수집#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_3")) >= 50) {
                말 += "#L3##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_3") + "# 50개 수집#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_4")) >= 50) {
                말 += "#L4##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_4") + "# 50개 수집#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_5")) >= 50) {
                말 += "#L5##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_5") + "# 50개 수집#k#n\r\n"
           }
           말+= "\r\n"
           말+= "#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n\r\n"
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_1")) < 50 && cm.getPlayer().getDateKey("1quest_1") != "null") {
 		말 += "#L6##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_1") + "# 50개 수집#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_2")) < 50 && cm.getPlayer().getDateKey("1quest_2") != "null") {
                말 += "#L7##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_2") + "# 50개 수집#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_3")) < 50 && cm.getPlayer().getDateKey("1quest_3") != "null") {
                말 += "#L8##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_3") + "# 50개 수집#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_4")) < 50 && cm.getPlayer().getDateKey("1quest_4") != "null") {
                말 += "#L9##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_4") + "# 50개 수집#k#n\r\n"
           }
           if (cm.itemQuantity(cm.getPlayer().getDateKey("1quest_5")) < 50 && cm.getPlayer().getDateKey("1quest_5") != "null") {
                말 += "#L10##b#e[일일 퀘스트] #z" + cm.getPlayer().getDateKey("1quest_5") + "# 50개 수집#k#n\r\n"
           }
           cm.sendSimple(말);
        } else if (status == 1) {
           if (selection == 1) {
               cm.getPlayer().setDateKey("1quest_1", "null");
               cm.sendOk("지급이 완료되었습니다.");
               cm.getPlayer().setKeyValue("rc_damage",Number(cm.getPlayer().getKeyValue("rc_damage")) + howmuch)
               cm.gainItem(cm.getPlayer().getDateKey("1quest_1"),-50);

           }
           if (selection == 2) {
               cm.sendOk("지급이 완료되었습니다.");
               cm.getPlayer().setKeyValue("rc_damage",Number(cm.getPlayer().getKeyValue("rc_damage")) + howmuch);
               cm.gainItem(cm.getPlayer().getDateKey("1quest_2"),-50);
               cm.getPlayer().setDateKey("1quest_2","null");
           }
           if (selection == 3) {
               cm.sendOk("지급이 완료되었습니다.");
               cm.getPlayer().setKeyValue("rc_damage",Number(cm.getPlayer().getKeyValue("rc_damage")) + howmuch);
               cm.gainItem(cm.getPlayer().getDateKey("1quest_3"),-50);
               cm.getPlayer().setDateKey("1quest_3","null");
           }
           if (selection == 4) {
               cm.sendOk("지급이 완료되었습니다.");
               cm.getPlayer().setKeyValue("rc_damage",Number(cm.getPlayer().getKeyValue("rc_damage")) + howmuch);
               cm.gainItem(cm.getPlayer().getDateKey("1quest_4"),-50);
               cm.getPlayer().setDateKey("1quest_4","null");
           }
           if (selection == 5) {
               cm.sendOk("지급이 완료되었습니다.");
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