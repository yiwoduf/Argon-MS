importPackage(java.io);
importPackage(Packages.constants);
var status = -1;
    chrdailylist = [];
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    normalitem = [[2000000,5],[4001713,6],[4001714,5],[4001715,1],[5680157,1],[2000001,2],[2000002,3],[2000003,4]]; // 1~10����
    gooditem = [[2049309,5],[2049311,4],[2049351,3],[2049360,2],[2049304,1],[2431938,3],[2434007,2]]; //11~20����
    superitem = [[5680340,4],[5680399,5],[2434340,3],[2049704,1],[2048717,2],[4031856,3],[2048717,1]]; //21~28����


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
            cm.sendOk("�̹��޿� ���� �ѹ��� ���ϸ�����Ʈ�� ���� �����̱���?\r\n���ο� ���ϸ�����Ʈ ����Ʈ�� ���� �帱�Կ�!\r\n\r\n#b(Ȯ���� ���� �� �ٽ� �� �� ���ǽø� Ŭ���� �ֽñ� �ٶ��ϴ�.)");
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
                hi = "���õ� ���̱���. ���ϸ��� ���ô� �е� ���� �����մϴٴϱ��! �׷� ������ ������ �˷��帱�Կ�!\r\n\r\n"
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
                hi+= "#e�������������������� ���ϸ� ����Ʈ��������������\r\n"
                hi+= "����������"
                hi+= "#i"+chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][0]+"# #b#z"+chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][0]+"# #r[x"+chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][1]+"]#k\r\n"
                hi+= "������������������������������������������������#n\r\n"
                hi+= "#L0##d �� �� ��ü ���ϸ�����Ʈ ����Ʈ ����#l\r\n"
                hi+= "#L1# ������ ���ϸ�����Ʈ �ޱ�"
                cm.sendSimple(hi);
            } else if (cm.getPlayer().getKeyValue("dailyhow") >= 29) {
                cm.sendOk("�̹� �� ���� ���ϸ�����Ʈ�� ��� �����̴�ϴ�. �������� ����� �ּ���!");
                cm.dispose();
            } else {
                cm.sendOk("���� ������ �̹� �޾ư� �� ���ƿ�!\r\n���� �ٽ� ã�ƿ� �ּ���!");
                cm.dispose();
            }
        }
    } else if (status == 1) {
        if (selection == 0) {
            hi = ""+month+"������ ���ϸ�����Ʈ ����Ʈ�Դϴ�.\r\n\r\n"
            for (i=1; i<chrdailylist.length; i++) {
                hi+= "#b"+i+"��#k #i"+chrdailylist[i][0]+"#    "
                if (i%4 == 0) {
                    hi+= "\r\n"
                    hi+= "#e������������������������������������������������#n\r\n"
                }
            }
            cm.sendOk(hi);
            cm.dispose();
        } else {
            cm.gainItem(chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][0], chrdailylist[cm.getPlayer().getKeyValue("dailyhow")][1]);
            cm.getPlayer().setKeyValue("dailyhow",Number(cm.getPlayer().getKeyValue("dailyhow")) + 1);
            cm.getPlayer().setDateKey("dailygift",1);
            cm.sendOk("������ ���ϸ�����Ʈ�� ��Ⱦ��!");
            cm.dispose();
        }
    }
}
