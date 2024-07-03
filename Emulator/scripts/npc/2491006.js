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
        var chat = "강함에는 끝이 있다고 생각하시나요?... 전 그렇게 생각하지 않습니다.\r\n\r\n#e#r<SPECIAL QUEST 환생>\r\n#b#n#L0#환생을 하고싶습니다.#l #L0##g직업 변경하기#l #r#L2##r대화 그만하기#l";
        cm.sendSpirit(chat, true, 0);
    } else if (status == 1) {
        sel = selection;
        if (selection == 0) {
            var limit = 220;
            if (cm.getPlayer().getReborns() >= 150) {
                limit = 220;
            }
            if (cm.getPlayer().getLevel() < limit) {
                var text = limit == 220 ? " 레벨 220이상 가능합니다..\r\n#L0##r대화 그만하기#l" : "레벨 220 이후 환생 가능합니다\r\n#L0##r대화 그만하기#l";
                cm.sendSpirit(text, true, 0);
                cm.dispose();
                return;
            }
            cm.sendSpirit("환생을 하게되면 현재의 상태 그대로 레벨이 #r160#k#l으로 내려가게됩니다. 정말로 환생을 하시겠습니까?\r\n#L0##b네#l\r\n#L1##r아니오#l", true, 0);
        } else if (selection == 1) {
            var jobi = getJI(cm.getPlayer().getJob());
            if (jobi == -1) {
                cm.sendSpirit("변경 가능한 직업을 찾을수 없습니다.\r\n#L0##r대화 그만하기#l", true, 0);
                cm.dispose();
            }
            var text = "직업을 변경하기 위해선 환생포인트 #g10,000#k포인트가 필요합니다.\r\n#Cgray#보유중인 환생 포인트 : " + cm.getPlayer().getGP() + "\r\n#k변경하실 직업을 선택해 주세요.(변생으로 인한 오류는 유저 책임 입니다.)\r\n#fs15#";
            for (var i = 0; i < jobs[jobi].length; i++) {
                if (jobs[jobi][i] == cm.getPlayer().getJob()) {
                    continue;
                }
                getPlayerJobs(jobs[jobi][i]);
                text += "#L" + jobs[jobi][i] + "# #e#b" + job + "#n#l       ";
            }
            text += "#L999##r 대화 그만하기#l";
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
            cm.sendSpirit("#b" + cm.getPlayer().getReborns() + "#k번째 환생이 완료 되었습니다. 현재 보유중인 환생 포인트는 #r" + (cm.getPlayer().getGP() - 200) + " + 100#k 포인트 입니다.\r\n#L0##b대화 그만하기#l", true, 0);
            WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(23, "[환생] " + cm.getPlayer().getName() + "님이 " + cm.getPlayer().getReborns() + "번째 환생을 하였습니다."));
            cm.dispose();
        } else if (sel == 1) {
            if (selection == 999) {
                cm.dispose();
                return;
            }
            jobsel = selection;
            getPlayerJobs(selection);
            cm.sendSpirit("선택하신 직업 #g" + job + "#k(으)로 직업을 변경 하시겠습니까?\r\n#b#L0#예#l\r\n#L1##r클릭시 직업변경됩니다#l", true, 0);
        }
    } else if (status == 3) {
        if (cm.getPlayer().getGP() < 10000) {
            cm.sendSpirit("직업을 변경하기 위해선 환생포인트 #g10,000#k포인트가 필요합니다.\r\n#L0##r대화 그만하기#l", true, 0);
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
        cm.sendSpirit("선택하신 직업 #g" + job + "#k(으)로 직업이 변경 되었습니다. #Cgray#@스킬마스터#k명령어로 스킬을 마스터 할수 있습니다.\r\n#L0##r대화 그만하기#l", true, 0);
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
            job = "검사";
            break;
        case 200:
            job = "마법사";
            break;
        case 300:
            job = "궁수";
            break;
        case 400:
            job = "도적";
            break;
        case 500:
            job = "해적";
            break;
        case 110:
            job = "파이터";
            break;
        case 111:
            job = "크루세이더";
            break;
        case 112:
            job = "히어로";
            break;
        case 120:
            job = "페이지";
            break;
        case 121:
            job = "나이트";
            break;
        case 122:
            job = "팔라딘";
            break;
        case 130:
            job = "스피어맨";
            break;
        case 131:
            job = "버서커";
            break;
        case 132:
            job = "다크나이트";
            break;
        case 210:
            job = "위자드(불, 독)";
            break;
        case 211:
            job = "메이지(불, 독)";
            break;
        case 212:
            job = "아크메이지(불,독)";
            break;
        case 220:
            job = "위자드(썬, 콜)";
            break;
        case 221:
            job = "메이지(썬, 콜)";
            break;
        case 222:
            job = "아크메이지(썬,콜)";
            break;
        case 230:
            job = "클레릭";
            break;
        case 231:
            job = "프리스트";
            break;
        case 232:
            job = "비숍";
            break;
        case 310:
            job = "헌터";
            break;
        case 311:
            job = "레인저";
            break;
        case 312:
            job = "보우마스터";
            break;
        case 320:
            job = "사수";
            break;
        case 321:
            job = "저격수";
            break;
        case 322:
            job = "신궁";
            break;
        case 410:
            job = "어쌔신";
            break;
        case 411:
            job = "허밋";
            break;
        case 412:
            job = "나이트로드";
            break;
        case 420:
            job = "시프";
            break;
        case 421:
            job = "시프마스터";
            break;
        case 422:
            job = "섀도어";
            break;
        case 430:
            job = "세미듀어러";
            break;
        case 431:
            job = "듀어러";
            break;
        case 432:
            job = "듀얼마스터";
            break;
        case 433:
            job = "슬레셔";
            break;
        case 434:
            job = "듀얼블레이더";
            break;
        case 510:
            job = "인파이터";
            break;
        case 511:
            job = "버커니어";
            break;
        case 512:
            job = "바이퍼";
            break;
        case 520:
            job = "건슬링거";
            break;
        case 521:
            job = "발키리";
            break;
        case 522:
            job = "캡틴";
            break;
        case 530:
            job = "캐논슈터";
            break;
        case 531:
            job = "캐논블래스터";
            break;
        case 532:
            job = "캐논마스터";
            break;

        case 1100:
        case 1110:
        case 1111:
        case 1112:
            job = "소울마스터";
            break;
        case 1200:
        case 1210:
        case 1211:
        case 1212:
            job = "플레임위자드";
            break;
        case 1300:
        case 1310:
        case 1311:
        case 1312:
            job = "윈드브레이커";
            break;
        case 1400:
        case 1410:
        case 1411:
        case 1412:
            job = "나이트워커";
            break;
        case 1500:
        case 1510:
        case 1511:
        case 1512:
            job = "스트라이커";
            break;

        case 2100:
        case 2110:
        case 2111:
        case 2112:
            job = "아란";
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
            job = "에반";
            break;
        case 2300:
        case 2310:
        case 2311:
        case 2312:
            job = "메르세데스";
            break;
        case 2400:
        case 2410:
        case 2411:
        case 2412:
            job = "팬텀";
            break;
        case 2700:
        case 2710:
        case 2711:
        case 2712:
            job = "루미너스";
            break;
        case 2500:
        case 2510:
        case 2511:
        case 2512:
            job = "은월";
            break;

        case 3100:
        case 3110:
        case 3111:
        case 3112:
            job = "데몬슬레이어";
            break;
        case 3101:
        case 3120:
        case 3121:
        case 3122:
            job = "데몬어벤져";
            break;
        case 3200:
        case 3210:
        case 3211:
        case 3212:
            job = "배틀메이지";
            break;
        case 3300:
        case 3310:
        case 3311:
        case 3312:
            job = "와일드헌터";
            break;
        case 3500:
        case 3512:
        case 3511:
        case 3512:
            job = "메카닉";
            break;
        case 3600:
        case 3610:
        case 3611:
        case 3612:
            job = "제논";
            break;
        case 3700:
        case 3710:
        case 3711:
        case 3712:
            job = "블래스터";
            break;
        case 6100:
        case 6110:
        case 6111:
        case 6112:
            job = "카이저";
            break;
        case 6500:
        case 6510:
        case 6511:
        case 6512:
            job = "엔젤릭버스터";
            break;

        case 14200:
        case 14210:
        case 14211:
        case 14212:
            job = "키네시스";
            break;
        default:
            "초보자";
            break;
    }
}