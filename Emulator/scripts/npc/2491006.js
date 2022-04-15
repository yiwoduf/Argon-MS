importPackage(Packages.packet.creators);
importPackage(Packages.launch.world);

var status = -1;
var jobs = [[112, 122, 132, 1112, 5112, 6112, 2112, 3112, 3122, 3712], [212, 222, 232, 1212, 2218, 2712, 3212], [312, 322, 1312, 2312, 3312], [412, 422, 434, 1412, 2412, 3612], [512, 522, 532, 2512, 3512, 3612, 6512]];
var sel = 0;
var seljob = 0;

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        if (status == 0) {
            cm.dispose();
        }
        status--;
    }
    if (status == 0) {
        if (cm.getPlayer().isGM()) {
            cm.getPlayer().gainGP(0);
        }
        var chat = "���Կ��� ���� �ִٰ� �����Ͻó���?... �� �׷��� �������� �ʽ��ϴ�.\r\n\r\n#e#r<SPECIAL QUEST ȯ��>\r\n#b#n#L0#ȯ���� �ϰ�ͽ��ϴ�.#l #L0##g���� �����ϱ�#l #r#L2##r��ȭ �׸��ϱ�#l";
        cm.sendSpirit(chat, true, 0);
    } else if (status == 1) {
        sel = selection;
        if (selection == 0) {
            var limit = 220;
            if (cm.getPlayer().getReborns() >= 150) {
                limit = 220;
            }
            if (cm.getPlayer().getLevel() < limit) {
                var text = limit == 220 ? " ���� 220�̻� �����մϴ�..\r\n#L0##r��ȭ �׸��ϱ�#l" : "���� 220 ���� ȯ�� �����մϴ�\r\n#L0##r��ȭ �׸��ϱ�#l";
                cm.sendSpirit(text, true, 0);
                cm.dispose();
                return;
            }
            cm.sendSpirit("ȯ���� �ϰԵǸ� ������ ���� �״�� ������ #r160#k#l���� �������Ե˴ϴ�. ������ ȯ���� �Ͻðڽ��ϱ�?\r\n#L0##b��#l\r\n#L1##r�ƴϿ�#l", true, 0);
        } else if (selection == 1) {
            var jobi = getJI(cm.getPlayer().getJob());
            if (jobi == -1) {
                cm.sendSpirit("���� ������ ������ ã���� �����ϴ�.\r\n#L0##r��ȭ �׸��ϱ�#l", true, 0);
                cm.dispose();
            }
            var text = "������ �����ϱ� ���ؼ� ȯ������Ʈ #g10,000#k����Ʈ�� �ʿ��մϴ�.\r\n#Cgray#�������� ȯ�� ����Ʈ : " + cm.getPlayer().getGP() + "\r\n#k�����Ͻ� ������ ������ �ּ���.(�������� ���� ������ ���� å�� �Դϴ�.)\r\n#fs15#";
            for (var i = 0; i < jobs[jobi].length; i++) {
                if (jobs[jobi][i] == cm.getPlayer().getJob()) {
                    continue;
                }
                getPlayerJobs(jobs[jobi][i]);
                text += "#L" + jobs[jobi][i] + "# #e#b" + job + "#n#l       ";
            }
            text += "#L999##r ��ȭ �׸��ϱ�#l";
            cm.sendSpirit(text, true, 0);
        } else if (selection == 2) {
            cm.dispose();
        }
    } else if (status == 2) {
        if (sel == 0) {
            if (selection == 1) {
                cm.dispose();
                return;
            }
            cm.getPlayer().setReborns(cm.getPlayer().getReborns() + 1);
            cm.getPlayer().gainGP(100);
            cm.getPlayer().setLevel(159);
            cm.getPlayer().levelUp();
	    cm.getPlayer().setExp(0);
	    cm.getPlayer().setAp(0);
            cm.sendSpirit("#b" + cm.getPlayer().getReborns() + "#k��° ȯ���� �Ϸ� �Ǿ����ϴ�. ���� �������� ȯ�� ����Ʈ�� #r" + (cm.getPlayer().getGP() - 200) + " + 100#k ����Ʈ �Դϴ�.\r\n#L0##b��ȭ �׸��ϱ�#l", true, 0);
            WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(23, "[ȯ��] " + cm.getPlayer().getName() + "���� " + cm.getPlayer().getReborns() + "��° ȯ���� �Ͽ����ϴ�."));
            cm.dispose();
        } else if (sel == 1) {
            if (selection == 999) {
                cm.dispose();
                return;
            }
            jobsel = selection;
            getPlayerJobs(selection);
            cm.sendSpirit("�����Ͻ� ���� #g" + job + "#k(��)�� ������ ���� �Ͻðڽ��ϱ�?\r\n#b#L0#��#l\r\n#L1##rŬ���� ��������˴ϴ�#l", true, 0);
        }
    } else if (status == 3) {
        if (cm.getPlayer().getGP() < 10000) {
            cm.sendSpirit("������ �����ϱ� ���ؼ� ȯ������Ʈ #g10,000#k����Ʈ�� �ʿ��մϴ�.\r\n#L0##r��ȭ �׸��ϱ�#l", true, 0);
            cm.dispose();
            return;
        }
        var it = cm.getPlayer().getSkills().keySet().iterator();
        var resetskill = [];
        var i = 0;
        while (it.hasNext()) {
            var lskill = it.next();
            if (lskill.getId() >= 80000000) {
                continue;
            }
            resetskill[i] = lskill.getId();
            i++;
        }
        for (var j = 0; j < resetskill.length; j ++) {
            cm.getPlayer().changeSkillLevel(resetskill[j], 0, 0);
        }
        cm.resetStats(4, 4, 4, 4);
        cm.changeJob(jobsel);
        if (jobsel == 3312) {
            cm.teachSkill(30001061, 1, 1);
        } else if (jobsel == 3512) {
            cm.teachSkill(30001068, 1, 1);
        } else if (jobsel == 3612) {
            cm.teachSkill(30020232, 1, 1);
            cm.teachSkill(30020233, 1, 1);
            cm.teachSkill(30020234, 1, 1);
            cm.teachSkill(30021235, 1, 1);
            cm.teachSkill(30021236, 1, 1);
            cm.teachSkill(30021237, 1, 1);
            cm.teachSkill(30020240, 1, 1);
        } else if (jobsel == 2312) {
            cm.teachSkill(20020109, 1, 1);
            cm.teachSkill(20021110, 1, 1);
            cm.teachSkill(20020111, 1, 1);
            cm.teachSkill(20020112, 1, 1);
        } else if (jobsel == 2412) {
            cm.teachSkill(20031203, 1, 1);
            cm.teachSkill(20030204, 1, 1);
            cm.teachSkill(20031205, 1, 1);
            cm.teachSkill(20030206, 1, 1);
            cm.teachSkill(20031207, 1, 1);
            cm.teachSkill(20031208, 1, 1);
            cm.teachSkill(20031209, 1, 1);
            cm.teachSkill(20031260, 1, 1);
        } else if (jobsel == 2712) {
            cm.teachSkill(27000106, 5, 5);
            cm.teachSkill(27000207, 5, 5);
            cm.teachSkill(27001201, 20, 20);
            cm.teachSkill(27001100, 20, 20);
            cm.teachSkill(20040219, 1, 1);
            cm.teachSkill(20040216, 1, 1);
            cm.teachSkill(20040217, 1, 1);
            cm.teachSkill(20040218, 1, 1);
            cm.teachSkill(20040221, 1, 1);
            cm.teachSkill(20041222, 1, 1);
        } else if (jobsel == 2512) {
            cm.teachSkill(25001002, 25, 25);
            cm.teachSkill(25000003, 25, 25);
            cm.teachSkill(20051284, 1, 1);
            cm.teachSkill(20050285, 1, 1);
            cm.teachSkill(25001000, 30, 30);
            cm.teachSkill(25001002, 30, 30);
        } else if (jobsel == 3112 || jobsel == 3122) {
            cm.teachSkill(30010111, 1, 1);
            cm.teachSkill(30010185, 1, 1);
            cm.teachSkill(30010112, 2, 2);
            cm.teachSkill(30011109, 1, 1);
            cm.teachSkill(30010110, 1, 1);
        } else if (jobsel >= 1112 && jobsel <= 1512) {
            cm.teachSkill(10001251, 1, 1);
            cm.teachSkill(10001252, 1, 1);
            cm.teachSkill(10001253, 1, 1);
            cm.teachSkill(10001254, 1, 1);
            cm.teachSkill(10001255, 1, 1);
        } else if (jobsel == 6112) {
            cm.teachSkill(60001216, 1, 1);
            cm.teachSkill(60001217, 1, 1);
            cm.teachSkill(60001218, 1, 1);
            cm.teachSkill(60001219, 1, 1);
            cm.teachSkill(60001220, 1, 1);
            cm.teachSkill(60001225, 1, 1);
        } else if (jobsel == 6512) {
            cm.teachSkill(60011216, 1, 1);
            cm.teachSkill(60011218, 1, 1);
            cm.teachSkill(60011219, 1, 1);
            cm.teachSkill(60011220, 1, 1);
            cm.teachSkill(60011221, 1, 1);
            cm.teachSkill(60011222, 1, 1);
        }
        cm.getPlayer().gainGP(-10000);
        cm.sendSpirit("�����Ͻ� ���� #g" + job + "#k(��)�� ������ ���� �Ǿ����ϴ�. #Cgray#@��ų������#k��ɾ�� ��ų�� ������ �Ҽ� �ֽ��ϴ�.\r\n#L0##r��ȭ �׸��ϱ�#l", true, 0);
        cm.dispose();
    }
}

function getJI(job) {
    for (var i = 0; i < jobs.length; i++) {
        for (var j = 0; j < jobs[i].length; j++) {
            if (job == jobs[i][j]) {
                return i;
            }
        }
    }
    return -1;
}


function getPlayerJobs(i)
{
    switch (i)
    {
        case 100:
            job = "�˻�";
            break;
        case 200:
            job = "������";
            break;
        case 300:
            job = "�ü�";
            break;
        case 400:
            job = "����";
            break;
        case 500:
            job = "����";
            break;
        case 110:
            job = "������";
            break;
        case 111:
            job = "ũ�缼�̴�";
            break;
        case 112:
            job = "�����";
            break;
        case 120:
            job = "������";
            break;
        case 121:
            job = "����Ʈ";
            break;
        case 122:
            job = "�ȶ��";
            break;
        case 130:
            job = "���Ǿ��";
            break;
        case 131:
            job = "����Ŀ";
            break;
        case 132:
            job = "��ũ����Ʈ";
            break;
        case 210:
            job = "���ڵ�(��, ��)";
            break;
        case 211:
            job = "������(��, ��)";
            break;
        case 212:
            job = "��ũ������(��,��)";
            break;
        case 220:
            job = "���ڵ�(��, ��)";
            break;
        case 221:
            job = "������(��, ��)";
            break;
        case 222:
            job = "��ũ������(��,��)";
            break;
        case 230:
            job = "Ŭ����";
            break;
        case 231:
            job = "������Ʈ";
            break;
        case 232:
            job = "���";
            break;
        case 310:
            job = "����";
            break;
        case 311:
            job = "������";
            break;
        case 312:
            job = "���츶����";
            break;
        case 320:
            job = "���";
            break;
        case 321:
            job = "���ݼ�";
            break;
        case 322:
            job = "�ű�";
            break;
        case 410:
            job = "��ؽ�";
            break;
        case 411:
            job = "���";
            break;
        case 412:
            job = "����Ʈ�ε�";
            break;
        case 420:
            job = "����";
            break;
        case 421:
            job = "����������";
            break;
        case 422:
            job = "������";
            break;
        case 430:
            job = "���̵�";
            break;
        case 431:
            job = "��";
            break;
        case 432:
            job = "��󸶽���";
            break;
        case 433:
            job = "������";
            break;
        case 434:
            job = "�����̴�";
            break;
        case 510:
            job = "��������";
            break;
        case 511:
            job = "��Ŀ�Ͼ�";
            break;
        case 512:
            job = "������";
            break;
        case 520:
            job = "�ǽ�����";
            break;
        case 521:
            job = "��Ű��";
            break;
        case 522:
            job = "ĸƾ";
            break;
        case 530:
            job = "ĳ����";
            break;
        case 531:
            job = "ĳ�������";
            break;
        case 532:
            job = "ĳ������";
            break;

        case 1100:
        case 1110:
        case 1111:
        case 1112:
            job = "�ҿ︶����";
            break;
        case 1200:
        case 1210:
        case 1211:
        case 1212:
            job = "�÷������ڵ�";
            break;
        case 1300:
        case 1310:
        case 1311:
        case 1312:
            job = "����극��Ŀ";
            break;
        case 1400:
        case 1410:
        case 1411:
        case 1412:
            job = "����Ʈ��Ŀ";
            break;
        case 1500:
        case 1510:
        case 1511:
        case 1512:
            job = "��Ʈ����Ŀ";
            break;

        case 2100:
        case 2110:
        case 2111:
        case 2112:
            job = "�ƶ�";
            break;
        case 2200:
        case 2210:
        case 2211:
        case 2212:
        case 2213:
        case 2214:
        case 2215:
        case 2216:
        case 2217:
        case 2218:
            job = "����";
            break;
        case 2300:
        case 2310:
        case 2311:
        case 2312:
            job = "�޸�������";
            break;
        case 2400:
        case 2410:
        case 2411:
        case 2412:
            job = "����";
            break;
        case 2700:
        case 2710:
        case 2711:
        case 2712:
            job = "��̳ʽ�";
            break;
        case 2500:
        case 2510:
        case 2511:
        case 2512:
            job = "����";
            break;

        case 3100:
        case 3110:
        case 3111:
        case 3112:
            job = "���󽽷��̾�";
            break;
        case 3101:
        case 3120:
        case 3121:
        case 3122:
            job = "������";
            break;
        case 3200:
        case 3210:
        case 3211:
        case 3212:
            job = "��Ʋ������";
            break;
        case 3300:
        case 3310:
        case 3311:
        case 3312:
            job = "���ϵ�����";
            break;
        case 3500:
        case 3512:
        case 3511:
        case 3512:
            job = "��ī��";
            break;
        case 3600:
        case 3610:
        case 3611:
        case 3612:
            job = "����";
            break;
        case 3700:
        case 3710:
        case 3711:
        case 3712:
            job = "������";
            break;
        case 6100:
        case 6110:
        case 6111:
        case 6112:
            job = "ī����";
            break;
        case 6500:
        case 6510:
        case 6511:
        case 6512:
            job = "������������";
            break;

        case 14200:
        case 14210:
        case 14211:
        case 14212:
            job = "Ű�׽ý�";
            break;
        default:
            "�ʺ���";
            break;
    }
}