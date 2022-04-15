importPackage(java.io);
importPackage(Packages.constants);
var status = -1;
    chrdailylist = [];
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    normalitem = [[2000000,5],[4001713,6],[4001714,5],[4001715,1],[5680157,1],[2000001,2],[2000002,3],[2000003,4]]; // 1~10일차
    gooditem = [[2049309,5],[2049311,4],[2049351,3],[2049360,2],[2049304,1],[2431938,3],[2434007,2]]; //11~20일차
    superitem = [[5680340,4],[5680399,5],[2434340,3],[2049704,1],[2048717,2],[4031856,3],[2048717,1]]; //21~28일차


    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        month = Number(new Date().getMonth()) + 1
        fFile = new File("dailygift/"+cm.getPlayer().getId()+"_"+month+".dgift");
        if (!fFile.exists()) {
            cm.sendOk("이번달에 아직 한번도 데일리기프트를 받지 않으셨군요?\r\n새로운 데일리기프트 리스트를 꺼내 드릴게요!\r\n\r\n#b(확인을 누른 후 다시 한 번 엔피시를 클릭해 주시기 바랍니다.)");
            fFile.createNewFile();
            cm.getPlayer().setKeyValue("dailyhow",1);
            out = new FileOutputStream("dailygift/"+cm.getPlayer().getId()+"_"+month+".dgift",false);
            msg = "['"
            msg+= ""+cm.getPlayer().getName()+"'"
            for (i=1; i<=10; i++) {
                msg+= ", ["+normalitem[Math.floor(Math.random() * normalitem.length)][0]+","+normalitem[Math.floor(Math.random() * normalitem.length)][1]+"]"
            }
            for (i=11; i<=20; i++) {
                msg+= ", ["+gooditem[Math.floor(Math.random() * gooditem.length)][0]+","+gooditem[Math.floor(Math.random() * gooditem.length)][1]+"]"
            }
            for (i=21; i<=28; i++) {
                msg+= ", ["+superitem[Math.floor(Math.random() * superitem.length)][0]+","+superitem[Math.floor(Math.random() * superitem.length)][1]+"]"
            }
            msg+= "]"
            out.write(msg.getBytes());
            out.close();
            cm.dispose();
        } else {
            if (cm.getPlayer().getDateKey("dailygift") == null) {
                hi = "오늘도 오셨군요. 매일매일 오시는 분들 정말 감사합니다니깐요! 그럼 오늘의 선물을 알려드릴게요!\r\n\r\n"
                infile = new BufferedReader(new FileReader(fFile));
                put = "";
                msg = "";
                while ((put = infile.readLine()) != null) {
                    if (!msg.contains("\r\n" + put)) {
                        msg += "\r\n" + put;
                    }
                }
                infile.close();
                msg = msg.replace(/'/g, '\"');
                chrdailylist.push(msg);
                chrdailylist = JSON.parse(chrdailylist);
                hi+= "#e┌──────오늘의 데일리 기프트──────┐\r\n"
                hi+= "　　　　　"
                hi+= "#i"+chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][0]+"# #b#z"+chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][0]+"# #r[x"+chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][1]+"]#k\r\n"
                hi+= "└──────────────────────┘#n\r\n"
                hi+= "#L0##d 이 달 전체 데일리기프트 리스트 보기#l\r\n"
                hi+= "#L1# 오늘의 데일리기프트 받기"
                cm.sendSimple(hi);
            } else if (cm.getPlayer().getKeyValue("dailyhow") >= 29) {
                cm.sendOk("이미 이 달의 데일리기프트는 모두 받으셨답니다. 다음달을 기대해 주세요!");
                cm.dispose();
            } else {
                cm.sendOk("오늘 선물은 이미 받아간 것 같아요!\r\n내일 다시 찾아와 주세요!");
                cm.dispose();
            }
        }
    } else if (status == 1) {
        if (selection == 0) {
            hi = ""+month+"월달의 데일리기프트 리스트입니다.\r\n\r\n"
            for (i=1; i<chrdailylist.length; i++) {
                hi+= "#b"+i+"일#k #i"+chrdailylist[i][0]+"#    "
                if (i%4 == 0) {
                    hi+= "\r\n"
                    hi+= "#e────────────────────────#n\r\n"
                }
            }
            cm.sendOk(hi);
            cm.dispose();
        } else {
            cm.gainItem(chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][0], chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][1]);
            cm.getPlayer().setKeyValue("dailyhow",Number(cm.getPlayer().getKeyValue("dailyhow")) + 1);
            cm.getPlayer().setDateKey("dailygift",1);
            cm.sendOk("오늘의 데일리기프트를 드렸어요!");
            cm.dispose();
        }
    }
}
